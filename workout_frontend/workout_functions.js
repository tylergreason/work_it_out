function renderWorkouts(workouts){
    const workoutList = document.createElement('ul'); 
    addClass(workoutList, 'workouts')
    workouts.forEach(function(workout){
        const workoutLi = document.createElement('li'); 
        workoutLi.appendChild(renderWorkout(workout)); 
        // workoutLi.appendChild(renderMuscles(workout.muscles))
        workoutLi.className = "workoutLi"
        workoutLi.dataset.id = workout.id; 
        workoutList.appendChild(workoutLi); 
    })
    return workoutList; 
}

function renderWorkout(workout){
    const workoutCard = document.createElement('div'); 
    addClass(workoutCard,'workout')
    workoutCard.dataset.id = workout.id; 
    const workoutName = document.createElement('div'); 
    addClass(workoutName,'workout__name')
    workoutName.innerText = workout.name; 
    const workoutDifficulty = document.createElement('div'); 
    workoutDifficulty.innerText = `${workout.difficulty}`; 
    addClass(workoutDifficulty,'workout__difficulty')
    const workoutDesc = document.createElement('div'); 
    workoutDesc.innerText = `${workout.description}`;
    addClass(workoutDesc,'workout__desc')
    workoutCard.appendChild(workoutName);
    workoutCard.appendChild(workoutDifficulty);
    workoutCard.appendChild(workoutDesc); 
    // append muscle list to card 
    const muscles = renderWorkoutMuscles(workout) 
    addClass(muscles,'muscles')
    addClass(muscles,'muscles--workoutCard')
    workoutCard.appendChild(muscles);
    return workoutCard; 
}



function renderWorkoutsForNewRoutine(workouts){
    const workoutsContainer = document.createElement('div'); 
    addClass(workoutsContainer, 'muscle__workouts')
    workouts.forEach(function(workout){
        const workoutCard = renderWorkout(workout); 
        addWorkoutToRoutineEvent(workoutCard);
        append(workoutCard, workoutsContainer)
    })
    return workoutsContainer; 
}

function newWorkoutForm(){
    const newWorkoutContainer = document.createElement('div'); 
    addClass(newWorkoutContainer, 'newWorkout')
    const newWorkoutHeader = document.createElement('h2')
    newWorkoutHeader.innerText = "New Workout"
    addClass(newWorkoutHeader, 'newWorkout__header')

    const newWorkoutCard = document.createElement('div'); 
    
    // add event listener to hide/unhide new workout form card 
    addHideEventListener(newWorkoutHeader,newWorkoutCard); 

    const newWorkoutName = document.createElement('input'); 
    newWorkoutName.placeholder = "name"; 
    newWorkoutName.id = "newWorkoutName";
    addClass(newWorkoutName, 'newWorkout__name')

    const newWorkoutDesc = document.createElement('textarea'); 
    newWorkoutDesc.placeholder = "description"; 
    newWorkoutDesc.id = "newWorkoutDesc"; 
    addClass(newWorkoutDesc, 'newWorkout__desc')

    // difficulties 
    const difficulties = ["easy", "medium","hard"]
    const newWorkoutDifficulty = document.createElement("select")
    newWorkoutDifficulty.id = "newWorkoutDifficulty";
    addClass(newWorkoutDifficulty, 'newWorkout__difficulty')
    
    // difficulty select 
    difficulties.forEach(function(difficulty){
        const newOption = document.createElement("option"); 
        newOption.text = difficulty;  
        addClass(newOption,'newWorkout__option--difficulty')
        newWorkoutDifficulty.add(newOption); 
    })

    // submit new workout button 
    const newWorkoutSubmitBtn = document.createElement('button'); 
    newWorkoutSubmitBtn.innerText = "submit" 
    addClass(newWorkoutSubmitBtn, 'newWorkout__submit')
    submitWorkoutEventListener(newWorkoutSubmitBtn); 

    const muscleSelectDiv = document.createElement('div'); 
    muscleSelectDiv.id = "muscleSelectDiv";
    addClass(muscleSelectDiv, 'newWorkout__muscles')
    renderMuscleSelectBoxToId(muscleSelectDiv.id)

    append(newWorkoutName, newWorkoutCard)
    insertBreak(newWorkoutCard);
    append(newWorkoutDifficulty,newWorkoutCard)
    insertBreak(newWorkoutCard);
    append(newWorkoutDesc, newWorkoutCard)
    insertBreak(newWorkoutCard);
    append(newWorkoutSubmitBtn, newWorkoutCard)
    append(muscleSelectDiv, newWorkoutCard)

    append(newWorkoutHeader,newWorkoutContainer)
    append(newWorkoutCard, newWorkoutContainer)
    return newWorkoutContainer; 
}

function createWorkout(name,difficulty,description,muscles){
    const workoutObject = {
        "name":name,
        "difficulty":difficulty,
        "description":description,
        "muscles":muscles,
        "user":userObject.username
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
        createWorkout(newWorkoutName,newWorkoutDifficulty,newWorkoutDesc,newWorkoutMuscleIds); 
    })
}

function renderWorkoutMuscles(workout){
    // make div to hold muscles 
    const workoutMuscles = document.createElement('ul') 
    addClass(workoutMuscles, 'workout__muscles')
    // iterate through workout muscles and make li for each
    workout.muscles.forEach(muscle => {
        const workoutMuscle = document.createElement('li')
        workoutMuscle.innerText = muscle.name; 
        //append the muscle li to the workoutMuscles list 
        return append(workoutMuscle, workoutMuscles)
    })
    return workoutMuscles; 
}