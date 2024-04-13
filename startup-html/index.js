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

//------------ DEBUG TESTING----------------
class Profile {
    constructor(name, password) {
        this.name = name;
        this.password = password;
        this.habit_list = [];
    }
}
let test_profile = new Profile("Jimmy", "Joe");

//-----------endpoints (aka routes)--------------------
let profile_storage = {};
profile_storage[test_profile.name] = test_profile; // DEBUG
let habit_count = 4;

// Request: get specified profile
apiRouter.get('/get_profile/:profile_name', (req, res) => {
    let requested_profile = profile_storage[req.params.profile_name];
    res.send(requested_profile);
});

// Request: post specified profile
apiRouter.post('/post_profile', (req, res) => {
    let new_profile = req.body;
    profile_storage[new_profile.name] = new_profile;
    res.send("");
});

// Request: put specified profile
apiRouter.put('/put_profile', (req, res) => {
    let updated_profile = req.body;
    profile_storage[updated_profile.name] = updated_profile;
    res.send("");
});

// Request: get habit count
apiRouter.get('/get_habit_count', (_req, res) => {
    res.send(JSON.stringify(habit_count));
});

// Request: put incremented habit count
apiRouter.put('/put_habit_count', (req, res) => {
    let recieved_habit_count = req.body;
    // console.log(recieved_habit_count);
    // console.log(habit_count);
    habit_count = recieved_habit_count.habit_count;
    res.send("");
});


// Request: Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});


  //--------------start listening for requests-------------
app.listen(port, () => {    
    console.log(`Listening on port ${port}`);
});