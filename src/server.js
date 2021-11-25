const http = require('http');
const url = require('url');
const { randomUUID } = require('crypto');
const dotenv = require('dotenv');
dotenv.config();
const Persons = require('./repositories/persons');
const Router = require('./services/Router');

const port = process.env.PORT;
const persons = new Persons();
const router = new Router(persons);

const server = http.createServer(async (req, res) => {
  const method = req.method.toLowerCase();
  const path = req.url;

  const response = await router[method](path);
  const { status, body } = response;

  res.writeHead(status, { 'Content-Type': 'application/json' }).end(body);
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
