var register = document.querySelector('.register');
var login = document.querySelector('.login');
var choice = document.querySelector('.choice');
var bar = document.querySelector('.bar__content');


function showRegister() {
    if (register.style.display !== "block") {
        register.style.display = "block";
        choice.style.display = "none";
        login.style.display = "none";
    } else register.style.display = "none";
}

function showLogin() {
    if (login.style.display !== "block") {
        login.style.display = "block";
        choice.style.display = "none";
        if (register.style.display !== "none") register.style.display = "none";
    } else login.style.display = "none";
}

function showChoice() {
    if (choice.style.display !== "block") {
        choice.style.display = "block";
        login.style.display = "none";
        register.style.display = "none";
    } else choice.style.display = "none";
}

function showBarBtn() {
    if (bar.style.left !== "0px")
        bar.style.left = "0px";
    else bar.style.left = "-300px";
}