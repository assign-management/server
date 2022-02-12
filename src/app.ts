import express, { Request, Response } from 'express';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http, { Server } from 'http';
import typeDefs from './schemas';
import resolvers from './resolvers';

export const app = async (): Promise<{ httpServer: Server; apolloServer: ApolloServer<ExpressContext> }> => {
  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
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
