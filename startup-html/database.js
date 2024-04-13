// import and initialize mongodb
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');

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

// Initialize collection object(s) from database
const profile_collection = db.collection("profile_collection");

// UNTESTED
function get_profile(name) {
  return profile_collection.findOne({name: name});
}

// UNTESTED
function update_profile(profile) {
  db.collection.replaceOne({name: profile.name}, profile)
}

// UNTESTED
async function insert_new_profile(profile) {
  // Hash the password before we insert it into the database
  profile.password = await bcrypt.hash(password, 5);
  await profile_collection.insertOne(profile);
  // not sure why we return it here yet
  return profile; 
}






