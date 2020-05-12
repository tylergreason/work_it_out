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

function createNavbarButton(text, clickFunction){
    // function for creating buttons for the navbar 
    const newButton = newElement('button'); 
    newButton.innerText = text; 
    // add click listener for the given function 
    newButton.addEventListener('click', function(e){
        e.preventDefault(); 
        clickFunction()
    })
    // append button to the navbar 
    append(newButton, navbar); 
}

// create buttons 
function navbarButtons(){
    // functions supplied as arguments must be wrapped in an anonymous function 
    //new routine button 
    createNavbarButton('New Routine', function(){
        hideAllAndShow(newRoutineDiv); 
    })
    //new workout button 
    createNavbarButton('New Workout', function(){
        hideAllAndShow(newWorkoutDiv); 
    })
    //user routines button 
    createNavbarButton('My Routines', function(){
        hideAllAndShow(userRoutinesDiv); 
    })
}