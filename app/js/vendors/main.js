var register = document.querySelector('.register');
var login = document.querySelector('.login');
var choice = document.querySelector('.choice');
var bar = document.querySelector('.bar__content');
var login_label = [...document.querySelectorAll('.login__input label')];
var register_label = [...document.querySelectorAll('.register__item label')];
var login_input = [...document.querySelectorAll('.login__input input')];
var register_input = [...document.querySelectorAll('.register__item input'), ...document.querySelectorAll('.register__item textarea')];
var register_span = [...document.querySelectorAll('.register__item span')];
// constructor function for user
function User(name, contact, phone, email, password, re_password, web, ins, face, twitter) {
    this.name = name;
    this.contact = contact;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.re_password = re_password;
    this.web = web;
    this.ins = ins;
    this.twitter = twitter;
    this.face = face;
}
// change style label when enter input login and register
register_label.forEach(initLabelRegister);

function initLabelRegister(ob, id) {
    if (register_input[id].value.replace(' ', '').length == 0)
        ob.classList.remove('active');
    else if (!ob.classList.contains('active')) ob.classList.add('active');

}

function initLabelLogin(ob, id) {
    if (login_input[id].value.replace(' ', '').length == 0)
        ob.classList.remove('active');

}

function animationLabelLogin(ob, index) {
    ob.onfocus = () => {

        login_label.forEach(initLabelLogin);
        login_label[index].classList.add('active');
    }
}

function animationLabelRegister(ob, index) {
    ob.onfocus = () => {
        register_span[index].style.display = 'none';
        register_label.forEach(initLabelRegister);
        register_label[index].classList.add('active');
    }
}
login_input.forEach(animationLabelLogin);
register_input.forEach(animationLabelRegister);

// Validation register form
document.querySelector('.register .btn--green').onclick =
    function validateRegister() {
        let user = new User(
            document.getElementById('name').value,
            document.getElementById('contact').value,
            document.getElementById('phone').value,
            document.getElementById('mail').value,
            document.getElementById('pass').value,
            document.getElementById('repass').value,
            document.getElementById('web').value,
            document.getElementById('ins').value,
            document.getElementById('fb').value,
            document.getElementById('twitter').value,
            document.getElementById('desc').value,
        );
        let namePatt = /[0-9]+/gi,
            contactPatt = /[0-9]+/gi,
            phonePatt = /^\d{10}$/gi,
            mailPatt = /^[a-zA-Z]+\d+@gmail.com$/gi,
            passPatt = /^\w{8,}&/;
        // name talent
        if (user.name.replace(' ', '').length == 0) {
            let sp = document.getElementsByClassName('name-note')[0]
            sp.innerText = '*This field is required';
            sp.style.display = 'block';
        } else if (namePatt.test(user.name)) {
            let sp = document.getElementsByClassName('name-note')[0];
            sp.innerText = '*Invalid name talent';
            sp.style.display = 'block';
        }
        // contact
        if (user.contact.replace(' ', '').length == 0) {
            let sp = document.getElementsByClassName('contact-note')[0];
            sp.innerText = '*This field is required'
            sp.style.display = 'block';
        } else if (contactPatt.test(user.contact)) {
            let sp = document.getElementsByClassName('contact-note')[0];
            sp.innerText = '*Invalid contact';
            sp.style.display = 'block';
        }
        // phone
        if (user.phone.replace(' ', '').length == 0) {
            let sp = document.getElementsByClassName('phone-note')[0];
            sp.innerText = '*This field is required'
            sp.style.display = 'block';
        } else if (!phonePatt.test(user.phone)) {
            let sp = document.getElementsByClassName('phone-note')[0];
            sp.innerText = '*Invalid phone number';
            sp.style.display = 'block';
        }
        // Email
        if (user.email.length == 0) {
            let sp = document.getElementsByClassName('email-note')[0];
            sp.innerText = '*This field is required';
            sp.style.display = 'block';
        } else if (!mailPatt.test(user.email)) {
            let sp = document.getElementsByClassName('email-note')[0];
            sp.innerText = '*Invalid email';
            sp.style.display = 'block';
        }
        // password
        if (user.password.length == 0) {
            let sp = document.getElementsByClassName('pass-note')[0];
            sp.innerText = '*This field is required';
            sp.style.display = 'block';
        } else if (!passPatt.test(user.password)) {
            let sp = document.getElementsByClassName('pass-note')[0];
            sp.innerText = '*Invalid password';
            sp.style.display = 'block';
        }
        // confirm password
        if (user.re_password.length == 0) {
            let sp = document.getElementsByClassName('repass-note')[0];
            sp.innerText = '*This field is required'
            sp.style.display = 'block';
        } else if (user.password !== user.re_password) {
            let sp = document.getElementsByClassName('repass-note')[0];
            sp.innerText = '*Repassword is not same as password';
            sp.style.display = 'block';
        }
        // web
        if (user.web.length == 0) {
            let sp = document.getElementsByClassName('web-note')[0];
            sp.innerText = '*This field is required';
            sp.style.display = 'block';
        }
        // face
        if (user.face.length == 0) {
            let sp = document.getElementsByClassName('fb-note')[0];
            sp.innerText = '*This field is required'
            sp.style.display = 'block';
        }
        //instagram
        if (user.ins.length == 0) {
            let sp = document.getElementsByClassName('ins-note')[0];
            sp.innerText = '*This field is required'
            sp.style.display = 'block';
        }
        // twitter
        if (user.twitter.length == 0) {
            let sp = document.getElementsByClassName('twitter-note')[0];
            sp.innerText = '*This field is required'
            sp.style.display = 'block';
        }

    }

// validate form
function validateLogin() {

}

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