console.log("render functions was loaded correctly")

// render all user's routines  
// function renderRoutines2(user){
//     let routines = user.routines; 
//     routines.forEach(function(routine){
//         console.log(routine); 
//         main.appendChild(renderRoutine(routine)) 
//     })
// }

function renderRoutines(user){
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
        userRoutines.forEach(routine => main.appendChild(renderRoutine(routine)))
    })
}


function renderRoutine(routine){
    const routineCard = document.createElement('div')
    routineCard.dataset.id = routine.id; 
    routineCard.dataset.user_id = routine.user_id; 

    const routineName = document.createElement('div'); 
    routineName.innerText = routine.name; 
    const routineDesc = document.createElement('div'); 
    routineDesc.innerText = routine.description; 
    const routineDate = document.createElement('div'); 
    routineDate.innerText = routine.date; 
    const routineDeleteBtn = document.createElement('button'); 
    routineDeleteBtn.innerText = 'delete routine'; 
    routineDeleteBtn.dataset.id = routine.id; 

    routineDeleteBtn.addEventListener('click',function(e){
        deleteRoutine(e.target); 
    })
    // put workouts here when that's working  
    const routineWorkouts = routine.workouts; 

    routineCard.appendChild(routineName);
    routineCard.appendChild(routineDesc); 
    routineCard.appendChild(routineDate);
    routineCard.appendChild(renderWorkouts(routineWorkouts))
    routineCard.appendChild(routineDeleteBtn)
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

function newRoutineForm(){
    const newRoutineFormCard = document.createElement('div'); 

    const newRoutineHeader = document.createElement('h2'); 
    newRoutineHeader.innerText = 'New Routine'
    const newRoutineName = document.createElement('input');
    newRoutineName.value = "routine name"; 
    newRoutineName.id = "newRoutineName"; 
    const newRoutineDate = document.createElement('input');
    newRoutineDate.type = "date";
    newRoutineDate.id = "newRoutineDate"; 
    newRoutineDate.value = "2019-01-01"
    const newRoutineDesc = document.createElement('textarea');
    newRoutineDesc.value = "description"
    newRoutineDesc.id = "newRoutineDesc"
    const newRoutineSubmitBtn = document.createElement('button'); 
    newRoutineSubmitBtn.innerText = "Submit routine" 

    const newRoutineMuscleSelection = document.createElement('div'); 
    newRoutineMuscleSelection.id = "newRoutineMuscleSelection"
    fetchMusclesWithWorkouts(newRoutineMuscleSelection); 
    const newRoutineWorkoutsList = document.createElement('ul');
    newRoutineWorkoutsList.id = "newRoutineWorkoutsList"

    newRoutineFormCard.appendChild(newRoutineHeader); 
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
    
    return newRoutineFormCard; 
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
    const arrayToCompare = Array.from(node.children); 

    return arrayToCompare.filter( element => element.dataset.id === id)
}

function removeWorkoutFromNewRoutineWorkoutListListener(workout){
    workout.addEventListener('click',function(e){
        // debugger
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
        })
}