// ----------setting up the backend----------------------
const express = require('express');
const { default: test } = require('node:test');
const app = express();

// setting up database usage
const DB = require('./database.js');
const bcrypt = require('bcrypt');

// setting up websocket
const { peerProxy } = require('./peerProxy.js');


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
let test_profile = new Profile("Jimmy", "Joe"); // DEBUG

//-----------endpoints (aka routes)--------------------
let habit_count = 4;

apiRouter.post('/is_login_correct', async (req, res) => {
    let attempted_name = req.body.attempted_name;   
    let attempted_password = req.body.attempted_password;
    let inquired_profile = await DB.get_profile(attempted_name);
    // if there is a profile with this name, attempt to log in
    if (inquired_profile) {
        if (await bcrypt.compare(attempted_password, inquired_profile.password)) {
            res.send({can_login : true});
        } else {
            res.send({can_login : false});
        }
    } else {
        // else, a new profile must be created
        let new_profile = new Profile(attempted_name, attempted_password);
        await DB.insert_new_profile(new_profile);
        res.send({can_login : true});
    }
});

// Request: get specified profile
apiRouter.get('/get_profile/:profile_name', async (req, res) => {
    let requested_profile = await DB.get_profile(req.params.profile_name);
    res.send(requested_profile);
});

// only used in testing (new profiles are normally created in the login endpoint)
// Request: post specified profile
apiRouter.post('/post_profile', async (req, res) => {
    let new_profile = req.body;
    await DB.insert_new_profile(new_profile);
    res.send("");
});

// allows new habits to be stored in the profile inside the database
// Request: put specified profile
apiRouter.put('/put_profile', async (req, res) => {
    let updated_profile = req.body;
    await DB.update_profile(updated_profile);
    res.send("");
});

// Request: get habit count
apiRouter.get('/get_habit_count', async (_req, res) => {
    let habit_count = await DB.get_habit_counter();
    res.send(JSON.stringify(habit_count));
});

// Request: put incremented habit count
apiRouter.put('/put_habit_count', async (_req, res) => {
    await DB.increment_habit_counter();
    res.send("");
});


// Request: Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});


  //--------------start listening for requests-------------
const httpService = app.listen(port, () => {    
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);