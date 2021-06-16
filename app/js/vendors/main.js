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
const urlUsers = 'https://test.cliquefan.com/api/portal/app/login';
const urlPosts = 'https://test.cliquefan.com/api/portal/fan/home?status=1&pageSize=50&pageIndex=0';
const urlFavorited = "https://test.cliquefan.com/api/portal/news/reaction/love/";
const urlUnFavorited = "https://test.cliquefan.com/api/portal/news/unreaction/love/";
var userCurrent;
// constructor function for user
// function User(name, contact, phone, email, username, password, web, ins, face, twitter, avatar) {
//     this.name = name;
//     this.contact = contact;
//     this.phone = phone;
//     this.email = email;
//     this.username = username;
//     this.password = password;
//     this.web = web;
//     this.insagram = ins;
//     this.twitter = twitter;
//     this.facebook = face;
//     this.createdAt = new Date.now();
//     this.avatar = avatar;
// }
// active comment and heart
function favorite(user, post) {
    fetch(urlFavorited + post.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.access_token
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.responseData)
                showSuccessHeart();
            else showFailHeart()
        })
        .catch(err => {
            console.log(err);
            showFailHeart();
        });
}

function unfavorite(user, post) {
    fetch(urlUnFavorited + post.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.access_token
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.responseData)
                showSuccessHeart();
            else showFailHeart()
        })
        .catch(err => {
            console.log(err);
            showFailHeart();
        });
}

function showFailHeart() {
    let notify = document.querySelector('.postFail');

    notify.style.display = 'block';
    setTimeout(() => notify.style.display = 'none', 2500)
}

function showSuccessHeart() {
    let notify = document.querySelector('.postSuccess');

    notify.style.display = 'block';
    setTimeout(() => notify.style.display = 'none', 2500)

}

function postAction() {
    var heart = document.querySelectorAll('.post__item-bottom--heart i');
    var heartnum = document.querySelectorAll('.post__item-bottom--heart .post__botton-item--number');
    var post__item = [...document.querySelectorAll('.post__item')];
    heart.forEach(function(item, id) {
        item.onclick = () => {
            let index = parseInt(post__item[id].id);
            let user = JSON.parse(localStorage.getItem('user'));
            item.classList.toggle('heart-active');
            if (!item.classList.contains('heart-active')) {
                heartnum[id].innerText = parseInt(heartnum[id].innerText) - 1;
                if (index) {
                    unfavorite(user, posts[index]);

                }
            } else {
                heartnum[id].innerText = parseInt(heartnum[id].innerText) + 1;
                if (index) {
                    favorite(user, posts[index]);
                }
            }
            if (index) {
                posts[index].totalEmotion.totalLove = parseInt(heartnum[id].innerText);
                post__item.forEach((post, num) => {
                    if (parseInt(post.id) === index && num != id) {
                        heart[num].classList.toggle('heart-active');
                        heartnum[num].innerText = posts[index].totalEmotion.totalLove;
                    }
                })
            } else showFailHeart();
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
        if (flag == true) {
            location.replace("../Login.html");
        }
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



function formatPost(posts) {
    const type = ["News", "Events", "Status", "Video", "Photo", "Results", "Poll", "Music", "Media", "Shop", "Social", "Forums", "Schedule"];
    posts.forEach(post => {
        post.type = type[Math.floor(Math.random() * type.length)];
    })
}

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
                localStorage.setItem('infoLogin', JSON.stringify(user));
                redirectHomepage(data.responseData);
            } else document.querySelector('.login__wrap .login_note').style.display = "block";
        })
        .catch(err => { console.log(err); })
}

function redirectHomepage(user) {
    localStorage.setItem('login', true);
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = "../home.html";
}

function getPostFromDB(user) {
    fetch(urlPosts, {
            method: 'GET',
            headers: {
                'Authorization': 'bearer' + user.access_token,
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => posts = data.responseData.fanFeedResponses || [])
        .catch(err => {
            console.log(err);
        })

}
// If user used to login successfully
if (localStorage.getItem('login')) {
    let info = JSON.parse(localStorage.getItem('infoLogin'));
    if (document.querySelector('.login')) {
        document.querySelector('.login__item #email').value = info.username;
        document.querySelector('.login__item #pass').value = info.password;
        login_label.forEach(item => item.classList.add('active'));
        document.querySelector('.login__item.btn--green').classList.add('logined')
    }
} else
    document.querySelector('.login__item.btn--green').classList.remove('logined')


// click login
const login_btn = document.querySelector('.login .btn--green');
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
    // When login successfully change username and get Listpost from api

if (localStorage.getItem('login')) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (document.querySelector('.header__user--name'))
        document.querySelector('.header__user--name').innerText = user.ekoUser.displayName || 'Username';
    getPostFromDB(user);
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



/* ======================== LOADING PAGE ==================== */
var posts;
var loadedCount = 0;
var postList = document.querySelector('.home__body .post__list');

// if user scroll to bottom of document, load more post
if (document.querySelector('.post__list'))
    document.onscroll = () => {
        // console.log(document.documentElement.scrollTop)
        if (document.documentElement.scrollTop >= document.documentElement.scrollHeight - document.documentElement.clientHeight - 1 && loadedCount < 3) {
            document.querySelector('.loader').style.display = 'block';
            setTimeout(getPosts, 2000);
            loadedCount++;

        }
    }


function getPosts() {
    let idPost = [],
        id = 0;
    while (idPost.length < 15) {
        id = Math.floor(Math.random() * posts.length);
        if (!idPost.includes(id)) idPost.push(id);
    }
    let htmls = '';
    idPost.forEach(item => htmls += renderPost(posts[item], item));
    document.querySelector('.loader').style.display = 'none';
    postList.insertAdjacentHTML('beforeend', htmls);
    postAction();
    filterType();
}

function renderPost(post, id) {
    let h = `<div class="post__item" id = "${id}">
    <div class="post__item-img">
        <img src="${post.externalImageUrl}" alt="">
    </div>
    <div class="post__content">
        <div class="post__body">
            <div class="post__item-channel">
            ${post.talent.displayName}<span class="post__item-channel--tick"><i class="fas fa-check-circle"></i></span>
                <span class="post__readmore"><i class="fas fa-ellipsis-h"></i></span>
            </div>
            <p class="post__item-description">${post.description}
            <h6 class="post__item-description--infor"></h6>
            </p>
            <div class="post__item-type">${post.contentType}</div>
        </div>
        <div class="post__item-bottom">
            <div class="post__item-bottom--day post__bottom-item">${Math.trunc((new Date() - new Date(post.createdDate))/86400000)} days ago</div>
            <div class="post__item-bottom--comment post__bottom-item">
                <span class="post__bottom-item--icon"><i class="fas fa-comment"></i></span>
                <span class="post__botton-item--number">${post.totalComment}</span>
            </div>
            <div class="post__item-bottom--heart post__bottom-item">
                <span class="post__bottom-item--icon"><i class="fas fa-heart ${post.favorited? 'heart-active':''}"></i></span>
                <span class="post__botton-item--number">${post.totalEmotion.totalLove}</span>
            </div>
        </div>
    </div>
</div>`;
    return h;
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
        navbar_item.forEach(item => {
            if (item.classList.contains('active-navbar'))
                item.classList.remove('active-navbar');
        });
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
    let check = [],
        rs = [];
    if (document.querySelector('.filterByType__item #All').checked) {
        rs = input.map(item => item.id);
        // console.log(rs);
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