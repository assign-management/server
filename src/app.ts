import express from 'express';
import 'express-async-errors';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http, { Server } from 'http';
import typeDefs from './schemas';
import resolvers from './resolvers';

export default async (): Promise<Server> => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });

  // app.use(express.json());
  // app.use(usersRouter);

  return httpServer;
};
