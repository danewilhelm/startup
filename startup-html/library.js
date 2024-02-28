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