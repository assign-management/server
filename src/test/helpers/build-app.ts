import { app } from '../../app';

export const buildApp = async () => {
  const { httpServer } = await app();
  return httpServer;
};
