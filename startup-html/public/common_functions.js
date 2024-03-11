// import { send_object_to_local_storage } from './common_functions.js';
// import { retrieve_object_from_local_storage } from './common_functions.js';
// import { retrieve_current_profile } from './common_functions.js';
// import { get_habit_counter_int } from './common_functions.js'; // used in increment_habit_counter
// import { increment_habit_counter } from './common_functions.js';
// import { update_name } from './common_functions.js';

//------------local storage retrieve and send functions---------------------
export function send_object_to_local_storage(storage_name, storage_object) {
    return localStorage.setItem(storage_name, JSON.stringify(storage_object));
}

export function retrieve_object_from_local_storage(storage_name) {
    return JSON.parse(localStorage.getItem(storage_name));
}

export function retrieve_current_profile() {
    // grab the string name of the current profile
    let current_profile_name = localStorage.getItem("current_profile_name")
    // then return the profile object associated with that string name
    return JSON.parse(localStorage.getItem(current_profile_name));
}

//--------------habit counter functions----------------
export function get_habit_counter_int() {
    let habit_counter = localStorage.getItem('habit_counter') ?? 0;
    return parseInt(habit_counter);
}

export function increment_habit_counter() {
    let habit_counter = get_habit_counter_int() + 1;
    localStorage.setItem('habit_counter', habit_counter);
}

//-------------displaying the user's name on the page------------
export function update_name() {
    // get name element and current profile
    const name_el = document.querySelector('.profile_name');
    let current_profile = retrieve_current_profile();

    // set name element to current profile's name
    name_el.textContent = current_profile.name ?? 'Mystery user';
}