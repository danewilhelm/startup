//----------helper functions-------------
function send_object_to_local_storage(storage_name, storage_object) {
    return localStorage.setItem(storage_name, JSON.stringify(storage_object));
}

function retrieve_object_from_local_storage(storage_name) {
    return JSON.parse(localStorage.getItem(storage_name));
}

function retrieve_current_profile() {
    // grab the string name of the current profile
    let current_profile_name = localStorage.getItem("current_profile_name")
    // then return the profile object associated with that string name
    return retrieve_object_from_local_storage(current_profile_name);
}

function insert_child(parent_selector, child_element_type ,text) {
    // create child element
    const new_child = document.createElement(child_element_type);
    new_child.textContent = text;
    // append child to parent
    const parent_element = document.querySelector(parent_selector);
    parent_element.appendChild(new_child);
  }



//-----------------insert profile name------------------
// called in main (after the page loads)
function update_name() {
    // get name element and current profile
    const name_el = document.querySelector('.profile_name');
    let current_profile = retrieve_current_profile();

    // set name element to current profile's name
    name_el.textContent = current_profile.name ?? 'Mystery user';
}

// -----------------Generate list of habits--------------
function display_habit_library() {
    // retrieve habit_list
    let current_profile = retrieve_current_profile();
    let habit_list = current_profile.habit_list;
    

    // clear the template habits in the HTML
    const habits_el = document.querySelector('#habit_database');
    habits_el.textContent = null;
    
    // display each habit on the page
    if (habit_list.length === 0) {
        insert_child('#habit_database', 'li', 'Your submitted habits will appear here');
    } else {
        for (cur_habit of habit_list) {
            insert_child('#habit_database', 'li', cur_habit.whole_string);
        }
    }
}

// ---------------main--------------
update_name();
display_habit_library();