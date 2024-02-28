//----------helper functions-------------
function send_object_to_local_storage(storage_name, storage_object) {
    return localStorage.setItem(storage_name, JSON.stringify(storage_object));
}

function retrieve_object_from_local_storage(storage_name) {
    return JSON.parse(localStorage.getItem(storage_name));
}

function retrieve_current_profile() {
    // grabs the string name of the current profile
    let current_profile_name = localStorage.getItem("current_profile_name")

    // then returns the profile object associated with that string name
    return retrieve_object_from_local_storage(current_profile_name);
}

//------------Habits------------
class Habit {
    constructor(cue, response) {
        this.cue = cue;
        this.commitment = ", I will ";
        this.response = response;
        this.whole_string = cue + this.commitment + response;
    }
}

// called when the submit button is clicked
function submit_habit() {
    // get cue and response input, and current profile
    const cue_el = document.querySelector('#cue');
    const response_el = document.querySelector('#response');
    let cue = cue_el.value;
    let response = response_el.value;
    let current_profile = retrieve_current_profile();

    // create Habit instance
    let submitted_habit = new Habit(cue, response);

    // add habit to current profile
    current_profile.habit_list.push(submitted_habit);

    // clear the input fields for the cue and response
    cue_el.value = '';
    response_el.value = '';

    // send new data to local storage
    send_object_to_local_storage("current_profile", current_profile);
    console.log("habit successfully submitted");
}

//-----------------profile name------------------
// called in main (after the page loads)
function update_name() {
    // get name element and current profile
    const name_el = document.querySelector('.profile_name');
    let current_profile = retrieve_current_profile();

    // set name element to current profile's name
    name_el.textContent = current_profile.name ?? 'Mystery user';
}

// main
update_name();



// ----------current questions-------------
// how to import js files into other js files
// how to run a script element in the head element after the body element is loaded