const http = require('http');
const url = require('url');
const dotenv = require('dotenv');
dotenv.config();
const Persons = require('./repositories/persons');
const Router = require('./services/Router');
const STATUS_CODE = require('./utils/statusCode');
const port = process.env.PORT;
const persons = new Persons();
const router = new Router(persons);

const server = http.createServer(async (req, res) => {
  const method = req.method.toLowerCase();
  const path = req.url;
  let bodyReq = '';
  req.on('data', (chunk) => {
    bodyReq += chunk.toString();
  });

  req.on('end', async () => {
    const requestMethodNotSupported = {
      status: STATUS_CODE.BAD_REQUEST,
      body: `Method "${method.toUpperCase()}" is not supported`,
    };

    const response = router[method]
      ? await router[method](path, bodyReq)
      : requestMethodNotSupported;
    const { status, body } = response;
    res.writeHead(status, { 'Content-Type': 'application/json' }).end(body);
  });
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
