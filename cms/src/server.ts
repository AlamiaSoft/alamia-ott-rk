import express from 'express';
import payload from 'payload';
import configPromise from '../payload.config.js';

const app = express();
const PORT = process.env.PORT || 4000;

const start = async () => {
  await payload.init({
    config: configPromise,
    express: app,
    onInit: async (cms) => {
      cms.logger.info(`Payload Admin URL: ${cms.getAdminURL()}`);
    },
  });

  app.get('/', (_req, res) => {
    res.redirect('/admin');
  });

  app.listen(PORT, async () => {
    payload.logger.info(`Payload CMS server listening on port ${PORT}`);
  });
};

start();
