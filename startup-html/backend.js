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
apiRouter.get('/get/profile', (req, res) => {
    requested_profile = req.body;
    res.send(profile_storage[requested_profile.name]);
});


// Request: post specified profile
apiRouter.post('/post/profile', (req, _res) => {
    let new_profile = req.body;
    profile_storage[new_profile.name] = new_profile;
});

// Request: put specified profile
apiRouter.put('/put/profile', (req, _res) => {
    let updated_profile = req.body;
    profile_storage[updated_profile.name] = updated_profile;
});


// Request: get habit count
apiRouter.get('/get/habit_count', (_req, res) => {
    res.send(habit_count.toString());
});

// Request: put incremented habit count
apiRouter.put('/put/habit_count', (req, _res) => {
    habit_count = req.body;
});

// Request: Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});


  //--------------start listening for requests-------------
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});