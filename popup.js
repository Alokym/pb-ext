const UNSPLASH_ID = '9bd95b5a14ec487142232438d9994dfa42197c41397e3018a29bfcc9e12c0720';
const UNSPLAHS_URL = 'https://api.unsplash.com/';

function closePopup() {
    window.close();
}

function getUserDetails() {
    return new Promise((resolve, reject) => {
        chrome.cookies.getAll({ name: 'playbuzz' }, cookies => {
            if (cookies.length <= 0) {
                return;
            }

            return resolve(JSON.parse(decodeURIComponent(cookies[0].value)));
        });
    });
}

function setLink(url) {
    document.getElementById('link').innerText = url;

    document.getElementById('link-wrapper').addEventListener('click', () => {
        chrome.tabs.create({ url: url });
    });
}

function setSlackLink() {
    let slackLink = document.getElementById('slack-link');
    slackLink.addEventListener('click', () => {
        let slackInput = document.getElementById('slack-input');
        slackInput.style = 'display: block';
        document.getElementById('link-wrapper').style = 'display: none';

        slackInput.focus();
        slackLink.innerText = 'Send!';
    });
}

function changeView() {
    document.getElementById('progress').style = 'display: none';
    document.getElementById('complete').style = 'display: block';
}

document.addEventListener('DOMContentLoaded', () => {

    getUserDetails().then(details => console.log(details));

    document.getElementById('close').addEventListener('click', closePopup);

    // setTimeout(() => {
        TunnelUtils.performTunneling().then((url) => {
            url = 'https://www.google.com';
            setLink(url);

            setSlackLink();

            changeView();
        });
    // }, 1000);
});
