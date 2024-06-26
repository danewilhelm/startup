// import and initialize mongodb
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');

// access connections from websocket
const {connections} = require("./peerProxy.js");

// initialize bcrypt
const bcrypt = require('bcrypt');

// Connect to the database cluster
async function main() {
  (async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });
}
main().catch(console.error);

// Initialize collection objects from database
const profile_collection = db.collection("profile_collection");
const habit_count_collection = db.collection("habit_count_collection");

//-----------database helper functions---------------------
async function get_profile(name) {
  return await profile_collection.findOne({name: name});
}

async function get_profile_by_token(token) {
  return await profile_collection.findOne({token: token});
}

async function update_profile(profile) {
  await profile_collection.updateOne({name: profile.name}, {$set:{habit_list: profile.habit_list}});
}

async function insert_new_profile(profile) {
  // Hash the password before we insert it into the database
  profile.password = await bcrypt.hash(profile.password, 5);
  await profile_collection.insertOne(profile);
  // not sure why we return it here yet
  return profile; 
}

async function increment_habit_counter() {
  let habit_count_object = await habit_count_collection.findOne();
  if (habit_count_object == null) {
    await habit_count_collection.insertOne({habit_count: 1});
    await broadcast_habit_counter(1);
  } else {
    habit_count_object.habit_count = habit_count_object.habit_count + 1;
    await habit_count_collection.replaceOne({}, habit_count_object);
    await broadcast_habit_counter(habit_count_object.habit_count);
  }
}

async function broadcast_habit_counter(habit_count) {
  for (let connection of connections) {
    connection.ws.send(habit_count);
  }
}

async function get_habit_counter() {
  let habit_count_object = await habit_count_collection.findOne();
  if (habit_count_object == null) {
    return 0;
  } else {
    return habit_count_object.habit_count;
  }
}

module.exports = {
  get_profile,
  get_profile_by_token,
  update_profile,
  insert_new_profile,
  increment_habit_counter,
  get_habit_counter
}






