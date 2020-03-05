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