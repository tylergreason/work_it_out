async function new_user (first_name, last_name, username, password){
    const objData = { 
        "first_name": first_name,
        "last_name": last_name,
        "username": username, 
        "password": password
    };
    const data = await fetch(`http://localhost:3000/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objData)
    })
    const resp = await data.json()
    .then((data) => {
        console.log('Success:', data);
        userObject = data; 
        logged_username = data.username; 
        user_id = data.id; 
        console.log(`username is ${logged_username}`)
        main_event()
    })
}