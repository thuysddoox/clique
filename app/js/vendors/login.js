var login_span = [...document.querySelectorAll('.login__item span')];
const login_btn = document.querySelector('.login .btn--green');
var login_input = [...document.querySelectorAll('.login__input input')];
var login_item = [...document.querySelectorAll('.login__input ')];
var login_label = [...document.querySelectorAll('.login__input label')];
var login = document.querySelector('.login');
var submitLogin = false;
// change style label when enter input login 

// label when user not focus input
function initLabelLogin(ob, id) {
    if (login_input[id].value.replace(' ', '').length == 0)
        ob.classList.remove('active');
    else if (!ob.classList.contains('active')) ob.classList.add('active');
}

// label when user click, focus input to enter
login_input.forEach(animationLabelLogin);

function animationLabelLogin(ob, index) {
    ob.onfocus = () => {
        login_span[index].style.display = 'none';
        login_label.forEach(initLabelLogin);
        login_label[index].classList.add('active');
    }
}

// label when user focus input then focusout
login_input.forEach(focusoutLabelLogin);

function focusoutLabelLogin(ob, index) {
    ob.addEventListener("focusout", () => {
        login_label.forEach(initLabelLogin);
    })
}
/*-------------------------------------- */
// VALIDATE FORM LOGIN
// validate email login
function validateEmailLogin(flag) {
    let mailPatt = /@gmail.com$/gi;
    let mail = document.querySelector('.login__item #email').value,
        span_mail = document.querySelector('.login__input .email-note');
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
// validate password login
function validatePassLogin(flag) {
    let pass = document.querySelector('.login__item #pass').value,
        span_pass = document.querySelector('.login__input .pass-note');
    if (pass.length == 0) {
        span_pass.innerText = "*This field is required";
        flag = false;
        span_pass.style.display = "inline-block";
    } else if (pass.length < 8) {
        span_pass.innerText = "Invalid password";
        flag = false;
        span_pass.style.display = "inline-block";
    }
    if (flag == true) span_pass.style.display = "none";
    return flag;
}
// validate when input login change
if (document.querySelector('.login') != null) {
    ['input', 'focusout'].forEach((event) => document.getElementById('email').addEventListener(event, function() {
        if (submitLogin) validateEmailLogin(true);
    }));
    ['input', 'focusout'].forEach((event) => document.getElementById('pass').addEventListener(event, function() {
        if (submitLogin) validatePassLogin(true);
    }));
}
/* -------- SUBMIT USER WHEN CLICK BUTTON LOGIN ----------- */
// call API to submit user and get data of user, save infor of user in localStorage
// if submit successfully then redirect to home page
function submitUser(user) {
    fetch(urlUsers, {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if (data.responseData) {
                localStorage.setItem('username', user.username);
                redirectHomepage(data.responseData);
            } else
                document.querySelector('.login__wrap .login_note').style.display = "block";
        })
        .catch(err => { console.log(err); })
}
// redirect to homepage
function redirectHomepage(user) {
    localStorage.setItem('login', true);
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = "../home.html";
}

// when user click login button then validate and post API to get 

if (login_btn) login_btn.onclick =
    function validateLogin() {
        let kt = true;
        submitLogin = true;
        let mess = document.querySelector('.login__wrap .login_note');
        let mail = document.querySelector('.login__item #email').value,
            pass = document.querySelector('.login__item #pass').value;
        mess.style.display = "none";
        kt = validateEmailLogin(kt);
        kt = validatePassLogin(kt);
        if (kt == true) {
            let info = {
                password: pass,
                username: mail
            };
            submitUser(info);
        }
    }

// If user used to login successfully
if (localStorage.getItem('login')) {
    if (document.querySelector('.login')) {
        document.querySelector('.login__item #email').value = localStorage.getItem('username');
        login_label[0].classList.add('active');
        document.querySelector('.login__item.btn--green').classList.add('logined')
        window.location.href = "../home.html";
    }
} else
    document.querySelector('.login__item.btn--green').classList.remove('logined')