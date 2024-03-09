// ----------setting up express----------------------
const express = require('express');
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

//-----------endpoints (aka routes)--------------------
let profile_storage = {};
let habit_count = 4;

// Request: get specified profile
apiRouter.get('/profile/:profile_name', (req, res) => {
    res.send(profile_storage[req.params.profile_name]);
});

// Request: put/post specified profile


// Request: get habit count
apiRouter.get('/habit_count', (_req, res) => {
    res.send(habit_count.toString());
});

// Request: put/post incremented habit count

// Request: Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});





  //--------------start listening for requests-------------
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


// Put vs post (example: profiles)
// How to create .gitignore file and add node_modules to it