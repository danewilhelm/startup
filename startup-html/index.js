function login() {
    // naming variables and retrieving values
    const name_el = document.querySelector("#name");
    const password_el = document.querySelector("#password");
    // let temp_name = name_el.value;
    // let temp_password = password_el.value;
    let profile_1 = new Profile(name_el.value, password_el.value);

    // Case 0: There are no user logins created yet 
    localStorage.setItem('current_user', JSON.stringify(profile_1));
    localStorage.setItem('all_users', [JSON.stringify(profile_1)]);

    // Case 1: A new user is logging in for the first time
    // inserting another user's login
    

    // Case 2: An existing user is re-logging in
    // window.location.href = "play.html";
}

class Profile {
    constructor(name, password) {
        this.user_login = new Map();
        this.login.set(name, password);
        this.habit_list = [];
    }

    correct_login(given_name, given_password) {
        if (this.user_login.get(given_name) === given_password) {
            return true;
        }
        return false;
    }
}