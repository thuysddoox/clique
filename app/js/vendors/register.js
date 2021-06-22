var register_label = [...document.querySelectorAll('.register__item label')];
var register_item = [...document.querySelectorAll('.register__item ')];
var register_input = [...document.querySelectorAll('.register__item input'), ...document.querySelectorAll('.register__item textarea')];
var register_span = [...document.querySelectorAll('.register__item span')];
var submitRegister = false;
var register = document.querySelector('.register');
// change style label when enter input register

// label when user not focus input
register_label.forEach(initLabelRegister);

function initLabelRegister(ob, id) {
    if (register_input[id].value.replace(' ', '').length == 0)
        ob.classList.remove('active');
    else if (!ob.classList.contains('active')) ob.classList.add('active');

}
// label when user click, focus input to enter
register_input.forEach(animationLabelRegister);

function animationLabelRegister(ob, index) {
    ob.onfocus = () => {
        register_span[index].style.display = 'none';
        register_label.forEach(initLabelRegister);
        register_label[index].classList.add('active');
    }
}

// label when user focus input then focusout
register_input.forEach(focusoutLabelRegister);

function focusoutLabelRegister(ob) {
    ob.addEventListener("focusout", () => {
        register_label.forEach(initLabelRegister);
    });
}
/* ======================= VALIDATE FORM ====================== */
// Validation register form
// validate name
function validateName(flag) {
    let name = document.getElementById('name').value;
    let namePatt = /[0-9]+/gi;
    let sp = document.getElementsByClassName('name-note')[0]
    if (name.replace(' ', '').length == 0) {
        sp.innerText = '*This field is required';
        sp.style.display = 'block';
        flag = false;
    } else if (namePatt.test(name)) {
        sp.innerText = '*Invalid name talent';
        sp.style.display = 'block';
        flag = false;
    }
    if (flag == true) sp.style.display = "none";
    return flag;
}
// validate contact 
function validateContact(flag) {
    let contact = document.getElementById('contact').value;
    let contactPatt = /[0-9]+/gi;
    let sp = document.getElementsByClassName('contact-note')[0];
    if (contact.replace(' ', '').length == 0) {
        sp.innerText = '*This field is required'
        sp.style.display = 'block';
        flag = false;
    } else if (contactPatt.test(contact)) {
        sp.innerText = '*Invalid contact';
        sp.style.display = 'block';
        flag = false;
    }
    if (flag == true) sp.style.display = "none";
    return flag;
}
// validate phone
function validatePhone(flag) {
    let phone = document.getElementById('phone').value,
        phonePatt = /^\d{10}/gi,
        sp = document.getElementsByClassName('phone-note')[0];
    if (phone.replace(' ', '').length == 0) {
        sp.innerText = '*This field is required'
        sp.style.display = 'block';
        flag = false;
    } else if (!phonePatt.test(phone)) {
        sp.innerText = '*Invalid phone number';
        sp.style.display = 'block';
        flag = false;
    }
    if (flag == true) sp.style.display = "none";
    return flag;
}
// validate email register
function validateEmailRegister(flag) {
    let mailPatt = /^[a-zA-Z]+\d*@gmail.com$/gi;
    let mail = document.querySelector('.register__item #mail').value,
        span_mail = document.querySelector('.register__item .email-note');
    if (mail.length == 0) {
        span_mail.innerText = '*This field is required';
        span_mail.style.display = "inline-block";
        flag = false;
    } else if (!mailPatt.test(mail)) {
        span_mail.innerText = "*Invalid email";
        flag = false;
        span_mail.style.display = "inline-block";
    }
    if (flag == true) span_mail.style.display = "none";
    return flag;
}
// validate password
function validatePassword(flag) {
    let pass = document.getElementById('pass').value,
        passPatt = /^\w{8,}/,
        sp = document.getElementsByClassName('pass-note')[0];
    if (pass.length == 0) {
        sp.innerText = '*This field is required';
        sp.style.display = 'block';
        flag = false;
    } else
    if (!passPatt.test(pass)) {
        sp.innerText = '*Invalid password';
        sp.style.display = 'block';
        flag = false;
    }
    if (flag == true) sp.style.display = "none";
    return flag;
}
// validate repassword
function validateRepassword(flag) {
    let re = document.getElementById('repass').value,
        pass = document.getElementById('pass').value,
        sp = document.getElementsByClassName('repass-note')[0];;
    if (re.length == 0) {
        sp.innerText = '*This field is required'
        sp.style.display = 'block';
        flag = false;
    } else if (pass !== re) {
        sp.innerText = '*Repassword is not same as password';
        sp.style.display = 'block';
        flag = false;
    }
    if (flag == true) sp.style.display = "none";
    return flag;

}
// valide web
function validateWeb(flag) {
    let web = document.getElementById('web').value;
    let sp = document.getElementsByClassName('web-note')[0];
    if (web.length == 0) {
        sp.innerText = '*This field is required';
        sp.style.display = 'block';
        flag = false;
    }
    if (flag == true) sp.style.display = "none";
    return flag;

}
// valide instagram
function validateIns(flag) {
    let ins = document.getElementById('ins').value;
    let sp = document.getElementsByClassName('ins-note')[0];
    if (ins.length == 0) {
        sp.innerText = '*This field is required';
        sp.style.display = 'block';
        flag = false;
    }
    if (flag == true) sp.style.display = "none";
    return flag;

}
// valide twitter
function validateTwitter(flag) {
    let tw = document.getElementById('twitter').value;
    let sp = document.getElementsByClassName('twitter-note')[0];
    if (tw.length == 0) {
        sp.innerText = '*This field is required';
        sp.style.display = 'block';
        flag = false;
    }
    if (flag == true) sp.style.display = "none";
    return flag;

}
// valide facebook
function validateFacebook(flag) {
    let fb = document.getElementById('fb').value;
    let sp = document.getElementsByClassName('fb-note')[0];
    if (fb.length == 0) {
        sp.innerText = '*This field is required';
        sp.style.display = 'block';
        flag = false;
    }
    if (flag == true) sp.style.display = "none";
    return flag;

}
// validate when user click register
var register_btn = document.querySelector('.register .btn--green');
if (register_btn) register_btn.onclick =
    function validateRegister() {
        let flag = true;
        submitRegister = true;
        flag = validateName(flag);
        flag = validateEmailRegister(flag);
        flag = validateContact(flag);
        flag = validateFacebook(flag);
        flag = validatePassword(flag);
        flag = validatePhone(flag);
        flag = validateRepassword(flag);
        flag = validateIns(flag);
        flag = validateWeb(flag);
        flag = validateTwitter(flag);
        if (flag == true) {
            location.replace("../Login.html");
        }
    };
//validate when input changes
if (document.querySelector('.register') != null) {
    ['input', 'focusout'].forEach((event) => document.getElementById('name').addEventListener(event, function() {
        if (submitRegister) validateName(true);
    }));
    ['input', 'focusout'].forEach((event) => document.getElementById('web').addEventListener(event, function() {
        if (submitRegister) validateWeb(true);
    }));
    ['input', 'focusout'].forEach((event) => document.getElementById('contact').addEventListener(event, function() {
        if (submitRegister) validateContact(true);
    }));
    ['input', 'focusout'].forEach((event) => document.getElementById('phone').addEventListener(event, function() {
        if (submitRegister) validatePhone(true);
    }));
    ['input', 'focusout'].forEach((event) => document.getElementById('mail').addEventListener(event, function() {
        if (submitRegister) validateEmailRegister(true);
    }));
    ['input', 'focusout'].forEach((event) => document.getElementById('twitter').addEventListener(event, function() {
        if (submitRegister) validateTwitter(true);
    }));
    ['input', 'focusout'].forEach((event) => document.getElementById('ins').addEventListener(event, function() {
        if (submitRegister) validateIns(true);
    }));
    ['input', 'focusout'].forEach((event) => document.getElementById('pass').addEventListener(event, function() {
        if (submitRegister) validatePassword(true);
    }));
    ['input', 'focusout'].forEach((event) => document.getElementById('repass').addEventListener(event, function() {
        if (submitRegister) validateRepassword(true);
    }));
    ['input', 'focusout'].forEach((event) => document.getElementById('fb').addEventListener(event, function() {
        if (submitRegister) validateFacebook(true);
    }));
}