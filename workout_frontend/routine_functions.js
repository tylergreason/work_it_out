function renderRoutine(routine){
    const routineCard = document.createElement('div')
    routineCard.dataset.id = routine.id; 
    routineCard.dataset.user_id = routine.user_id; 
    addClass(routineCard,'userRoutine')

    // element to hold name, date, and description for styling. 
    const userRoutineDetails = newElement('div'); 
    addClass(userRoutineDetails, 'userRoutine__details')


    const routineName = document.createElement('h2'); 
    routineName.innerText = routine.name; 
    routineName.id = `routineName${routine.id}`
    addClass(routineName, 'userRoutine__name')

    const routineDesc = document.createElement('div'); 
    routineDesc.innerText = routine.description; 
    routineDesc.id = `routineDesc${routine.id}`
    addClass(routineDesc, 'userRoutine__desc')

    const routineDate = document.createElement('div'); 
    routineDate.innerText = routine.date; 
    routineDate.id = `routineDate${routine.id}`; 
    addClass(routineDate, 'userRoutine__date')

    const routineDeleteBtn = routineDeleteButton(routine) 
    const routineCopyBtn = routineCopyButton(routine);

    const routineWorkouts = renderWorkouts(routine.workouts); 
    routineWorkouts.id = `routineWorkoutsList${routine.id}`
    addClass(routineWorkouts, 'userRoutine__workouts')

    append(routineName, userRoutineDetails)
    append(routineDate,userRoutineDetails)
    append(routineDesc, userRoutineDetails)
    append(routineDeleteBtn, userRoutineDetails)
    append(routineCopyBtn, userRoutineDetails)
    append(userRoutineDetails, routineCard)
    routineCard.appendChild(routineWorkouts); 
    return routineCard; 
}

function deleteRoutine(routine){
    fetch(`${routinesURL}${routine.dataset.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    // routine.parentElement.remove()
    renderUserRoutines(userObject)
}


function routineCopyButton(routine){ 
    const routineCopyBtn = document.createElement('button'); 
    // give it the id of the routine for copying 
    routineCopyBtn.dataset.id = routine.id; 
    routineCopyBtn.innerText = 'Copy Routine'
    // add on click listener for copying routine 
    addCopyRoutineEventListener(routineCopyBtn); 
    
    addClass(routineCopyBtn, 'userRoutine__button')
    addClass(routineCopyBtn, 'userRoutine__button--copy')

    return routineCopyBtn
}

function routineDeleteButton(routine){
    const routineDeleteBtn = newElement('button'); 
    routineDeleteBtn.innerText = 'Delete Routine'; 
    routineDeleteBtn.dataset.id = routine.id; 
    addClass(routineDeleteBtn, 'userRoutine__button')
    addClass(routineDeleteBtn, 'userRoutine__button--delete')

    routineDeleteBtn.addEventListener('click',function(e){
        deleteRoutine(e.target); 
    })
    return routineDeleteBtn;
}


function routineCopyButtonOLD(routine){ 
    
    const routineCopyBtn = document.createElement('div'); 
    // give it the id of the routine for copying 
    routineCopyBtn.dataset.id = routine.id; 
    
    /*
        everything below was for a fancier button with an icon and all. It was taking waaaaaay too much time to get right so I went back to using a regular button for the time being. Might come back to this later. Took a while, so I wanted to save the code. 
    */ 


    // const routineCopyBtn = document.createElement('div'); 
    // // give it the id of the routine for copying 
    // routineCopyBtn.dataset.id = routine.id; 

    // // add copy icon to button 
    // const copyIconDiv = copyIcon(); 
    // append(copyIconDiv, routineCopyBtn)
    // addClass(copyIconDiv, 'routineCopyButton__icon')
    
    // // create a div with button text to append to routineCopyButton 
    // const text = newElement('div'); 
    // text.innerText = "Copy Routine" 
    // addClass(text, 'routineCopyButton__text')
    // append(text, routineCopyBtn)
    
    // // add on click listener for copying routine 
    // addCopyRoutineEventListener(routineCopyBtn); 
    
    // addClass(routineCopyBtn, 'userRoutine__button')
    // addClass(routineCopyBtn, 'userRoutine__button--copy')
    return routineCopyBtn;
}

function addCopyRoutineEventListener(element){
    element.addEventListener('click',function(e){
        console.log(element.dataset.id)
        // e.preventDefault();
        copyRoutines(e); 
    })
}

function copyRoutines(element){
    const routineName = document.querySelector(`#routineName${element.target.parentElement.dataset.id}`).innerText; 
    // const routineDate = document.querySelector(`#routineDate${element.target.parentElement.dataset.id}`).innerText; 
    const routineDate = parseDate(); 
    const routineDesc = document.querySelector(`#routineDesc${element.target.parentElement.dataset.id}`).innerText; 
    const routineWorkoutList = document.querySelector(`#routineWorkoutsList${element.target.parentElement.dataset.id}`)

    const newRoutineName = document.querySelector("#newRoutineName"); 
    const newRoutineDesc = document.querySelector("#newRoutineDesc"); 
    const newRoutineDate = document.querySelector("#newRoutineDate"); 
    const newRoutineWorkoutsList = document.querySelector("#newRoutineWorkoutsList"); 
    // main.appendChild(newRoutineForm(routineName,routineDate,routineDesc,routineWorkoutList))
    newRoutineName.value = routineName; 
    newRoutineDate.value = parseDate(); 
    newRoutineDesc.value = routineDesc; 
    // debugger 
    copyWorkouts(routineWorkoutList,newRoutineWorkoutsList);
    // console.log(routineWorkoutList.children);
}

function newRoutineForm(name,date,desc,workouts){
    const newRoutineContainer = document.createElement('div'); 
    addClass(newRoutineContainer, 'newRoutine__container')
    const newRoutineHeader = document.createElement('h2'); 
    newRoutineHeader.innerText = 'New Routine'
    newRoutineHeader.id = "newRoutineHeader"
    addClass(newRoutineHeader, 'newRoutine__header')
    const newRoutineFormCard = document.createElement('div'); 
    
    // hide/unhide form card when clicking header 
    addHideEventListener(newRoutineHeader,newRoutineFormCard); 

    newRoutineFormCard.id = "newRoutineFormCard"

    
    const newRoutineName = document.createElement('input');
    if (name === undefined){
        newRoutineName.placeholder = "routine name"; 
    }else{
        newRoutineName.value = name;
    }
    addClass(newRoutineName, 'newRoutine__name')
    newRoutineName.id = "newRoutineName"; 
    const newRoutineDate = document.createElement('input');
    newRoutineDate.type = "date";
    addClass(newRoutineDate, 'newRoutine__date')
    newRoutineDate.id = "newRoutineDate"; 
    if (date === undefined){
        newRoutineDate.value = parseDate();
    }else{
        newRoutineDate.value = date; 
    }
    const newRoutineDesc = document.createElement('textarea');
    
    if (desc === undefined){
        newRoutineDesc.placeholder = "description"
    }else {
        newRoutineDesc.value = desc; 
    }
    addClass(newRoutineDesc, 'newRoutine__desc')
    newRoutineDesc.id = "newRoutineDesc"
    const newRoutineSubmitBtn = document.createElement('button'); 
    newRoutineSubmitBtn.innerText = "Submit routine" 
    addClass(newRoutineSubmitBtn,'newRoutine__submit')

    const newRoutineMuscleSelection = document.createElement('div'); 
    newRoutineMuscleSelection.id = "newRoutineMuscleSelection"
    addClass(newRoutineMuscleSelection, 'newRoutine__muscles')

    const newRoutineWorkoutsList = document.createElement('ul');
    // if no workouts parameter was given, do nothing. Else, copy workouts given to the newRoutineWorkoutsList ul element made on the previous line. 
    if (workouts !== undefined){
        copyWorkouts(workouts,newRoutineWorkoutsList)
    }
    newRoutineWorkoutsList.id = "newRoutineWorkoutsList"
    addClass(newRoutineWorkoutsList, 'newRoutine__workouts')

    // append elements to newRoutineFormCard
    append(newRoutineName, newRoutineFormCard);
    insertBreak(newRoutineFormCard);
    append(newRoutineDate, newRoutineFormCard);    
    insertBreak(newRoutineFormCard);
    append(newRoutineDesc,newRoutineFormCard); 
    insertBreak(newRoutineFormCard);
    append(newRoutineSubmitBtn,newRoutineFormCard); 
    // add submit event to button 
    newRoutineSubmitBtnEvent(newRoutineSubmitBtn);
    insertBreak(newRoutineFormCard);
    append(newRoutineWorkoutsList,newRoutineFormCard); 

    // add muscles with their workouts 
    fetchMusclesWithWorkouts(newRoutineMuscleSelection); 
    newRoutineFormCard.appendChild(newRoutineMuscleSelection); 

    append(newRoutineHeader,newRoutineContainer); 
    append(newRoutineFormCard,newRoutineContainer); 
    addClass(newRoutineFormCard,'hidden')
    return newRoutineContainer; 
}

function addWorkoutToRoutineEvent(workout){
    // onClick function for adding workout to a new routine 
    const newRoutineWorkoutsList = document.querySelector("#newRoutineWorkoutsList")
    workout.addEventListener('click',function(e){
        console.log(this)
        if (checkIfIdPresent(newRoutineWorkoutsList,this.dataset.id).length === 0){
            let newNode = this.cloneNode(true); 
            newRoutineWorkoutsList.appendChild(newNode); 
            removeWorkoutFromNewRoutineWorkoutListListener(newNode);
        }
    })
}

function checkIfIdPresent(node,id){
    let arrayToCompare = Array.from(node.children); 
    return arrayToCompare.filter( element => element.dataset.id === id)
}

function removeWorkoutFromNewRoutineWorkoutListListener(workout){
    workout.addEventListener('click',function(e){
        e.preventDefault();
        this.parentElement.removeChild(this); 
    })
}

function newRoutineSubmitBtnEvent(button){
    button.addEventListener('click',function(e){
        e.preventDefault();
        const newRoutineName = document.getElementById("newRoutineName");
        const newRoutineDate = document.getElementById("newRoutineDate");
        // debugger
        const newRoutineDesc = document.getElementById("newRoutineDesc");
        const newRoutineWorkoutsList = document.getElementById("newRoutineWorkoutsList")
        const newRoutineWorkoutsArray = Array.from(newRoutineWorkoutsList.children)
        const workoutIds = newRoutineWorkoutsArray.map(workout => workout.dataset.id)

        newRoutine(newRoutineName.value,newRoutineDesc.value,newRoutineDate.value,workoutIds)
    })
}

async function newRoutine(name,desc,date,workouts){
        const objData = {
            "user_id":user_id,
            "name": name,
            "description": desc,
            "date": date, 
            "workouts": workouts
        };
        const data = await fetch(`http://localhost:3000/routines/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objData)
        })
        const resp = await data.json()
        .then((data) => {
            console.log('Success:', data);
            // add routine to user routines list 
            renderUserRoutines(userObject)
        })
}

function copyWorkouts(workouts,list){
    const workoutsArray = Array.from(workouts.children); 
    removeChildren(list); 
    workoutsArray.forEach(function(workout){
        const workoutClone = workout.cloneNode(true); 
        removeWorkoutFromNewRoutineWorkoutListListener(workoutClone);
        // debugger 
        list.appendChild(workoutClone); 
    })
}

function hideMuscleWorkoutsListener(){
    //find each muscle__header in the newRoutine form and add the click listener to hide its children 
    const muscleHeaders = Array.from(document.getElementsByClassName('muscle__header'))
    console.log(muscleHeaders)
    muscleHeaders.forEach(header => {
        console.log(header)
        console.log(header.children[0])
        addHideEventListener(header, header.children[0])
    })
}