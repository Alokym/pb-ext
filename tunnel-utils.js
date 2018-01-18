class TunnelUtils {
	static searchForItemId() {
		return executeEmbedSearch();
	}
}

const executeEmbedSearch = (fileName) => {
	let script;

	if (isPlaybuzzDomain()) {
		script = getNativeItemId;
	} else {
		script = getEmbeddedItemId;
	}

	return new Promise((resolve, reject) => {
	    chrome.tabs.executeScript(null, {code:script}, 
			(results) => {
		        resolve(results);
		    }
	    );
	});
};

const getEmbeddedItemId = `document.querySelector('.playbuzz').getAttribute('data-id');`;
const getNativeItemId = `document.body.getAttribute('data-gameid');`;

const isPlaybuzzDomain = () => {
	return getCurrentUrl().then(url => {
		return url.indexOf('playbuzz.com') !== -1;
	});
};

const getCurrentUrl = () => {
	return new Promise((resolve, reject) => {
		const queryInfo = {
			active: true,
			currentWindow: true
		};

		chrome.tabs.query(queryInfo, (tabs) => {
			resolve(tabs[0].url);
		});
	});
};
