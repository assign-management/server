import express, { Request, Response } from 'express';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginUsageReportingDisabled,
  UserInputError,
} from 'apollo-server-core';
import http, { Server } from 'http';
import typeDefs from './schemas';
import resolvers from './resolvers';
import { GraphQLError } from 'graphql';
import { isEnv } from './config/environment';
import { Env } from './config/constants';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core/dist/plugin/landingPage/default';
import { generateProjectArgs } from './test/mock/projects';

export const app = async (): Promise<{ httpServer: Server; apolloServer: ApolloServer<ExpressContext> }> => {
  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginUsageReportingDisabled(),
      isEnv(Env.Production)
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageLocalDefault({
            variables: {
              createProjectArgs: generateProjectArgs(),
            } as any,
          }),
    ],
    formatError: (err: GraphQLError) => {
      // Don't give the specific errors to the client.
      if (err.message.startsWith('Database Error: ')) {
        return new Error('Internal server error');
      }

      if (err.originalError instanceof UserInputError) {
        delete err.extensions.exception;
      }
      // Otherwise return the original error. The error can also
      // be manipulated in other ways, as long as it's returned.
      return err;
    },
    // context: ({ res, req }) => ({
    //   user: req.user,
    //   res,
    //   req,
    // }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // app.use(express.json());
  // app.use(usersRouter);

  return { httpServer, apolloServer };
};
