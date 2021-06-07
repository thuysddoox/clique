var register = document.querySelector('.register');
var login = document.querySelector('.login');
var choice = document.querySelector('.choice');
var bar = document.querySelector('.bar__content');
var login_label = [...document.querySelectorAll('.login__input label')];
var register_label = [...document.querySelectorAll('.register__item label')];
var login_input = [...document.querySelectorAll('.login__input input')];
var register_input = [...document.querySelectorAll('.register__item input')];

// change style label when enter input login and register

function initLabel(ob) {
    ob.classList.remove('active');
}

function animationLabelLogin(ob, index) {
    ob.onfocus = () => {
        login_label.forEach(initLabel);
        login_label[index].classList.add('active');
    }
}

function animationLabelRegister(ob, index) {
    ob.onfocus = () => {
        register_label.forEach(initLabel);
        register_label[index].classList.add('active');
    }
}
login_input.forEach(animationLabelLogin);
register_input.forEach(animationLabelRegister);

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