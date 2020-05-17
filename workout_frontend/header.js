function renderHeader(){
    const header = newElement('h1'); 
    header.innerText = 'Work It Out!'; 
    addClass(header, 'header__main'); 
    return header; 
}