const server = require(`./server.js`);
require('dotenv').config();

const port = process.env.PORT || 4000;

server.listen(port, (_) => {
  console.log(`\n*** server listening on localhost:${port} ***\n`);
});
