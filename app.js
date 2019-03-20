require('dotenv').config();
const Hapi = require('hapi');

const routes = require('./routes/search');

const serverInit = async () => {
  const server = new Hapi.Server({
    port: process.env.PORT || 3000,
    routes: {
      cors: {
        credentials: true,
      },
    },
  });

  server.route(routes);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

module.exports = serverInit();
