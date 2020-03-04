console.log("render functions was loaded correctly")

// render all user's routines  
function renderRoutines(user){
    let routines = user.routines; 
    routines.forEach(function(routine){
        console.log(routine); 
        main.appendChild(renderRoutine(routine)) 
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
    routineDeleteBtn.innerText = 'delete'; 
    routineDeleteBtn.dataset.id = routine.id; 

    routineDeleteBtn.addEventListener('click',function(e){
        deleteRoutine(e.target); 
    })

    // put workouts here when that's working  

    routineCard.appendChild(routineName);
    routineCard.appendChild(routineDesc); 
    routineCard.appendChild(routineDate);
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

// id: 1
// name: "Monday workout"
// description: "Doloribus debitis voluptatem blanditiis et."
// date: "2020-09-28"
// created_at: "2020-03-04T13:42:30.615Z"
// updated_at: "2020-03-04T13:42:30.615Z"
// user_id: 1

function newRoutineForm(){
    const newRoutineFormCard = document.createElement('div'); 

    const newRoutineName = document.createElement('input');
    const newRoutineDesc = document.createElement('input');
    const newRoutineDate = document.createElement('input');
    newRoutineDate.type = "date"


}

function newRoutine(){

}