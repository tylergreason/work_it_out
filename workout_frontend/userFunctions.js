// constants for user 
let userRoutines = ''

function renderUserRoutines(user){
    const userRoutinesHeader = renderUserRoutinesHeader()
    const userRoutinesContainer = renderUserRoutinesContainer()
    append(userRoutinesHeader, userRoutinesDiv)
    append(userRoutinesContainer, userRoutinesDiv)
    addHideEventListener(userRoutinesHeader,userRoutinesContainer)
    // render current user's routines 
    // clear routines div 
    // removeChildren(userRoutinesDiv);
    fetch(`${routinesURL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // include username to let backend filter routines by user 
            'user': user.username
        }
    })
    .then(resp => resp.json())
    .then(function(routines){
        //set user routines 
        userRoutines = routines;
        // const userRoutinesContainer = document.getElementById('userRoutines__container')
        //append all routines to user routines container 
        routines.forEach(routine => {
            append(renderRoutine(routine), userRoutinesContainer)
        })
    })
}

function renderUserRoutinesHeader(){
    const userRoutinesHeader = newElement('h2'); 
    userRoutinesHeader.innerText = 'My Routines'; 
    addClass(userRoutinesHeader, 'userRoutines__header'); 
    return userRoutinesHeader; 
    // append(userRoutinesHeader, userRoutinesDiv);
    // const userRoutinesContainer = document.getElementById('userRoutines__container')
}

function renderUserRoutinesContainer(){
    const container = newElement('div'); 
    container.id = 'userRoutines__container'
    addClass(container, 'userRoutines__container')
    return container; 
}