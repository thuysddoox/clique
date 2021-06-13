var register = document.querySelector('.register');
var login = document.querySelector('.login');
var choice = document.querySelector('.choice');
var bar = document.querySelector('.bar__content');
var login_label = [...document.querySelectorAll('.login__input label')];
var register_label = [...document.querySelectorAll('.register__item label')];
var register_item = [...document.querySelectorAll('.register__item ')];
var login_input = [...document.querySelectorAll('.login__input input')];
var login_item = [...document.querySelectorAll('.login__input ')];
var register_input = [...document.querySelectorAll('.register__item input'), ...document.querySelectorAll('.register__item textarea')];
var register_span = [...document.querySelectorAll('.register__item span')];
var login_span = [...document.querySelectorAll('.login__item span')];
var submitRegister = false;
var submitLogin = false;
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
// active comment and heart
function postAction() {
    var heart = document.querySelectorAll('.post__item-bottom--heart i');
    var heartnum = document.querySelectorAll('.post__item-bottom--heart .post__botton-item--number');
    heart.forEach(function(item, id) {
        item.onclick = () => {
            item.classList.toggle('heart-active');
            if (!item.classList.contains('heart-active')) heartnum[id].innerText = parseInt(heartnum[id].innerText) - 1;
            else heartnum[id].innerText = parseInt(heartnum[id].innerText) + 1;
        }
    });
    var cmt = document.querySelectorAll('.post__item-bottom--comment i');
    var cmtnum = document.querySelectorAll('.post__item-bottom--comment .post__botton-item--number');
    cmt.forEach(function(item, id) {
        {
            item.onclick = () => {

                if (!item.classList.contains('cmt-active')) item.classList.toggle('cmt-active');
                else cmtnum[id].innerText = parseInt(cmtnum[id].innerText) + 1;
            }
        }
    });
}
postAction();
// change style label when enter input login and register
register_label.forEach(initLabelRegister);

// label when user not focus input
function initLabelRegister(ob, id) {
    if (register_input[id].value.replace(' ', '').length == 0)
        ob.classList.remove('active');
    else if (!ob.classList.contains('active')) ob.classList.add('active');

}

function initLabelLogin(ob, id) {
    if (login_input[id].value.replace(' ', '').length == 0)
        ob.classList.remove('active');
    else if (!ob.classList.contains('active')) ob.classList.add('active');
}

// label when user click, focus input to enter
login_input.forEach(animationLabelLogin);
register_input.forEach(animationLabelRegister);

function animationLabelLogin(ob, index) {
    ob.onfocus = () => {
        login_span[index].style.display = 'none';
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

// label when user focus input then focusout
login_input.forEach(focusoutLabelLogin);
register_input.forEach(focusoutLabelRegister);

function focusoutLabelLogin(ob, index) {
    ob.addEventListener("focusout", () => {
        login_label.forEach(initLabelLogin);
    })
}

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
        if (flag == true) location.replace("../Login.html");

    }
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

/*-------------------------------------- */
// VALIDATE FORM LOGIN
// validate email login
function validateEmailLogin(flag) {
    let mailPatt = /^[a-zA-Z]+\d*@gmail.com$/gi;
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
    }
    if (flag == true) span_pass.style.display = "none";
    return flag;
}
// click login
var login_btn = document.querySelector('.login .btn--green');
if (login_btn) login_btn.onclick =
    function validateLogin() {
        let kt = true;
        submitLogin = true;
        document.querySelector('.login__wrap .login_note').style.display = "none";
        kt = validateEmailLogin(kt);
        kt = validatePassLogin(kt);
        if (kt == true) document.querySelector('.login__wrap .login_note').style.display = "block";
        if (kt == true) location.replace("../home.html");

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
// document.getElementById('email').oninput = function() {
//     // if (submitLogin) validateEmailLogin(true);
//     console.log('hheh');
// };


/* ======================== LOADING PAGE ==================== */
var posts = [{
        description: "Motorists should avoid the area around Forelock and East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1614767700000,
        imageUrl: "assets/images/post10.png",
        link: "https://www.tampabay.com/news/breaking-news/2021/02/17/traffic-crash-involving-pinellas-sheriffs-deputy-closes-east-lake-road/",
        favorited: true,
        totalHeart: 50,
        totalComment: 0,
        channel: 'LEWIS HAMILTOn',
        type: 'video'
    }, {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, Forelock and East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1614732700000,
        imageUrl: "assets/images/post10.png",
        link: "",
        favorited: false,
        totalHeart: 50,
        channel: 'LEWIS HAMILTOn',
        totalComment: 10,
        type: 'video'
    }, {
        description: "Motorists should avoid the area around Forelock and East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1614761200000,
        imageUrl: "assets/images/post1.png",
        link: "",
        favorited: false,
        totalHeart: 50,
        channel: 'LEWIS HAMILTOn',
        totalComment: 0,
        type: 'video'
    }, {
        description: "Motorists should avoid the area around Forelock, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        eventTime: 1614227700000,
        imageUrl: "",
        link: "",
        favorited: true,
        totalHeart: 23,
        channel: 'LEWIS HAMILTOn',
        totalComment: 5,
        type: 'video'
    }, {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        eventTime: 1621767700000,
        imageUrl: "assets/images/post8.png",
        link: "",
        favorited: false,
        totalHeart: 90,
        channel: 'LEW STATE',
        totalComment: 0,
        type: 'Photo'
    }, {
        description: " East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1616667700000,
        imageUrl: "assets/images/post7.png",
        link: "",
        favorited: true,
        channel: 'LEWIS HAMILTOn',
        totalHeart: 80,
        totalComment: 27,
        type: 'News'
    }, {
        description: "Motorists should avoid the area around Forelock",
        eventTime: 1614767890000,
        imageUrl: "assets/images/post8.png",
        link: "",
        favorited: true,
        totalHeart: 334,
        channel: ' STATE IN AMILTOn',
        totalComment: 30,
        type: 'video'
    }, {
        description: "Forelock and East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1614766780000,
        imageUrl: "assets/images/post2.png",
        link: "",
        favorited: true,
        channel: ' STATE OF ORGIINILTOn',
        totalHeart: 34,
        totalComment: 23,
        type: 'Photo'
    }, {
        description: "Motorists should avoid the area around Forelock and East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1614768800000,
        imageUrl: "assets/images/post5.png",
        link: "",
        favorited: true,
        totalHeart: 50,
        channel: 'LEWIS STATE OF ORGIIN',
        totalComment: 0,
        type: 'video'
    }, {
        description: "Motorists should avoid the area around Forelock and East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1614767799999,
        imageUrl: "assets/images/post10.png",
        link: "",
        favorited: false,
        totalHeart: 150,
        channel: ' ORGIIN',
        totalComment: 10,
        type: 'status'
    }, {
        description: "East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1614767990000,
        imageUrl: "",
        link: "",
        favorited: true,
        totalHeart: 30,
        channel: ' STATE OF ORGIIN',
        totalComment: 20,
        type: 'video'
    }, {
        description: "Forelock and East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1614769900000,
        imageUrl: "assets/images/post1.png",
        link: "",
        channel: 'LEWITOn',
        favorited: false,
        totalHeart: 110,
        totalComment: 19,
        type: 'Status'
    },
    {
        description: "dolor sit amet consectetur adipiscing elit Forelock and East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1614769900000,
        imageUrl: "assets/images/post10.png",
        link: "",
        favorited: false,
        totalHeart: 50,
        channel: 'LEWILTOn',
        totalComment: 10,
        type: 'video'
    }, {
        description: "Motorists should avoid the area around Forelock and East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1614767700000,
        imageUrl: "assets/images/post1.png",
        link: "",
        favorited: false,
        totalHeart: 50,
        channel: 'MILTOn',
        totalComment: 0,
        type: 'video'
    }, {
        description: "Motorists should avoid the area around Forelock, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        eventTime: 1614767700000,
        imageUrl: "",
        link: "",
        favorited: true,
        totalHeart: 23,
        channel: 'AMILTOn',
        totalComment: 5,
        type: 'video'
    }, {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        eventTime: 1614887700000,
        imageUrl: "",
        link: "",
        favorited: false,
        totalHeart: 90,
        channel: 'LEWOn',
        totalComment: 0,
        type: 'Photo'
    }, {
        description: " East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1619997700000,
        imageUrl: "assets/images/post7.png",
        link: "",
        favorited: true,
        totalHeart: 80,
        channel: 'LEEPLTOn',
        totalComment: 27,
        type: 'News'
    }, {
        description: "Motorists should avoid the area around Forelock",
        eventTime: 1621167700000,
        imageUrl: "",
        link: "",
        favorited: true,
        totalHeart: 334,
        totalComment: 30,
        channel: 'LEWIOn',
        type: 'video'
    }, {
        description: "Forelock and East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1619876700000,
        imageUrl: "assets/images/post2.png",
        link: "",
        favorited: true,
        totalHeart: 34,
        channel: 'LEWLTOn',
        totalComment: 23,
        type: 'Photo'
    }, {
        description: "Motorists should avoid the area around Forelock and East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1614774600000,
        imageUrl: "assets/images/post5.png",
        link: "",
        favorited: true,
        totalHeart: 50,
        channel: 'LEWIS EPL',
        totalComment: 0,
        type: 'video'
    }, {
        description: "Motorists should avoid the area around Forelock and East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1614777700000,
        imageUrl: "assets/images/post10.png",
        link: "",
        favorited: false,
        totalHeart: 150,
        channel: 'EPL',
        totalComment: 10,
        type: 'status'
    }, {
        description: "East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1614765700000,
        imageUrl: "",
        link: "",
        favorited: true,
        totalHeart: 30,
        channel: 'EPL HAMILTOn',
        totalComment: 20,
        type: 'video'
    },
    {
        description: "Forelock and East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1614367700000,
        imageUrl: "assets/images/post1.png",
        link: "",
        favorited: false,
        totalHeart: 501,
        channel: 'EPLHAMILTOn',
        totalComment: 10,
        type: 'Photo'
    },
    {
        description: "dolor sit amet,consectetur adipiscing elit, Forelock and East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1612367700000,
        imageUrl: "assets/images/post10.png",
        link: "",
        favorited: false,
        totalHeart: 50,
        channel: 'LEWIS EPL ',
        totalComment: 10,
        type: 'video'
    }, {
        description: "Motorists should avoid the area around Forelock and East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1621767700000,
        imageUrl: "assets/images/post1.png",
        link: "",
        favorited: false,
        totalHeart: 50,
        channel: 'STEELERS',
        totalComment: 0,
        type: 'video'
    }, {
        description: "Motorists should avoid the area around Forelock, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        eventTime: 1619767700000,
        imageUrl: "",
        link: "",
        favorited: true,
        totalHeart: 23,
        channel: 'PITTSBURGH STEELERS',
        totalComment: 5,
        type: 'video'
    }, {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        eventTime: 1614799700000,
        imageUrl: "assets/images/post8.png",
        link: "",
        favorited: false,
        totalHeart: 90,
        channel: 'LEWIS',
        totalComment: 0,
        type: 'Photo'
    }, {
        description: " East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1614767745000,
        imageUrl: "assets/images/post7.png",
        link: "",
        favorited: true,
        totalHeart: 80,
        channel: ' PITTSBURGH',
        totalComment: 27,
        type: 'News'
    }, {
        description: "Motorists should avoid the area around Forelock",
        eventTime: 1610667700000,
        imageUrl: "assets/images/post8.png",
        link: "",
        favorited: true,
        totalHeart: 334,
        channel: 'HAMILTOn',
        totalComment: 30,
        type: 'video'
    }, {
        description: "Forelock and East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1619767700000,
        imageUrl: "assets/images/post2.png",
        link: "",
        favorited: true,
        totalHeart: 34,
        channel: ' PITTSBURGH',
        totalComment: 23,
        type: 'Photo'
    }, {
        description: "Motorists should avoid the area around Forelock and East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1626767700000,
        imageUrl: "assets/images/post5.png",
        link: "",
        favorited: true,
        totalHeart: 50,
        channel: 'HAMILTOn',
        totalComment: 0,
        type: 'video'
    }, {
        description: "Motorists should avoid the area around Forelock and East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1614767700000,
        imageUrl: "assets/images/post10.png",
        link: "",
        favorited: false,
        totalHeart: 150,
        channel: 'LEWIS  PITTSBURGH',
        totalComment: 10,
        type: 'status'
    }, {
        description: "East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 162770880010,
        imageUrl: "assets/images/post4.png",
        link: "",
        favorited: true,
        totalHeart: 30,
        channel: ' PITTSBURGH HAMILTOn',
        totalComment: 20,
        type: 'video'
    }, {
        description: "Forelock and East Lake roads in Pinellas County until Thursday morning.",
        eventTime: 1624767709800,
        imageUrl: "assets/images/post1.png",
        link: "",
        favorited: false,
        totalHeart: 35,
        channel: 'LEWIS',
        totalComment: 20,
        type: 'news'
    }


]
var loadedCount = 0;
var postList = document.querySelector('.home__body .post__list');

// if user scroll to bottom of document, load more post
if (document.querySelector('.post__list'))
    document.onscroll = () => {
        // console.log(document.documentElement.scrollTop)
        if (document.documentElement.scrollTop >= document.documentElement.scrollHeight - document.documentElement.clientHeight - 1 && loadedCount < 5) {
            document.querySelector('.loader').style.display = 'block';
            setTimeout(getPosts, 2000);
            loadedCount++;

        }
    }


function getPosts() {
    let idPost = [],
        id = 0;
    while (idPost.length < 19) {
        id = Math.floor(Math.random() * posts.length);
        if (!idPost.includes(id)) idPost.push(id);
    }
    let htmls = '';
    idPost.forEach(item => htmls += renderPost(posts[item]));
    document.querySelector('.loader').style.display = 'none';
    postList.insertAdjacentHTML('beforeend', htmls);
    postAction();
    filterType();
}

function renderPost(post) {
    let html = `<div class="post__item">
    <div class="post__item-img">
        <img src="${post.imageUrl}" alt="">
    </div>
    <div class="post__content">
        <div class="post__body">
            <div class="post__item-channel">
            ${post.channel}<span class="post__item-channel--tick"><i class="fas fa-check-circle"></i></span>
                <span class="post__readmore"><i class="fas fa-ellipsis-h"></i></span>
            </div>
            <p class="post__item-description">${post.description}
            <h6 class="post__item-description--infor"></h6>
            </p>
            <div class="post__item-type">${post.type}</div>
        </div>
        <div class="post__item-bottom">
            <div class="post__item-bottom--day post__bottom-item">${Math.trunc((new Date() - new Date(post.eventTime))/86400000)} days ago</div>
            <div class="post__item-bottom--comment post__bottom-item">
                <span class="post__bottom-item--icon"><i class="fas fa-comment"></i></span>
                <span class="post__botton-item--number">${post.totalComment}</span>
            </div>
            <div class="post__item-bottom--heart post__bottom-item">
                <span class="post__bottom-item--icon"><i class="fas fa-heart ${post.favorited? 'heart-active':''}"></i></span>
                <span class="post__botton-item--number">${post.totalHeart}</span>
            </div>
        </div>
    </div>
</div>`;
    return html;
}

/* ============== Filter post by type ============== */

var filterBtn = document.querySelector('.filterBtn');
var navbar_item = [...document.querySelectorAll('.home__navbar-list .home__navbar-item')];
navbar_item.forEach(function(item) {
    if (item != null) {
        item.onclick = () => {
            let options = [item.innerText];
            filterByType(options);
            navbar_item.forEach(item => {
                if (item.classList.contains('active-navbar'))
                    item.classList.remove('active-navbar');
            });
            item.classList.toggle('active-navbar');
        }
    }
});
if (filterBtn != null) {
    filterBtn.addEventListener('click', () => {
        filterType();
        showFilter();
    });
}

function filterType() {
    let options = getFilter();
    // console.log(options)
    filterByType(options);

}
// Show filter options
function showFilter() {
    let filter = document.querySelector('.filterByType');
    if (filter.style.display != 'grid') {
        filter.style.display = 'grid';
    } else filter.style.display = 'none';
    document.querySelector('.header__icon--filter i').classList.toggle('active-icon');
}

// Get options filter
function getFilter() {
    let input = [...document.querySelectorAll('.filterByType__item input')];
    let check, rs;
    if (document.querySelector('.filterByType__item #All').checked) {
        rs = input.forEach(item => item.id);
    } else {
        check = input.filter((item) => {
            return item.checked;
        });
        rs = check.map(item => item.id);
    }

    // if (rs.length < input.length) document.querySelector('.filterByType__item #All').checked = false;
    return rs;
}

function filterByType(option) {
    let posts = [...document.querySelectorAll('.post__item')];
    let kt = false;
    if (option.length > 0) {
        posts.forEach(post => post.style.display = 'none');
        option.forEach((op) => {
            posts.forEach((item) => {
                if (item.querySelector('.post__item-type').innerText.toLowerCase().localeCompare(op.toLowerCase()) == 0) {
                    item.style.display = 'inline-block';
                    kt = true;
                }
            });
        })
        if (kt == false) document.querySelector('.noPost').style.display = 'block';
        else document.querySelector('.noPost').style.display = 'none';
    } else posts.forEach(post => post.style.display = 'inline-block');

}

////////////////////////
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