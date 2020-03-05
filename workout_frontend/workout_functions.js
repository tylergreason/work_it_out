function renderWorkouts(workouts){
    const workoutList = document.createElement('ul'); 
    workouts.forEach(function(workout){
        const workoutLi = document.createElement('li'); 
        workoutLi.appendChild(renderWorkout(workout)); 
        workoutLi.appendChild(renderMuscles(workout.muscles))
        workoutLi.className = "workoutLi"
        workoutLi.dataset.id = workout.id; 
        workoutList.appendChild(workoutLi); 
    })
    return workoutList; 
}

function renderWorkout(workout){
    const workoutCard = document.createElement('div'); 
    workoutCard.dataset.id = workout.id; 
    const workoutName = document.createElement('div'); 
    workoutName.innerText = workout.name; 
    const workoutDifficulty = document.createElement('div'); 
    workoutDifficulty.innerText = `Difficulty: ${workout.difficulty}`; 
    const workoutDesc = document.createElement('div'); 
    workoutDesc.innerText = `Description: ${workout.description}`;
    workoutCard.appendChild(workoutName);
    workoutCard.appendChild(workoutDifficulty);
    workoutCard.appendChild(workoutDesc); 
    return workoutCard; 
}

function renderWorkoutsForNewRoutine(workouts){
    const workoutList = document.createElement('ul'); 
    workouts.forEach(function(workout){
        const workoutLi = document.createElement('li'); 
        workoutLi.appendChild(renderWorkout(workout)); 
        workoutLi.appendChild(renderMuscles(workout.muscles))
        addWorkoutToRoutineEvent(workoutLi); 
        workoutList.appendChild(workoutLi); 
    })
    return workoutList; 
}

function newWorkoutForm(){
    const newWorkoutFormBox = document.createElement('div'); 
    const newWorkoutHeader = document.createElement('h2')
    newWorkoutHeader.innerText = "New Workout"

    const newWorkoutCard = document.createElement('div'); 
    newWorkoutCard.hidden = true; 
    
    // add event listener to hide/unhide new workout form card 
    addHideEventListener(newWorkoutHeader,newWorkoutCard); 
    const newWorkoutName = document.createElement('input'); 
    newWorkoutName.value = "name placeholder"; 
    newWorkoutName.id = "newWorkoutName";
    const newWorkoutDesc = document.createElement('textarea'); 
    newWorkoutDesc.value = "description placeholder"; 
    newWorkoutDesc.id = "newWorkoutDesc"; 
    const difficulties = ["easy", "medium","hard"]
    const newWorkoutDifficulty = document.createElement("select")
    newWorkoutDifficulty.id = "newWorkoutDifficulty";
    const newWorkoutSubmitBtn = document.createElement('button'); 
    newWorkoutSubmitBtn.innerText = "submit" 
    submitWorkoutEventListener(newWorkoutSubmitBtn); 

    difficulties.forEach(function(difficulty){
        const newOption = document.createElement("option"); 
        newOption.text = difficulty;  
        newWorkoutDifficulty.add(newOption); 
    })

    const muscleSelectDiv = document.createElement('div'); 
    muscleSelectDiv.id = "muscleSelectDiv";
    renderMuscleSelectBoxToId(muscleSelectDiv.id)
    newWorkoutCard.appendChild(newWorkoutName); 
    insertBreak(newWorkoutCard);
    newWorkoutCard.appendChild(newWorkoutDifficulty); 
    insertBreak(newWorkoutCard);
    newWorkoutCard.appendChild(newWorkoutDesc); 
    insertBreak(newWorkoutCard);
    newWorkoutCard.appendChild(newWorkoutSubmitBtn)
    newWorkoutCard.appendChild(muscleSelectDiv);
    newWorkoutFormBox.appendChild(newWorkoutHeader); 
    newWorkoutFormBox.appendChild(newWorkoutCard); 
    return newWorkoutFormBox; 
}

function createWorkout(name,difficulty,description,muscles){
    const workoutObject = {
        "name":name,
        "difficulty":difficulty,
        "description":description,
        "muscles":muscles
    }
    postRequest(workoutURL,workoutObject)
}

function submitWorkoutEventListener(button){
    button.addEventListener('click', function(e){
        const newWorkoutName = document.getElementById("newWorkoutName").value; 
        const newWorkoutDesc = document.getElementById("newWorkoutDesc").value; 
        const newWorkoutDifficulty = document.getElementById("newWorkoutDifficulty").value; 
        const newWorkoutMuscleIds = returnCheckedMuscles("muscleSelectDiv"); 
        // debugger; 
        createWorkout(newWorkoutName,newWorkoutDesc,newWorkoutDifficulty,newWorkoutMuscleIds); 
    })
}