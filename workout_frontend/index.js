// placeholder user_id and logged_username for testing 
let user_id = undefined; 
let logged_username = undefined;   
let userObject = {}; 
const routinesURL = 'http://localhost:3000/routines/'
const musclesURL = 'http://localhost:3000/muscles/'
const workoutURL = 'http://localhost:3000/workouts'
const placeholderLoginValue = "alfreda"
window.onload = event => {
    main_event(); 
}    
function clear_main(){
    while (main.firstChild){
        main.removeChild(main.firstChild); 
    }
}

async function new_user (first_name, last_name, username, password){
    const objData = { 
        "first_name": first_name,
        "last_name": last_name,
        "username": username, 
        "password": password
    };
    const data = await fetch(`http://localhost:3000/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objData)
    })
    const resp = await data.json()
    .then((data) => {
        console.log('Success:', data);
        userObject = data; 
        logged_username = data.username; 
        user_id = data.id; 
        console.log(`username is ${logged_username}`)
        main_event()
    })
}

function main_event(){
    console.log('main event fired');
    clear_main(); 
    logged_in();
}

function logged_in(){
    console.log(`logged_in fired`)
    if (logged_username !== undefined){ 
        console.log(`user is now logged in`)
        render_main_page();
    } else{
        check_login();
        console.log(`user was not logged in`)
    }
}

function check_login(){
    // logged in variables 
    // main div 
    const main = document.querySelector('#main') 
    let login_div = document.createElement('div'); 
    login_div.id = 'login_div'
    let username_text = document.createElement('input');
    username_text.id = "username_text"
    username_text.value = placeholderLoginValue; 
    let username_button = document.createElement('button'); 
    username_button.innerText = "log in"
    // add event listener for submission 
    login_button_listener(username_button)
    login_div.appendChild(username_text); 
    login_div.appendChild(username_button); 
    main.appendChild(login_div)
}

function login_button_listener(button){
    button.addEventListener('click', function(e){
        e.preventDefault(); 
        let username_div = document.querySelector("#username_text"); 
        let username_value = username_div.value; 
        // call new user with just username 
        new_user ('nil','nil',username_value, 'password'); 
        })
}

function render_main_page(){
    console.log('render main page fired')
    // running these functions when the user is logged in to test them quickly 
    // main.appendChild(newWorkoutForm());
    // main.appendChild(newRoutineForm());
    renderRoutines(userObject);
}


