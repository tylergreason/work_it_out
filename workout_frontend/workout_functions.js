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