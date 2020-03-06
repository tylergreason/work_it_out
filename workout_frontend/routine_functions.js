function renderRoutines(user){
    // clear routines div 
    removeChildren(userRoutinesDiv);
    fetch(`${routinesURL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(function(routines){
        const userRoutines = routines.filter(routine => routine.user_id === user.id)
        // debugger
        userRoutines.forEach(routine => userRoutinesDiv.appendChild(renderRoutine(routine)))
    })
}

function renderRoutine(routine){
    const routineCard = document.createElement('div')
    routineCard.dataset.id = routine.id; 
    routineCard.dataset.user_id = routine.user_id; 
    routineCard.className = "routineCard"

    const routineName = document.createElement('div'); 
    routineName.innerText = routine.name; 
    routineName.id = `routineName${routine.id}`
    routineName.className = "routineName"; 

    const routineDesc = document.createElement('div'); 
    routineDesc.innerText = routine.description; 
    routineDesc.id = `routineDesc${routine.id}`
    routineDesc.className = "routineDesc"; 

    const routineDate = document.createElement('div'); 
    routineDate.innerText = routine.date; 
    routineDate.id = `routineDate${routine.id}`; 
    routineDate.className = "routineDate"; 

    const routineDeleteBtn = document.createElement('button'); 
    routineDeleteBtn.innerText = 'delete routine'; 
    routineDeleteBtn.dataset.id = routine.id; 
    routineDeleteBtn.className = "routineDeleteBtn"; 

    routineDeleteBtn.addEventListener('click',function(e){
        deleteRoutine(e.target); 
    })

    const routineCopyBtn = document.createElement('button'); 
    routineCopyBtn.innerText = "copy"; 
    addCopyRoutineEventListener(routineCopyBtn); 
    routineCopyBtn.className = "routineCopyBtn";

    // put workouts here when that's working  
    const routineWorkouts = routine.workouts; 
    const routineWorkoutsList = renderWorkouts(routineWorkouts); 
    routineDeleteBtn.className = "routineDeleteBtn";
    routineWorkoutsList.id = `routineWorkoutsList${routine.id}`

    
    routineCard.appendChild(routineName);
    routineCard.appendChild(routineDate);
    routineCard.appendChild(routineDesc); 
    routineCard.appendChild(routineWorkoutsList); 
    routineCard.appendChild(routineDeleteBtn)
    routineCard.appendChild(routineCopyBtn); 
    return routineCard; 
}

function deleteRoutine(routine){
    fetch(`${routinesURL}${routine.dataset.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    routine.parentElement.remove()
}

function addCopyRoutineEventListener(element){
    element.addEventListener('click',function(e){
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
    if (newRoutineName.parentElement.hidden === true){
        newRoutineName.parentElement.hidden = false;
    }
}

function newRoutineForm(name,date,desc,workouts){
    const newRoutineFormBox = document.createElement('div'); 
    const newRoutineHeader = document.createElement('h2'); 
    newRoutineHeader.innerText = 'New Routine'
    newRoutineHeader.id = "newRoutineHeader"
    const newRoutineFormCard = document.createElement('div'); 
    
    // hide/unhide form card when clicking header 
    addHideEventListener(newRoutineHeader,newRoutineFormCard); 

    newRoutineFormCard.id = "newRoutineFormCard"
    newRoutineFormCard.hidden = true; 
    const newRoutineName = document.createElement('input');
    if (name === undefined){
        newRoutineName.value = "routine name"; 
    }else{
        newRoutineName.value = name;
    }
    newRoutineName.id = "newRoutineName"; 
    const newRoutineDate = document.createElement('input');
    newRoutineDate.type = "date";
    newRoutineDate.id = "newRoutineDate"; 
    if (date === undefined){
        newRoutineDate.value = parseDate();
    }else{
        newRoutineDate.value = date; 
    }
    const newRoutineDesc = document.createElement('textarea');
    if (desc === undefined){
        newRoutineDesc.value = "description"
    }else {
        newRoutineDesc.value = desc; 
    }
    newRoutineDesc.id = "newRoutineDesc"
    const newRoutineSubmitBtn = document.createElement('button'); 
    newRoutineSubmitBtn.innerText = "Submit routine" 

    const newRoutineMuscleSelection = document.createElement('div'); 
    newRoutineMuscleSelection.id = "newRoutineMuscleSelection"
    
    const newRoutineWorkoutsList = document.createElement('ul');
    if (workouts === undefined){
    }else {
        copyWorkouts(workouts,newRoutineWorkoutsList)
    }
    newRoutineWorkoutsList.id = "newRoutineWorkoutsList"
    
    newRoutineFormCard.appendChild(newRoutineName);
    insertBreak(newRoutineFormCard);
    newRoutineFormCard.appendChild(newRoutineDate); 
    insertBreak(newRoutineFormCard);
    newRoutineFormCard.appendChild(newRoutineDesc); 
    insertBreak(newRoutineFormCard);
    newRoutineFormCard.appendChild(newRoutineSubmitBtn); 
    newRoutineSubmitBtnEvent(newRoutineSubmitBtn);
    insertBreak(newRoutineFormCard);
    newRoutineFormCard.appendChild(newRoutineWorkoutsList); 
    
    // debugger
    fetchMusclesWithWorkouts(newRoutineMuscleSelection); 
    newRoutineFormCard.appendChild(newRoutineMuscleSelection); 

    newRoutineFormBox.appendChild(newRoutineHeader); 
    newRoutineFormBox.appendChild(newRoutineFormCard);
    return newRoutineFormBox; 
}

function addWorkoutToRoutineEvent(workout){
    const newRoutineWorkoutsList = document.querySelector("#newRoutineWorkoutsList")
    // debugger
    workout.addEventListener('click',function(e){
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
            renderRoutines(userObject); 
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
