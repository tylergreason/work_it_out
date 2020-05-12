function renderWorkouts(workouts){
    const workoutList = document.createElement('div'); 
    addClass(workoutList, 'workouts')
    workouts.forEach(function(workout){
        const workoutLi = renderWorkout(workout); 
        // workoutLi.appendChild(renderWorkout(workout)); 
        // workoutLi.appendChild(renderMuscles(workout.muscles))
        addClass(workoutLi,'workoutLi')
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
    const workoutDifficulty = renderWorkoutDifficulty(workout.difficulty);  
    const workoutDesc = document.createElement('div'); 
    workoutDesc.innerText = `${workout.description}`;
    addClass(workoutDesc,'workout__desc')
    workoutCard.appendChild(workoutName);
    workoutCard.appendChild(workoutDesc); 
    workoutCard.appendChild(workoutDifficulty);
    // append muscle list to card 
    const muscles = renderWorkoutMuscles(workout) 
    addClass(muscles,'muscles')
    addClass(muscles,'muscles--workoutCard')
    workoutCard.appendChild(muscles);

    // add warning div 
    const warning = workoutWarning(); 
    append(warning, workoutCard);
    // hide by default 
    // warning.style.display = 'none';

    return workoutCard; 
}

function workoutWarning(){
    // make div that shows an add/remove warning for the new routine div 
    const warning = newElement('div'); 
    addClass(warning, 'workout__warning')
    return warning; 
}

function renderWorkoutDifficulty(difficulty){
    // make div to return 
    const workoutDifficulty = newElement('div'); 
    addClass(workoutDifficulty, 'workout__difficulty'); 

    if (difficulty === 'easy'){
        append(barbellIcon(),workoutDifficulty)
    }else if(difficulty === 'medium'){
        append(barbellIcon(),workoutDifficulty)
        append(barbellIcon(),workoutDifficulty)
    }else if (difficulty === 'hard'){
        append(barbellIcon(),workoutDifficulty)
        append(barbellIcon(),workoutDifficulty)
        append(barbellIcon(),workoutDifficulty)
    }else{
        const noDifficulty = newElement('div'); 
        noDifficulty.innerText = 'No difficulty listed'; 
        addClass(noDifficulty, 'workout__difficulty--no-difficulty'); 
        append(noDifficulty, workoutDifficulty);
    }
    return workoutDifficulty; 
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
    addClass(newWorkoutHeader, 'header')

    // add element to push new workout details in that will be a flex container
    const newWorkoutCard = document.createElement('div'); 
    addClass(newWorkoutCard,'newWorkout__card')
    
    
    const newWorkoutName = document.createElement('input'); 
    newWorkoutName.placeholder = "name"; 
    newWorkoutName.id = "newWorkoutName";
    addClass(newWorkoutName, 'newWorkout__name')
    
    const newWorkoutDesc = document.createElement('textarea'); 
    newWorkoutDesc.placeholder = "description"; 
    newWorkoutDesc.id = "newWorkoutDesc"; 
    addClass(newWorkoutDesc, 'newWorkout__desc')
    
    // difficulties 
    const newWorkoutDifficulty = workoutDifficultySelect()
    newWorkoutDifficulty.id = "newWorkoutDifficulty";

    // const difficulties = ['easy', "medium","hard"]
    // const newWorkoutDifficulty = document.createElement("select")
    // addClass(newWorkoutDifficulty, 'newWorkout__difficulty')
    
    // // difficulty select 
    // difficulties.forEach(function(difficulty){
    //     const newOption = document.createElement("option"); 
    //     newOption.text = difficulty;  
    //     addClass(newOption,'newWorkout__option--difficulty')
    //     newWorkoutDifficulty.add(newOption); 
    // })
    
    // submit new workout button 
    const newWorkoutSubmitBtn = document.createElement('button'); 
    newWorkoutSubmitBtn.innerText = "submit workout" 
    addClass(newWorkoutSubmitBtn, 'newWorkout__submit')
    submitWorkoutEventListener(newWorkoutSubmitBtn); 
    
    const muscleSelectDiv = document.createElement('div'); 
    muscleSelectDiv.id = "muscleSelectDiv";
    addClass(muscleSelectDiv, 'newWorkout__muscles')
    renderMuscleSelectBoxToId(muscleSelectDiv.id)
    
    // make a div to put workout details into, that will be in a flex container with the muscle selection list 
    const newWorkoutDetails = document.createElement('div'); 
    addClass(newWorkoutDetails, 'newWorkout__details')
    append(newWorkoutName, newWorkoutDetails)
    insertBreak(newWorkoutDetails);
    append(newWorkoutDifficulty,newWorkoutDetails)
    insertBreak(newWorkoutDetails);
    append(newWorkoutDesc, newWorkoutDetails)
    insertBreak(newWorkoutDetails);
    append(newWorkoutHeader,newWorkoutContainer)
    append(newWorkoutDetails, newWorkoutCard)
    append(newWorkoutSubmitBtn, newWorkoutDetails)
    append(muscleSelectDiv, newWorkoutCard)
    append(newWorkoutCard,newWorkoutContainer)

    // add event listener to hide/unhide new workout form card 
    addHideEventListener(newWorkoutHeader,newWorkoutCard); 
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
    // postRequest(workoutURL,workoutObject)
    postWorkout(workoutObject); 
}

function workoutDifficultySelect(){
    // make div to hold them 
    const workoutDifficultySelectContainer = newElement('div'); 
    addClass(workoutDifficultySelectContainer, 'newWorkout__difficultySelectContainer')

    // create options 
    const easyOption = workoutDifficultyOption('easy'); 
    const mediumOption = workoutDifficultyOption('medium'); 
    const hardOption = workoutDifficultyOption('hard'); 
    append(easyOption,workoutDifficultySelectContainer)
    append(mediumOption,workoutDifficultySelectContainer)
    append(hardOption,workoutDifficultySelectContainer)
    return workoutDifficultySelectContainer 
}

function workoutDifficultyOption(difficulty){
    // create an option to render to difficulty select div 
    const option = newElement('div')
    append(barbellIcon(), option); 

    // add difficulty text to div 
    const optionDifficultyText = newElement('div'); 
    optionDifficultyText.innerText = difficulty; 
    addClass(optionDifficultyText, 'newWorkout__difficulty__text') 
    append(optionDifficultyText, option)

    // attach difficulty param as attribute of div 
    option.difficulty = difficulty;
    // add unique class to option 
    addClass(option, difficulty);
    addClass(option, 'newWorkout__difficulty__option')

    // add event listener for selecting option 
    option.addEventListener('click', function(){
        this.parentElement.value = difficulty; 
        difficultyClick(difficulty)
    })
    return option;  
}

function difficultyClick(diff){
    // use diff (difficulty) string to modulate what class the difficulty options have 
    // find the list of elements that are difficulty selections 
    const list = Array.from(document.getElementsByClassName('newWorkout__difficulty__option')); 

    // removed all highlighted classes from the difficulty options 
    list.forEach(option => option.classList.remove('beforeHighlighted'))
    list.forEach(option => option.classList.remove('highlighted'))


    // check for easy, medium, and hard arguments and change the highlighting on the options 
    if (diff === 'easy'){
        addClass(list[0],'highlighted'); 
    } else if (diff === 'medium'){
        addClass(list[0],'beforeHighlighted'); 
        addClass(list[1],'highlighted'); 

    }else if (diff === 'hard'){
        addClass(list[0],'beforeHighlighted'); 
        addClass(list[1],'beforeHighlighted'); 
        addClass(list[2],'highlighted'); 
    }
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
    const workoutMuscles = newElement('div')
    addClass(workoutMuscles, 'workout__muscles')
    // iterate through workout muscles and make li for each
    workout.muscles.forEach(muscle => {
        const workoutMuscle = document.createElement('div')
        workoutMuscle.innerText = muscle.name; 
        addClass(workoutMuscle, 'workout__muscle')
        //append the muscle li to the workoutMuscles list 
        return append(workoutMuscle, workoutMuscles)
    })
    return workoutMuscles; 
}

// function renderWorkoutMuscles(workout){
//     // make div to hold muscles 
//     const workoutMuscles = document.createElement('ul') 
//     addClass(workoutMuscles, 'workout__muscles')
//     // iterate through workout muscles and make li for each
//     workout.muscles.forEach(muscle => {
//         const workoutMuscle = document.createElement('li')
//         workoutMuscle.innerText = muscle.name; 
//         //append the muscle li to the workoutMuscles list 
//         return append(workoutMuscle, workoutMuscles)
//     })
//     return workoutMuscles; 
// }

function postWorkout(workout){
    fetch(`${workoutURL}`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(workout)
    })
    .then(resp => resp.json())
    .then(rerenderNewRoutineDiv)
}

function rerenderNewRoutineDiv(promise){
    removeChildren(newRoutineDiv) 
    newRoutineDiv.appendChild(newRoutineForm())
}