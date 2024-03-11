// import { send_object_to_local_storage } from './common_functions.js';
// import { retrieve_object_from_local_storage } from './common_functions.js';
// // import { retrieve_current_profile } from './common_functions.js';
// import { get_habit_counter_int } from './common_functions.js'; // used in increment_habit_counter and display_habit_counter
// import { increment_habit_counter } from './common_functions.js';
// import { update_name } from './common_functions.js';

//------------local storage retrieve and send helper functions---------------------
// function send_object_to_local_storage(storage_name, storage_object) {
//     return localStorage.setItem(storage_name, JSON.stringify(storage_object));
// }

// function retrieve_object_from_local_storage(storage_name) {
//     return JSON.parse(localStorage.getItem(storage_name));
// }

//------------profile login functions------------------
// called when a user attempts to login
function login() {
    // naming variables and retrieving values
    const name_el = document.querySelector('#name');
    const password_el = document.querySelector('#password');
    let name = name_el.value;
    let password = password_el.value;

    // Login checks
    let attempted_profile = retrieve_object_from_local_storage(name);
    if (attempted_profile === null) {
        // Case 1: This is a new user
        attempted_profile = new Profile(name, password);
        send_object_to_local_storage(name, attempted_profile);
    } else if (! (correct_login(name, password))) { 
        // Case 2: An existing user failed to log in
        console.log("Incorrect login. Try checking your username or password.");
        return;
    }
    // The user successfully logged in
    localStorage.setItem("current_profile_name", name);
    console.log("User successfully logged in");
    window.location.href = 'make.html';
}

class Profile {
    constructor(name, password) {
        this.name = name;
        this.password = password;
        this.habit_list = [];
    }
}

function correct_login(given_name, given_password) {
    // retrieve values
    let attempted_profile = retrieve_object_from_local_storage(given_name);
    // check credentials
    if ((attempted_profile.name === given_name) && (attempted_profile.password === given_password)) {
        return true;
    }
    return false;
}

// ----------------habit counter-------------------------

function get_habit_counter_int() {
    habit_counter = localStorage.getItem('habit_counter') ?? 0;
    return parseInt(habit_counter);
}

function increment_habit_counter() {
    let habit_counter = get_habit_counter_int();
    habit_counter++;
    localStorage.setItem('habit_counter', habit_counter);
}



//=====================Helper Functions===========================================
// --------------------Unique Helper Functions------------------------------------
function display_habit_counter() {
    let habit_counter_el = document.querySelector('#habit_counter');
    let habit_int = get_habit_counter_int();
    habit_counter_el.textContent = habit_int;
}

function increment_and_display_habit_counter() {
    increment_habit_counter();
    display_habit_counter();
}

// --------------------reused helper functions------------------------------------
// localStorage function
function send_object_to_local_storage(storage_name, storage_object) {
    return localStorage.setItem(storage_name, JSON.stringify(storage_object));
}

// localStorage function
function retrieve_object_from_local_storage(storage_name) {
    return JSON.parse(localStorage.getItem(storage_name));
}

// habit counter functions
function get_habit_counter_int() {
    let habit_counter = localStorage.getItem('habit_counter') ?? 0;
    return parseInt(habit_counter);
}

// habit counter function
function increment_habit_counter() {
    let habit_counter = get_habit_counter_int() + 1;
    localStorage.setItem('habit_counter', habit_counter);
}

// ============main=============================
display_habit_counter();
setInterval(increment_and_display_habit_counter, 1500);











