function renderWorkouts(workouts){
    const workoutList = document.createElement('ul'); 
    workouts.forEach(function(workout){
        const workoutLi = document.createElement('li'); 
        workoutLi.appendChild(renderWorkout(workout)); 
        workoutLi.appendChild(renderMuscles(workout.muscles))
        workoutList.appendChild(workoutLi); 
    })
    return workoutList; 
}

function renderWorkout(workout){
    const workoutCard = document.createElement('div'); 
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