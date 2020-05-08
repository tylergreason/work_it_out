function renderMuscles(muscles){
    const musclesCard = document.createElement('div'); 
    const musclesListHeader = document.createElement('div'); 
    musclesListHeader.innerText = "Muscles: "; 
    addClass(musclesListHeader, 'muscles__header')
    const musclesList = document.createElement('ul')
    addClass(musclesList, 'muscles__list')
    muscles.forEach(function(muscle){
        const muscleLi = document.createElement('li'); 
        muscleLi.appendChild(renderMuscle(muscle));
        musclesList.appendChild(muscleLi); 
    })
    musclesCard.appendChild(musclesListHeader)
    musclesCard.appendChild(musclesList); 
    return musclesCard; 
}

function renderMuscle(muscle){
    const muscleCard = document.createElement('div'); 
    muscleCard.innerText = muscle.name; 
    muscleCard.classList.add('muscle__name')
    return muscleCard; 
}

function renderMuscleHeader(muscle){
    const muscleHeader = document.createElement('h3'); 
    muscleHeader.innerText = muscle.name; 
    addClass(muscleHeader,'muscle__header')
    return muscleHeader; 
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
            const muscleCard = renderMuscleCard(muscle)
            addClass(muscleCard, 'newRoutineMuscle')
            append(muscleCard, div)
        })
    })
}

function renderMuscleCard(muscle){
    const muscleCard = newDiv() 
    addClass(muscleCard, 'muscle')
    const muscleHeader = renderMuscleHeader(muscle)
    const muscleWorkouts = renderWorkoutsForNewRoutine(muscle.workouts)
    append(muscleHeader,muscleCard)
    append(muscleWorkouts,muscleCard)
    addHideEventListener(muscleHeader, muscleWorkouts)
    // hide muscle workouts by default 
    addClass(muscleWorkouts,'hidden')
    return muscleCard;
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

