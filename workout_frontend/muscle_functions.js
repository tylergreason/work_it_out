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

function fetchMusclesWithWorkouts(div){
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
            const muscleWorkoutDiv = document.createElement('div'); 
            muscleWorkoutDiv.appendChild(renderMuscle(muscle)); 
            muscleWorkoutDiv.appendChild(renderWorkouts(muscle.workouts))
            muscleWorkoutDiv.querySelectorAll(".workoutLi").forEach(workout => addWorkoutToRoutineEvent(workout))
            div.appendChild(muscleWorkoutDiv)
            // debugger
        })
    })
}

function renderMuscleSelectBoxToId(id){
    fetchJSONFromURL(musclesURL)
    .then(function(muscles){    
        const muscleSelectBox = document.createElement('div')
        muscles.forEach(function(muscle){
            muscleSelectBox.appendChild(createCheckboxWithName(muscle,muscle.name));
        })
        const appendTo = document.getElementById(id); 
        appendTo.appendChild(muscleSelectBox); 
    })
}

function returnCheckedMuscles(id){
    const el = document.getElementById(id); 
    const list = elementListToArray(el.children[0].children)
    const checkedMuscleIds = []; 
    //  iterate through list and return ids of elements that are checked 
    list.forEach(function(element){
        // debugger
        const elementItems = elementListToArray(element.children); 
        if (elementItems[0].checked === true) {
            checkedMuscleIds.push(element.dataset.id); 
        }
    })
    return checkedMuscleIds;
}