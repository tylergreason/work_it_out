function renderWorkouts(workouts){
    const workoutList = document.createElement('ul'); 
    workouts.forEach(function(workout){
        const workoutLi = document.createElement('li'); 
        const workoutCard = document.createElement('div'); 
        const workoutName = document.createElement('div'); 
        workoutName.innerText = workout.name; 
        const workoutDifficulty = document.createElement('div'); 
        workoutDifficulty.innerText = workout.difficulty; 
        const workoutDesc = document.createElement('div'); 
        workoutDesc.innerText = workout.description; 

        workoutCard.appendChild(workoutName);
        workoutCard.appendChild(workoutDifficulty);
        workoutCard.appendChild(workoutDesc); 
        workoutLi.appendChild(workoutCard); 
        workoutList.appendChild(workoutLi); 
    })
    return workoutList; 
}

// id: 7
// name: "Quae exercitationem nihil."
// difficulty: "medium"
// description: "Ut autem qui vel et praesentium eaque sed quis sunt."
// created_at: "2020-03-04T14:36:30.961Z"
// updated_at: "2020-03-04T14:36:30.961Z"