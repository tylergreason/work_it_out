const newRoutineFormDiv = document.getElementById('newRoutineForm')

function insertBreak(node){
    node.appendChild(document.createElement('br'))
}

function createCheckboxWithName(data, nameAttribute){
    const checkbox = document.createElement('input'); 
    checkbox.type = 'checkbox';
    checkbox.id = data.id; 
    checkbox.name = data.id; 
    const label = document.createElement('label'); 
    label.for = checkbox.id; 
    label.innerText = nameAttribute; 
    const checkboxCard = document.createElement('div'); 
    checkboxCard.appendChild(checkbox); 
    checkboxCard.appendChild(label); 
    checkboxCard.dataset.id = data.id; 
    // debugger
    return checkboxCard; 
}

function elementListToArray(elements){
    return Array.from(elements); 
}

// ----- URL functions ----- 
function fetchJSONFromURL(url){
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
}

function postRequest(url,data){
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
}

function deleteRequest(url,id){
    fetch(`${url}/${id}`, {
        method:'DELETE', 
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => console.log(resp)); 
}

function parseDate(){
    const date = new Date; 
    let year = date.getFullYear(); 
    let month = date.getMonth()+1; 
    let dayDate = date.getDate(); 
    // if day and month are less than 10, append a 0 to their beginning 
    if (month < 10){
        month = `0${month}`
    }
    if (dayDate < 10){
        dayDate = `0${dayDate}`
    }
    return `${year}-${month}-${dayDate}`
}

function hideOrUnhide(div){
    div.classList.toggle('hidden')
}

function addHideEventListener(nodeToListen, nodeToHide){
    nodeToListen.addEventListener('click', function(e){
        e.preventDefault();
        console.log(nodeToHide)
        hideOrUnhide(nodeToHide); 
    })
}

function removeChildren(node){
    while (node.firstChild){
        node.removeChild(node.firstChild)
    }
}

function addClass(div,className){
    return div.classList.add(className)
}

function newDiv(){
    return document.createElement('div');
}

function newElement(type){
    return document.createElement(type)
}

function append(from,to){
    to.appendChild(from);
}

function barbellIcon(){
    const barbell = newElement('span')
    addClass(barbell,'fa-dumbbell');
    addClass(barbell,'fas');
    return barbell;
}

function copyIcon(){
    const copy = newElement('i');
    addClass(copy,'fas'); 
    addClass(copy,'fa-copy'); 
    return copy; 
}

function trashIcon(){
    const trash = newElement('i');
    addClass(trash, 'fas'); 
    addClass(trash, 'fa-trash-alt'); 
    return trash; 
}