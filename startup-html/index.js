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
    update_current_profile_name(attempted_profile.name);
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




//------------local storage retrieve and send helper functions---------------------
function send_object_to_local_storage(storage_name, storage_object) {
    return localStorage.setItem(storage_name, JSON.stringify(storage_object));
}

function retrieve_object_from_local_storage(storage_name) {
    return JSON.parse(localStorage.getItem(storage_name));
}

function update_current_profile_name(profile_name) {
    return localStorage.setItem("current_profile_name", profile_name);
}