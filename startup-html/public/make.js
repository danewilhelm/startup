// called when the submit button is clicked
async function submit_habit() {
    // get cue and response input
    const cue_el = document.querySelector('#cue');
    const response_el = document.querySelector('#response');
    let cue = cue_el.value;
    let response = response_el.value;

    // get the current profile
    let current_profile_name = localStorage.getItem("current_profile_name");
    let current_profile = await get_profile_from_backend(current_profile_name);

    // create Habit instance
    let submitted_habit = new Habit(cue, response);

    // add habit to current profile
    current_profile.habit_list.push(submitted_habit);

    // clear the input fields for the cue and response
    cue_el.value = '';
    response_el.value = '';
    
    // send new data to backend
    await put_profile_to_backend(current_profile);
    await increment_habit_count_in_backend();
    console.log("habit successfully submitted");
}

class Habit {
    constructor(cue, response) {
        this.cue = cue;
        this.commitment = ", I will ";
        this.response = response;
        this.whole_string = cue + this.commitment + response;
    }
}
//=====================Helper Functions===========================================
// --------------------Unique Helper Functions------------------------------------
function update_current_profile(updated_profile) {
    // send the current profile to local storage
    send_object_to_local_storage(updated_profile.name, updated_profile);
}

function display_quote() {
    fetch('https://api.quotable.io/random')
        .then((response) => response.json())
        .then((data) => {
        const container_el = document.querySelector('#quote');
        container_el.textContent = "";
        
        const quote_el = document.createElement('p');
        quote_el.classList.add('quote');
        const author_el = document.createElement('p');
        author_el.classList.add('author');

        quote_el.textContent = data.content;
        author_el.textContent = data.author;

        container_el.appendChild(quote_el);
        container_el.appendChild(author_el);
        });
    }

// --------------------reused helper functions------------------------------------
// localStorage function
function send_object_to_local_storage(storage_name, storage_object) {
    return localStorage.setItem(storage_name, JSON.stringify(storage_object));
}

// localStorage function
function retrieve_current_profile() {
    // grab the string name of the current profile
    let current_profile_name = localStorage.getItem("current_profile_name");
    // then return the profile object associated with that string name
    return JSON.parse(localStorage.getItem(current_profile_name));
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

// display function
function update_name() {
    // get name element and current profile
    const name_el = document.querySelector('.profile_name');
    let current_profile_name = localStorage.getItem("current_profile_name")

    // set name element to current profile's name
    name_el.textContent = current_profile_name ?? 'Mystery user';
}



//----------------Backend helper functions---------------------------------------------
//~~~~profile backend functions~~~~
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


//~~~~habit count backend functions~~~~
async function get_habit_count_from_backend() {
    const response = await fetch("/api/get_habit_count", {
        method: "GET",
        headers: { "content-type": "application/json"}
    });
    let habit_count = await response.text();
    return habit_count;
}

async function increment_habit_count_in_backend() {
    await fetch("/api/put_habit_count", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({})
    });
}


// ============main=============================
//testing main
async function test_main() {
    // testing habit count is actually updated when habit is made
    let result1 = get_habit_count_from_backend();
    result1.then((result) => console.log(result));

    // testing profile is actually updated when habit is made
    let result2 = get_profile_from_backend("test_profile"); // DEBUG
    result2.then((result) => console.log(result)); // DEBUG
}
// Normal main
function normal_main() {
    update_name();
    display_quote();

    // setInterval(increment_habit_counter, 10000);
}

// test_main();
normal_main();
