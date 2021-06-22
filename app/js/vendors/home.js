var choice = document.querySelector('.choice');
var bar = document.querySelector('.bar__content');
const urlUsers = 'https://test.cliquefan.com/api/portal/app/login';
const urlPosts = 'https://test.cliquefan.com/api/portal/fan/home?status=1&pageSize=50&pageIndex=0';
const urlFavorited = "https://test.cliquefan.com/api/portal/news/reaction/love/";
const urlUnFavorited = "https://test.cliquefan.com/api/portal/news/unreaction/love/";
var heart = document.querySelectorAll('.post__item-bottom--heart i');
var heartnum = document.querySelectorAll('.post__item-bottom--heart .post__botton-item--number');
var userCurrent;
// call API to change status favorite and show notifycation
// if success fill color for heart 
function favorite(user, id, index = 'null') {
    let status = false;
    fetch(urlFavorited + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.access_token
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.responseData) {
                showSuccessHeart();
                status = true;

            } else showFailHeart(data.error.message || '')
        })
        .catch(err => {
            console.log(err);
            showFailHeart(error.message || '');
        })
        .finally(() => {
            if (status && index >= 0) {
                heart[index].classList.add('heart-active');
                heartnum[index].innerText = parseInt(heartnum[index].innerText) + 1;
            }
        });
}

// call API to change status unfavorite and show notifycation
// if success delete color for heart 
function unfavorite(user, id, index = 'null') {
    let status = false;
    fetch(urlUnFavorited + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.access_token
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.responseData) {
                showSuccessHeart();
                status = true;

            } else showFailHeart(data.error.message || '')
        })
        .catch(err => {
            console.log(err);
            showFailHeart(error.message || '');
        })
        .finally(() => {
            if (status && index >= 0) {
                heart[index].classList.remove('heart-active');
                heartnum[index].innerText = parseInt(heartnum[index].innerText) - 1;
            }
        });
}

// show fail if call API fail
function showFailHeart(mess) {
    let notify = document.querySelector('.postFail');
    if (mess) notify.innerText = mess;
    notify.style.display = 'block';
    setTimeout(() => notify.style.display = 'none', 1200)
}
// show success if call API success
function showSuccessHeart() {
    let notify = document.querySelector('.postSuccess');
    notify.style.display = 'block';
    setTimeout(() => notify.style.display = 'none', 1200)

}

// Change infor of post if has action like heart or comment
function postAction() {
    // heart action
    heart = document.querySelectorAll('.post__item-bottom--heart i');
    heartnum = document.querySelectorAll('.post__item-bottom--heart .post__botton-item--number');
    let post__item = [...document.querySelectorAll('.post__item')];
    heart.forEach(function(item, index) {
        item.onclick = () => {
            let id = post__item[index].id;
            let user = JSON.parse(localStorage.getItem('user'));
            if (item.classList.contains('heart-active')) {
                unfavorite(user, id, index);
            } else {
                favorite(user, id, index);
            }
            posts[index].totalEmotion.totalLove = parseInt(heartnum[index].innerText);
        }
    });
    // comment action
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
};

// call API to get all posts
function getPostFromDB(user, type, action) {
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
        .then(data => {
            posts = data.responseData.fanFeedResponses || [];
            postsLength = posts.length;
            getPosts(postsPerLoad, type, action);
        })
        .catch(err => {
            console.log(err);
        })
}
// When login successfully update username and avatar
if (localStorage.getItem('login')) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (document.querySelector('.header__user--name'))
        document.querySelector('.header__user--name').innerText = user.ekoUser.displayName || 'Username';
    if (document.querySelector('.header__user--avatar'))
        document.querySelector('.header__user--avatar').src = user.ekoUser.avatar || document.querySelector('.header__user--avatar').src;
}




/* ======================== LOADING PAGE ==================== */
var posts;
var postList = document.querySelector('.home__body .post__list');
var indexPost = 0;
var postsPerLoad = 10;
var postsLength = 2 * postsPerLoad;

// when go to home page load some post 
if (document.querySelector('.homepage'))
    getPostFromDB(JSON.parse(localStorage.getItem('user')), 'All', showPosts);
// if user scroll to bottom of document, load more post
if (document.querySelector('.post__list'))
    document.onscroll = () => {
        // console.log(document.documentElement.scrollTop)
        if (document.documentElement.scrollTop >= document.documentElement.scrollHeight - document.documentElement.clientHeight) {
            if (postsLength - indexPost > 1) {
                postsPerLoad = postsLength - indexPost > 10 ? 10 : postsLength - indexPost;
                let option = 'All';
                // let type if page is filtered then scroll
                navbar_item.forEach(item => {
                    if (item.classList.contains('active-navbar'))
                        option = item.innerText;
                });
                document.querySelector('.loader').style.display = 'block';
                getPostFromDB(JSON.parse(localStorage.getItem('user')), option, showPosts);
            }
        }
    }

function getPosts(number, option = 'All', action) {
    let htmls = '';
    let count = 0;
    console.log(option);
    if (option.localeCompare('All') == 0) {

        for (let i = 0; i < number; i++) {
            if (posts[indexPost]) htmls += renderPost(posts[indexPost]);
            indexPost++;
        };
    } else {
        while (indexPost < postsLength && count < number) {
            if (posts[indexPost].contentType.toLocaleLowerCase().localeCompare(option.toLocaleLowerCase()) == 0) {
                count++;
                if (posts[indexPost]) htmls += renderPost(posts[indexPost]);
            }

            indexPost++;
        }

    }

    action(htmls);
}

function showPosts(htmls) {
    document.querySelector('.loader').style.display = 'none';
    if (htmls.length == 0) {
        document.querySelector('.noPost').style.display = 'block';
    } else {
        document.querySelector('.noPost').style.display = 'none';
        postList.insertAdjacentHTML('beforeend', htmls);
        // update for all posts
        postAction()
            // filterType();}
    }
    let post__item = [...document.querySelectorAll('.post__item')];
    if (post__item.length > 0) document.querySelector('.noPost').style.display = 'none';
}

function renderPost(post) {
    let h = `<div class="post__item" id = "${post.id}">
    <div class="post__item-img">
        <img src="${post.externalImageUrl||''}" alt="">
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
// filter when click item selection in navbar
navbar_item.forEach(function(item) {
    if (item != null) {
        item.onclick = () => {
            let option = item.innerText;
            indexPost = 0;
            deletePostList();
            getPostFromDB(JSON.parse(localStorage.getItem('user')), option, showPosts);
            navbar_item.forEach(item => {
                if (item.classList.contains('active-navbar'))
                    item.classList.remove('active-navbar');
            });
            item.classList.toggle('active-navbar');
        }
    }
});
// when click button done in form filter option to filter
if (filterBtn != null) {
    filterBtn.addEventListener('click', () => {
        deletePostList();
        filterType();
        showFilter();
        navbar_item.forEach(item => {
            if (item.classList.contains('active-navbar'))
                item.classList.remove('active-navbar');
        });
    });
}
// filter with more type
// hidden noPost when a type has post
function filterType() {
    let options = getFilter();
    options.forEach(option => {
        indexPost = 0;
        getPostFromDB(JSON.parse(localStorage.getItem('user')), option, showPosts);
    })

}

// before filter, delete all posts is loaded
function deletePostList() {
    let post__item = [...document.querySelectorAll('.post__item')];
    post__item.forEach(item => item.remove())
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

////////////////////////
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