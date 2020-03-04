console.log("render functions was loaded correctly")

// render all user's routines  
function render_routines(user){
    let routines = user.routines; 
    routines.forEach(function(routine){
        console.log(routine); 
    })
}

function render_routine(routine){
    const routineCard = document.createElement('div')
    routineCard.dataset.id = routine.id; 
    routineCard.dataset.user_id = routine.user_id; 

    const routineName = document.createElement('div'); 
    routineName.innerText = routine.name; 
    const routineDesc = document.createElement('div'); 
    routineDesc.innerText = routine.description; 
}


// id: 1
// name: "Monday workout"
// description: "Doloribus debitis voluptatem blanditiis et."
// date: "2020-09-28"
// created_at: "2020-03-04T13:42:30.615Z"
// updated_at: "2020-03-04T13:42:30.615Z"
// user_id: 1