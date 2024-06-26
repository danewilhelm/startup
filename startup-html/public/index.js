//------------profile login functions------------------
// called when a user attempts to login
async function login() {
    // naming variables and retrieving values
    const name_el = document.querySelector('#name');
    const password_el = document.querySelector('#password');
    let name = name_el.value;
    let password = password_el.value;

    if (await is_login_correct(name, password)) {
        localStorage.setItem("current_profile_name", name);
        console.log("User successfully logged in");
        window.location.href = 'make.html';
    } else {
        console.log("Incorrect login. Try checking your username or password.");
    }
}

// UNTESTED
async function is_login_correct(input_name, input_password) {
    const response = await fetch("/api/is_login_correct", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({attempted_name: input_name, attempted_password: input_password})
    });

    let response_json = await response.json();
    if (response_json.can_login) {
        return true;
    } else {
        return false;
    }
}



class Profile {
    constructor(name, password) {
        this.name = name;
        this.password = password;
        this.habit_list = [];
    }
}



//=====================Helper Functions===========================================
// --------------------index.js Helper Functions------------------------------------
function correct_login(given_name, given_password, attempted_profile) {
    // check credentials
    if ((attempted_profile.name === given_name) && (attempted_profile.password === given_password)) {
        return true;
    }
    return false;
}

function configure_websocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    let socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = (event) => {
        console.log("websocket connected");
        // update the integer
    };
    socket.onclose = (event) => {
        console.log("websocket disconnected");
    };
    socket.onmessage = (event) => {
        // extract the integer from the message and update the page to display the integer
        update_habit_counter(event.data);
    };

    return socket;
}

async function display_habit_counter() {
    let habit_counter_el = document.querySelector('#habit_counter');
    let habit_int = await get_habit_count_from_backend();
    habit_counter_el.textContent = habit_int;
}

function update_habit_counter(habit_count) {
    let habit_counter_el = document.querySelector('#habit_counter');
    habit_counter_el.textContent = habit_count;
}

// async function increment_and_display_habit_counter() {
//     increment_habit_counter();
//     display_habit_counter();
// }

// --------------------localStorage helper functions------------------------------------
// object function
function send_object_to_local_storage(storage_name, storage_object) {
    return localStorage.setItem(storage_name, JSON.stringify(storage_object));
}

// object function
function retrieve_object_from_local_storage(storage_name) {
    return JSON.parse(localStorage.getItem(storage_name));
}

// habit counter function
function get_habit_counter_int() {
    let habit_counter = localStorage.getItem('habit_counter') ?? 0;
    return parseInt(habit_counter);
}

// habit counter function
function increment_habit_counter() {
    let habit_counter = get_habit_counter_int() + 1;
    localStorage.setItem('habit_counter', habit_counter);
}



//----------------Backend helper functions---------------------------------------------
async function get_profile_from_backend(profile_name) {
    let fetch_string = "/api/get_profile/" + profile_name;
    const response = await fetch(fetch_string, {
        method: "GET",
        headers: { "content-type": "application/json" },
    });
    let response_text = await response.text();
    if (response_text === "") {
        return null;
    } else {
        let retrieved_profile = (JSON.parse(response_text));
        return retrieved_profile;
    }
}

async function post_profile_to_backend(profile) {
    await fetch("/api/post_profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(profile)
    });
}

async function put_profile_to_backend(profile) {
    await fetch("/api/put_profile", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(profile)
    });
}

async function increment_habit_count_in_backend(habit_count) {
    await fetch("/api/put_habit_count", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({habit_count})
    });
}

async function get_habit_count_from_backend() {
    const response = await fetch("/api/get_habit_count", {
        method: "GET",
        headers: { "content-type": "application/json"}
    });
    let habit_count = await response.text();
    return habit_count;
}

// ============main=============================
async function test_main() {
    // testing get profile (existing test case and null case)
    let result1 = get_profile_from_backend("Jimmy"); // DEBUG
    result1.then((result) => console.log(result));  // DEBUG
    let result2 = get_profile_from_backend("John"); // DEBUG
    result2.then((result) => console.log(result));  // DEBUG

    // testing post profile
    let test_frontend_profile = new Profile("Jane", "123"); // DEBUG
    post_profile_to_backend(test_frontend_profile); // DEBUG
    let result3 = get_profile_from_backend("Jane"); // DEBUG
    result3.then((result) => console.log(result)); // DEBUG

    // testing get profile (inputted test case)
    let result4 = get_profile_from_backend("Pirate"); // DEBUG
    result4.then((result) => console.log(result)); // DEBUG

    // testing get habit count
    let result5 = get_habit_count_from_backend();
    result5.then((result) => console.log(result));

    // testing put habit count
    await increment_habit_count_in_backend(20);
    let result6 = get_habit_count_from_backend();
    result6.then((result) => console.log(result));
}



function normal_main() {
    let socket = configure_websocket();
    display_habit_counter();
    // setInterval(increment_and_display_habit_counter, 3000);
}


// test_main();
normal_main();











