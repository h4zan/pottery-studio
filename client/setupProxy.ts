import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';

module.exports = function (app: Application) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:1337',
      changeOrigin: true,
    })
  );
};
