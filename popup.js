const UNSPLASH_ID = '9bd95b5a14ec487142232438d9994dfa42197c41397e3018a29bfcc9e12c0720';
const UNSPLAHS_URL = 'https://api.unsplash.com/';

const PROD_USER_SERVICE = 'http://user.playbuzz.com/user/current';
const ALPHA_USER_SERVICE = 'http://stg-user.playbuzz.com/user/current';

function closePopup() {
    window.close();
}

function getUserDetails() {
    chrome.cookies.getAll({ name: 'playbuzz' }, cookies => {
        if (cookies.length <= 0) {
            return;
        }

        let cookieHeader = `${cookies[0].name}=${cookies[0].value}`;
        console.log(cookieHeader);
        getEnvironment()
            .then((env) => {
                let path = '';
                if (env === 'production') {
                    path = PROD_USER_SERVICE;
                } else {
                    path = ALPHA_USER_SERVICE;
                }

                console.log(path);

                return fetch(path, {
                    method: 'GET',
                    headers: { 'Cookie': cookieHeader }
                });
            })
            .then(res => {
                console.log(res);
            });
    });

}

document.addEventListener('DOMContentLoaded', () => {

    // setTimeout(() => {
    //
    // }, 2000);

    // getUserDetails();

    // fetch('https://www.google.com')
    //     .then(res => console.log(res.text()))

    document.getElementById('close').addEventListener('click', closePopup);

    TunnelUtils.performTunneling().then(() => {
        document.getElementById('progress').style = 'display: none';
        document.getElementById('complete').style = 'display: block';
    });
});
