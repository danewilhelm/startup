//------------profile login functions------------------
// called when a user attempts to login
function login() {
    // naming variables and retrieving values
    const name_el = document.querySelector('#name');
    const password_el = document.querySelector('#password');
    let name = name_el.value;
    let password = password_el.value;

    // Case 0: There are no profiles created yet 
    
    if (retrieve_object_from_local_storage('all_profiles') === null) {
        let temp_all_profiles = {};
        send_object_to_local_storage('all_profiles', temp_all_profiles);
    }
    
    let all_profiles = retrieve_object_from_local_storage('all_profiles');
    // console.log(all_profiles);
    let attempted_profile = all_profiles[name];

    if (attempted_profile === undefined) {
        // Case 1: A new user logged in for the first time
        new Profile(name, password);
        window.location.href = 'make.html';
    } else if (attempted_profile.correct_login(name, password)) { 
        // Case 2: An existing user successfully logged in
        attempted_profile.set_current_profile_to_this_profile;
        window.location.href = 'make.html';
    } else {
        // Case 3: An existing user failed to log in
        console.log("Incorrect login. Try checking your username or password.");
    }
}

class Profile {
    constructor(name, password) {
        this.name = name;
        this.login_info = {};
        this.login_info[name] = password;
        this.habit_list = [];
        update_local_storage_profiles(this);
    }

    correct_login(given_name, given_password) {
        if (this.login_info[given_name] === given_password) {
            return true;
        }
        return false;
    }
}

//------------local storage retrieve and send helper functions---------------------
function send_object_to_local_storage(storage_name, storage_object) {
    return localStorage.setItem(storage_name, JSON.stringify(storage_object));
}

function retrieve_object_from_local_storage(storage_name) {
    return JSON.parse(localStorage.getItem(storage_name));
}

// ------------update all_profiles and current_profile helper functions--------------
function update_all_profiles(profile) {
    let temp_all_profiles = retrieve_object_from_local_storage('all_profiles');
    temp_all_profiles[profile.name] = profile;
    return send_object_to_local_storage('all_profiles', temp_all_profiles);
}

function update_current_profile(profile) {
    return send_object_to_local_storage("current_profile", profile);
}

function update_local_storage_profiles(profile) {
    update_all_profiles(profile);
    update_current_profile(profile);
}