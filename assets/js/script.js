let lightDarkSwitch = document.getElementById('switch');
const button = document.getElementById('btn');
const input = document.getElementById('search');
const root = document.documentElement.style;
const gitUrl = 'https://api.github.com/users/';
const profileImg = document.getElementById('profile-img');
const profileName = document.getElementById('name');
const userName = document.getElementById('username');
const joinDate = document.getElementById('join-date');
const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const bio = document.getElementById('bio');
const repos = document.getElementById('repos');
const followers = document.getElementById('followers');
const following = document.getElementById('following');
const userLocation = document.getElementById('location');
const twitter = document.getElementById('twitter');
const company = document.getElementById('company');
const blog = document.getElementById('blog');
const errorMessage = document.getElementsByClassName('error-msg')[0];
let darkMode = false;


window.onload = () => {
    fetch('https://api.github.com/users/octocat')
    .then(response => response.json())
    .then(data => {
        showUserData(data)})
    .catch(error => {
        throw error;})
}

button.addEventListener('click', (e)=> {
    if (input.value != "") {
        userData(gitUrl+input.value)
    } 
})

input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        if (input.value != "") {
            userData(gitUrl+input.value)
        } 
    }
});

input.addEventListener ('input', (e) => {
    errorMessage.style.display= 'none';
})

const userData = (inputUrl) => {
    fetch(inputUrl)
    .then(response => response.json())
    .then(data => {
        showUserData(data)})
    .catch(error => {
        throw error;})
}

const showUserData = (data) => {
    console.log(data);
    errorMessage.style.display = 'none';
    if(data.message != 'Not Found'){
        profileImg.src = data.avatar_url;
        profileName.innerHTML = data.name;
        let formatedDate = data.created_at.split('T').shift().split('-');
        //console.log(formatedDate);
        joinDate.innerText = 'Joined '+ formatedDate[2] + ' ' +(months[formatedDate[1]-1]) + ' ' + formatedDate[0];
        userName.innerText = '@'+data.login;
        userName.href = data.html_url;
        bio.innerText = (data.bio == null) ? "This profile has no bio" : data.bio;
        repos.innerText = data.public_repos;
        followers.innerText = data.followers;
        following.innerText = data.following;
        const checkIfDataIsNull = (receivedData, element) => {
            if (receivedData == "" || receivedData == null){
                element.style.opacity = 0.5;
                element.previousElementSibling.style.opacity = 0.5;
                return "Not available"
            }else {
                element.style.opacity = 1;
                element.previousElementSibling.style.opacity = 1;
                return receivedData;
            }
        }
        userLocation.innerText = checkIfDataIsNull(data.location, userLocation);
        twitter.innerText = checkIfDataIsNull(data.twitter_username, twitter);
        if (twitter.innerHTML != "Not available" || twitter.href == 'undefined') {
            twitter.href ='https://twitter.com/'+data.twitter_username;
        } else {
            twitter.removeAttribute('href');
        } 
        if (checkIfDataIsNull(data.html_url, blog) != "Not available") {
            let profileUrl = data.html_url.split('//')[1];
            blog.innerText = profileUrl;
        }else{
            blog.innerText = checkIfDataIsNull(data.html_url, blog);
        }
        if (blog.innerHTML != "Not available" || blog.href == 'undefined') {
            blog.href = data.html_url;
        } else {
            blog.removeAttribute('href');
        }
        company.innerText = checkIfDataIsNull(data.company, company);

    }else {
        errorMessage.style.display = 'block';
    }
}

lightDarkSwitch.addEventListener('click', (e)=> {
    if(darkMode == false) {
        trans();
        setDarkMode();
    }
    else {
        trans();
        setLightMode();
    }
});

const setLightMode = () => {
    root.setProperty('--ghostWhite', '#F6F8FF');
    root.setProperty('--black', '#222731');
    root.setProperty('--havelockBlue', '#4B6A9B');
    root.setProperty('--white', '#FEFEFE');
    root.setProperty('--licorice', '#2B3442');
    root.setProperty('--slateGrey', '#697C9A');
    let searchBox = document.getElementsByClassName('search-bar')[0];
    let mainCard = document.getElementsByClassName('info-card')[0];
    let text = document.getElementsByClassName('switch')[0];
    let svg = document.getElementsByClassName('theme-icon')[0];
    let svgPath = svg.querySelector('path');
    svgPath.setAttribute('d', 'M19.513 11.397a.701.701 0 00-.588.128 7.496 7.496 0 01-2.276 1.336 7.101 7.101 0 01-2.583.462 7.505 7.505 0 01-5.32-2.209 7.568 7.568 0 01-2.199-5.342c0-.873.154-1.72.41-2.49a6.904 6.904 0 011.227-2.21.657.657 0 00-.102-.924.701.701 0 00-.589-.128C5.32.61 3.427 1.92 2.072 3.666A10.158 10.158 0 000 9.83c0 2.8 1.125 5.342 2.967 7.19a10.025 10.025 0 007.16 2.98c2.353 0 4.527-.822 6.266-2.183a10.13 10.13 0 003.58-5.624.623.623 0 00-.46-.796z');
    svg.classList.toggle('dark-mode-icon');
    text.innerHTML = 'dark'
    lightDarkSwitch.classList.toggle('dark-mode-switch');
    mainCard.classList.toggle('dark-mode-no-shadow');
    searchBox.classList.toggle('dark-mode-no-shadow');
    darkMode = false;
}

const setDarkMode = () => {
    root.setProperty('--ghostWhite', '#141D2F');
    root.setProperty('--black', '#FFFFFF');
    root.setProperty('--havelockBlue', '#FFFFFF');
    root.setProperty('--white', '#1E2A47');
    root.setProperty('--licorice', '#FFFFFF');
    root.setProperty('--slateGrey', '#FFFFFF');
    let searchBox = document.getElementsByClassName('search-bar')[0];
    let mainCard = document.getElementsByClassName('info-card')[0];
    let text = document.getElementsByClassName('switch')[0];
    let svg = document.getElementsByClassName('theme-icon')[0];
    let svgPath = svg.querySelector('path');
    svgPath.setAttribute('d', 'M13.545 6.455c-.9-.9-2.17-1.481-3.545-1.481a4.934 4.934 0 00-3.545 1.481c-.9.9-1.481 2.17-1.481 3.545 0 1.376.582 2.646 1.481 3.545.9.9 2.17 1.481 3.545 1.481a4.934 4.934 0 003.545-1.481c.9-.9 1.481-2.17 1.481-3.545a4.934 4.934 0 00-1.481-3.545zM10 3.413a.7.7 0 00.688-.688V.688A.7.7 0 0010 0a.7.7 0 00-.688.688v2.037a.7.7 0 00.688.688zM15.635 5.344l1.455-1.455a.67.67 0 000-.952.67.67 0 00-.952 0l-1.455 1.455a.67.67 0 000 .952c.238.264.66.264.952 0zM19.312 9.312h-2.037a.7.7 0 00-.688.688.7.7 0 00.688.688h2.037A.7.7 0 0020 10a.7.7 0 00-.688-.688zM15.608 14.656a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455a.67.67 0 00.952 0 .67.67 0 000-.952l-1.455-1.455zM10 16.587a.7.7 0 00-.688.688v2.037A.7.7 0 0010 20a.7.7 0 00.688-.688v-2.037a.7.7 0 00-.688-.688zM4.365 14.656L2.91 16.111a.67.67 0 000 .952.67.67 0 00.952 0l1.455-1.455a.67.67 0 000-.952c-.238-.264-.66-.264-.952 0zM3.413 10a.7.7 0 00-.688-.688H.688A.7.7 0 000 10a.7.7 0 00.688.688h2.037A.7.7 0 003.413 10zM4.365 5.344a.67.67 0 00.952 0 .67.67 0 000-.952L3.862 2.937a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455z');
    svg.classList.toggle('dark-mode-icon');
    text.innerHTML = 'light'
    lightDarkSwitch.classList.toggle('dark-mode-switch');
    mainCard.classList.toggle('dark-mode-no-shadow');
    searchBox.classList.toggle('dark-mode-no-shadow');
    darkMode = true;
}

const trans = () => {
    document.documentElement.classList.add('color-theme-in-transition')
    window.setTimeout(function() {
        document.documentElement.classList.remove('color-theme-in-transition')
    }, 750)
}
