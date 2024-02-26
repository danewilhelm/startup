function login() {
    // naming variables and retrieving values
    const name_el = document.querySelector('#name');
    const password_el = document.querySelector('#password');
    let name = name_el.value;
    let password = password_el.value;

    // Case 0: There are no profiles created yet 
    
    if (get_object_from_local_storage('all_profiles') === null || true) { // DEBUGGING true
        console.log("entering if block");
        let temp_map = new Map(); 
        // let temp_return = temp_obj.get(name); // DEBUGGING
        temp_map.set(name, password); // DEBUGGING
        console.log(temp_map);
        set_map_to_local_storage('all_profiles', temp_map);
        console.log("exiting if block"); // DEBUGGING
    }
    
    let all_profiles = get_object_from_local_storage('all_profiles');
    console.log(all_profiles);
    let attempted_profile = all_profiles.get(name); // ERROR HERE
// }
    if (attempted_profile === null) {
        // Case 1: A new user logged in for the first time
        new Profile(name, password);
        window.location.href = 'play.html';
    } else if (attempted_profile.correct_login(name, password)) { 
        // Case 2: An existing user successfully logged in
        attempted_profile.set_current_profile_to_this_profile;
        window.location.href = 'play.html';
    } else {
        // Case 3: An existing user failed to log in
        console.log("Incorrect login. Try checking your username or password.");
    }
}

function set_map_to_local_storage(storage_name, storage_map) {
    return localStorage.setItem(storage_name, JSON.stringify(Array.from(storage_map.entries())));
}

function set_object_to_local_storage(storage_name, storage_object) {
    return localStorage.setItem(storage_name, JSON.stringify(storage_object));
}

function get_object_from_local_storage(storage_name) {
    return JSON.parse(localStorage.getItem(storage_name));
}

class Profile {
    constructor(name, password) {
        this.login_info = new Map();
        this.login_info.set(name, password);
        this.habit_list = [];
        this.add_profile_to_all_profiles();
        this.set_current_profile_to_this_profile();
    }

    correct_login(given_name, given_password) {
        if (this.login_info.get(given_name) === given_password) {
            return true;
        }
        return false;
    }

    add_profile_to_all_profiles() {
        let all_profiles_temp = get_object_from_local_storage('all_profiles');
        all_profiles_temp.set(this.name, this);
        return set_map_to_local_storage('all_profiles', all_profiles_temp);
    }
    
    set_current_profile_to_this_profile() {
        return set_object_to_local_storage(this);
    }
}