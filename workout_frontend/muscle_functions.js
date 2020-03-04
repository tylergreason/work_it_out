function renderMuscles(muscles){
    const musclesCard = document.createElement('div'); 
    const musclesHeader = document.createElement('div'); 
    musclesHeader.innerText = "Muscles: "; 
    const musclesList = document.createElement('ul')
    muscles.forEach(function(muscle){
        const muscleLi = document.createElement('li'); 
        muscleLi.appendChild(renderMuscle(muscle));
        musclesList.appendChild(muscleLi); 
    })
    musclesCard.appendChild(musclesHeader)
    musclesCard.appendChild(musclesList); 
    return musclesCard; 
}

function renderMuscle(muscle){
    const muscleCard = document.createElement('div'); 
    muscleCard.innerText = muscle.name; 
    return muscleCard; 
}

function fetchMuscles(div){
    fetch(`${musclesURL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    // .then(data => console.log(data))
    .then(function(muscles){
        muscles.forEach(function(muscle){
            div.appendChild(renderMuscle(muscle)); 
            div.appendChild(renderWorkouts(muscle.workouts))
            // debugger

        })
        main.appendChild(div); 
        // const muscleWorkouts = renderWorkouts(muscle.workouts); 
        // div.appendChild(muscle); 
        // div.appendChild(muscleWorkouts); 

    })
}