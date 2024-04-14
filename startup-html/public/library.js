// -----------------Generate list of habits--------------
async function display_habit_library() {
    // retrieve habit_list
    let current_profile_name = localStorage.getItem("current_profile_name");
    let current_profile = await get_profile_from_backend(current_profile_name);
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

//=====================Helper Functions===========================================
// --------------------Unique Helper Functions------------------------------------
function insert_child(parent_selector, child_element_type ,text) {
    // create child element
    const new_child = document.createElement(child_element_type);
    new_child.textContent = text;
    // append child to parent
    const parent_element = document.querySelector(parent_selector);
    parent_element.appendChild(new_child);
}

// --------------------localStorage helper functions------------------------------------
// called in main (after the page loads)
function update_name() {
    // get name element and current profile
    const name_el = document.querySelector('.profile_name');
    let current_profile_name = localStorage.getItem("current_profile_name");

    // set name element to current profile's name
    name_el.textContent = current_profile_name ?? 'Mystery user';
}

function retrieve_current_profile() {
    // grab the string name of the current profile
    let current_profile_name = localStorage.getItem("current_profile_name");
    // then return the profile object associated with that string name
    return JSON.parse(localStorage.getItem(current_profile_name));
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

// ============main=============================
update_name();
display_habit_library();