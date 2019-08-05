const express = require(`express`);
const { logger } = require(`./middleware/logger.js`);
const projectRouter = require(`./routers/projectRouter.js`);
const actionRouter = require(`./routers/actionRouter.js`);

const server = express();

server.use(express.json());
server.use(logger);
server.use(`/api/projects`, projectRouter);
server.use(`/api/actions`, actionRouter);

server.get('/', (request, response) => {
  response.send(`
      <h1>Web API Sprint Challenge!</h1>
      <p>Please see the <a href='https://github.com/ericlugo/webapi-iv-challenge'>README</a> for more information on where to go!</p>
    `);
});

module.exports = server;
