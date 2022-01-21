import express from 'express';
import 'express-async-errors';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http, { Server } from 'http';
import typeDefs from './schemas';
import resolvers from './resolvers';

export default async (): Promise<{ httpServer: Server; apolloServer: ApolloServer<ExpressContext> }> => {
  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // app.use(express.json());
  // app.use(usersRouter);

  return { httpServer, apolloServer };
};
