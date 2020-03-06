// placeholder user_id and logged_username for testing 
let user_id = undefined; 
let logged_username = undefined;   
let userObject = {}; 
const userRoutinesDiv = document.querySelector("#userRoutines")
const newRoutineDiv = document.querySelector("#newRoutineForm")
const newWorkoutDiv = document.querySelector("#newWorkoutForm")
const routinesURL = 'http://localhost:3000/routines/'
const musclesURL = 'http://localhost:3000/muscles/'
const workoutURL = 'http://localhost:3000/workouts'
const placeholderLoginValue = "calvin"
window.onload = event => {
    main_event(); 
}    

function main_event(){
    console.log('main event fired');
    clear_main(); 
    logged_in();
}

function render_main_page(){
    console.log('render main page fired')
    // running these functions when the user is logged in to test them quickly 
    newWorkoutDiv.appendChild(newWorkoutForm());
    renderRoutines(userObject);
    newRoutineDiv.appendChild(newRoutineForm())
}


