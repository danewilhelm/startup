// ----------setting up express----------------------
const express = require('express');
const { default: test } = require('node:test');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


  //--------------start listening for requests-------------
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});