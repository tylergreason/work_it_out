function checkLogin(){
    // logged in variables 
    // main div 
    const main = document.querySelector('#main') 
    let login_div = document.createElement('div'); 
    login_div.id = 'login_div'
    let username_text = document.createElement('input');
    username_text.id = "username_text"
    username_text.value = placeholderLoginValue; 
    let username_button = document.createElement('button'); 
    username_button.innerText = "log in"
    // add event listener for submission 
    loginBtnListener(username_button)
    login_div.appendChild(username_text); 
    login_div.appendChild(username_button); 
    main.appendChild(login_div)
}

function loginBtnListener(button){
    button.addEventListener('click', function(e){
        e.preventDefault(); 
        let username_div = document.querySelector("#username_text"); 
        let username_value = username_div.value; 
        // call new user with just username 
        new_user ('nil','nil',username_value, 'password'); 
        })
}

function logged_in(){
    console.log(`logged_in fired`)
    if (logged_username !== undefined){ 
        console.log(`user is now logged in`)
        render_main_page();
    } else{
        checkLogin();
        console.log(`user was not logged in`)
    }
}