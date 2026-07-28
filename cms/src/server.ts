import express from 'express';
import payload from 'payload';

const app = express();
const PORT = process.env.PORT || 4000;

const start = async () => {
  await payload.init({
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  app.listen(PORT, async () => {
    payload.logger.info(`Payload CMS server listening on port ${PORT}`);
  });
};

start();
