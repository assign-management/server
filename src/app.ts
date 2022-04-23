import express from 'express';
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
import { CLIENT_URL, isEnv } from './config/environment';
import { Env } from './config/constants';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core/dist/plugin/landingPage/default';
import { generateProjectArgs } from './test/mock/projects';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { upperDirectiveTransformer } from './directives';
import cookieSession from 'cookie-session';
import cors, { CorsOptions } from 'cors';
import { passport } from './services';
import { authRoute } from './routes/auth';

const corsOptions: CorsOptions = {
  origin: [CLIENT_URL, 'https://studio.apollographql.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

schema = upperDirectiveTransformer(schema, 'upper');

export const app = async (): Promise<{ httpServer: Server; apolloServer: ApolloServer<ExpressContext> }> => {
  const app = express();
  const httpServer = http.createServer(app);
  // traffic proxy through nginx-ingress
  // express don't trust to ssl on proxy by default
  app.set('trust proxy', true);
  app.use(express.json());
  app.use(
    cookieSession({
      // jwt is already encrypted and can't be tempered
      signed: false,
      // check that the user use https connection
      secure: false,
      maxAge: 24 * 60 * 60 * 100,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cors(corsOptions));
  app.use('/auth', authRoute);

  const apolloServer = new ApolloServer({
    schema,
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
    context: ({ res, req }) => {
      return {
        user: req.user,
        res,
        req,
      };
    },
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: corsOptions,
  });

  return { httpServer, apolloServer };
};
