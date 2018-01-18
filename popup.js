const UNSPLASH_ID = '9bd95b5a14ec487142232438d9994dfa42197c41397e3018a29bfcc9e12c0720';
const UNSPLAHS_URL = 'https://api.unsplash.com/';

function closePopup() {
    window.close();
}

function getUserDetails() {
    return new Promise((resolve, reject) => {
        chrome.cookies.getAll({ name: 'playbuzz' }, cookies => {
            if (cookies.length <= 0) {
                return reject();
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

function setSlackLink(url) {
    let slackLink = document.getElementById('slack-link');
    slackLink.addEventListener('click', () => {
        let slackInput = document.getElementById('slack-input');
        slackInput.style = 'display: block';
        slackLink.style = 'display: none';
        document.getElementById('link-wrapper').style = 'display: none';
        document.getElementById('slack-send').style = 'display: block';

        slackInput.focus();

        document.getElementById('slack-send').addEventListener('click', () => {
            let author;
            getUserDetails()
                .then(userDetails => {
                    author = userDetails.nickname;
                })
                .catch(() => {
                    author = 'Margot';
                })
                .then(TunnelUtils.getItemTitle)
                .then(title => {
                    let text = slackInput.value;

                    sendSlackMessage(text, author, title, url);
                });
        });
    });
}

function sendSlackMessage(text, author, itemTitle, url) {
    let data = {
        "attachments": [
            {
                "fallback": "fallback",
                "color": "#36a64f ",
                "pretext": "",
                "author_name": `Submitted by ${author}`,
                "author_link": "",
                "author_icon": "https://img.playbuzz.com/image/upload/w_100/v1516287187/hw7dgj9lhjq7stukq7qt.jpg",
                "title": text,
                "title_link": url,
                "text": itemTitle,
                "fields": [],
                "image_url": "http://my-website.com/path/to/image.jpg",
                "thumb_url": "http://example.com/path/to/thumb.png",
                "footer": "Tunnel IT!",
                "footer_icon": "https://img.playbuzz.com/image/upload/c_crop,w_200/v1516286826/ikssjgav2kzw2dwjle7x.png",
                "ts": 123456789
            }
        ]
    };

    return fetch('https://hooks.slack.com/services/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',
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        }).then(res => console.log(res.text()));

}

function changeView() {
    document.getElementById('progress').style = 'display: none';
    document.getElementById('complete').style = 'display: block';
}

let texts = [
    'Tunneling',
    'Tunneling.',
    'Tunneling..',
    'Tunneling...',
];

function tunnelingLoader() {
    let title = document.getElementById('tunneling');
    let index = 0;
    setInterval(() => {
        title.innerText = texts[index];

        index++;
        if (index >= texts.length) {
            index = 0;
        }
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {

    getUserDetails().then(details => console.log(details));

    document.getElementById('close').addEventListener('click', closePopup);

    tunnelingLoader();

    setTimeout(() => {
        TunnelUtils.performTunneling().then((res) => {
            res = JSON.parse(res);
            setLink(res.url);

            setSlackLink(res.url);

            changeView();
        });
    }, 1000);
});
