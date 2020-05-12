// constants 
const navigationOptions = [newRoutineDiv, newWorkoutDiv, userRoutinesDiv] 
const navbar = document.getElementById('navbar')

function hideAllDivs(){
    navigationOptions.forEach(div => div.hidden = true); 
}

function hideAllAndShow(div){
    //hide all divs then show the div given as a parameter 
    hideAllDivs() 
    div.hidden = false; 
}

function createNavbarButton(text, className,clickFunction){
    // function for creating buttons for the navbar 
    const newButton = newElement('button'); 
    newButton.innerText = text; 
    // add click listener for the given function 
    newButton.addEventListener('click', function(e){
        e.preventDefault(); 
        clickFunction()
    })

    // add class names 
    addClass(newButton, 'navbar__button')
    addClass(newButton, `navbar__button--${className}`)

    // append button to the navbar 
    append(newButton, navbar); 
}

// create buttons 
function navbarButtons(){
    // functions supplied as arguments must be wrapped in an anonymous function 
    //new routine button 
    //user routines button 
    createNavbarButton('My Routines', 'userRoutines', function(){
        hideAllAndShow(userRoutinesDiv); 
    })
    createNavbarButton('New Routine', 'newRoutine',function(){
        hideAllAndShow(newRoutineDiv); 
    })
    //new workout button 
    createNavbarButton('New Workout', 'newWorkout', function(){
        hideAllAndShow(newWorkoutDiv); 
    })
    // start the page at user routines div 
    hideAllAndShow(userRoutinesDiv)
}