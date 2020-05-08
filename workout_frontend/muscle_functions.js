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
    const muscleHeader = document.createElement('h2'); 
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
            addClass(muscleCard, 'newRoutine__muscle')
            append(muscleCard, div)
        })
    })
}

function renderMuscleCard(muscle){
    const muscleCard = newDiv() 
    addClass(muscleCard, 'muscle')
    const muscleHeader = renderMuscleHeader(muscle)
    const muscleWorkouts = renderWorkoutsForNewRoutine(muscle.workouts)
    muscleHeader.toToggle = muscleWorkouts
    append(muscleHeader,muscleCard)
    append(muscleWorkouts,muscleCard)
    addHideEventListener(muscleHeader, muscleWorkouts)
    // hide muscle workouts by default 
    addClass(muscleWorkouts,'hidden')
    return muscleCard;
}

// function renderMuscleSelectBoxToId(id){
//     fetchJSONFromURL(musclesURL)
//     .then(function(muscles){    
//         const muscleSelectBox = document.getElementById(id)
//         addClass(muscleSelectBox, 'newWorkout__muscles')
//         muscles.forEach(function(muscle){
//             // create checkbox for that muscle and append it to the muscle select box 
//             const checkbox = createCheckboxWithName(muscle,muscle.name); 
//             addClass(checkbox, 'newWorkout__muscle')
//             append(checkbox, muscleSelectBox)
//         })
//     })
// }

function returnCheckedMuscles(id){
    // find the element to check and assign its children to an array 
    const el = document.getElementById(id); 
    const list = elementListToArray(el.children)
    // empty array to store checked muscles in 
    const checkedMuscleIds = []; 
    //  iterate through list and return ids of elements that are checked 
    list.forEach(function(element){
        // see if the muscle contains the 'selected' class and add its id to the list if it does 
        if (element.classList.contains('newWorkout__muscle--selected')) {
            checkedMuscleIds.push(element.dataset.id); 
        }
    })
    return checkedMuscleIds;
}

function renderMuscleSelectBoxToId(id){
    fetchJSONFromURL(musclesURL)
    .then(function(muscles){    
        // find the element to append muscles to by the id given 
        const muscleSelectBox = document.getElementById(id)
        addClass(muscleSelectBox, 'newWorkout__muscles')
        muscles.forEach(function(muscle){
            // create checkbox for that muscle and append it to the muscle select box 
            const muscleSelect = renderNewWorkoutMuscleName(muscle); 
            addClass(muscleSelect, 'newWorkout__muscle')
            append(muscleSelect, muscleSelectBox)
        })
    })
}

// function to make clickable name for new workout muscle selection 
function renderNewWorkoutMuscleName(muscle){
    //make span for the name 
    const muscleSelect = newElement('span'); 
    addClass(muscleSelect, 'newWorkout__muscle')
    muscleSelect.innerText = muscle.name;
    muscleSelect.dataset.id = muscle.id; 
    // add on click to toggle 'selected' modifier 
    muscleSelect.addEventListener('click',function(e){
        e.target.classList.toggle('newWorkout__muscle--selected')
    })
    return muscleSelect;
}






