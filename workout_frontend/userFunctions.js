// constants for user 
let userRoutines = ''

function renderUserContainer(user){
    console.log('render user container fired')
    const userRoutinesHeader = renderUserRoutinesHeader()
    const userRoutinesContainer = renderUserRoutinesContainer()
    append(userRoutinesHeader, userRoutinesDiv)
    append(userRoutinesContainer, userRoutinesDiv)
    addHideEventListener(userRoutinesHeader,userRoutinesContainer)
    renderUserRoutines(user); 
}


function renderUserRoutines(user, id=undefined){
    // render routines by the user 
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
        const userRoutinesContainer = document.getElementById('userRoutines__container')
        // if an id was supplied, filter that routine out before rendering routines 
        removeChildren(userRoutinesContainer);
        console.log(id)
        if (id !== undefined){
            const renderRoutines = routines.filter(routine => routine.id !== id);
            console.log(renderRoutines);  
            userRoutines = renderRoutines; 
            renderRoutines.forEach(routine => append(renderRoutine(routine), userRoutinesContainer)); 
        }else{
            console.log(routines)
            //set user routines 
            userRoutines = routines;
    
            //append all routines to user routines container 
            routines.forEach(routine => {
                append(renderRoutine(routine), userRoutinesContainer)
            })
        }
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