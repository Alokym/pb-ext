class TunnelUtils {
	static performTunneling() {
		return executeEmbedSearch();
	}
}

const executeEmbedSearch = (fileName) => {
	let script;
	let environment;

	return isPlaybuzzDomain()
		.then(is => {
			script = is ? getNativeItemId : getEmbeddedItemId;
			return getEnvironment();
		})
		.then((env) => {
			environment = env;
		})
		.then(() => {
			return new Promise((resolve, reject) => {
			    chrome.tabs.executeScript(null, {code:script}, 
					(results) => {
				        resolve({
				        	itemId: results,
				        	environment: environment
				        });
				    }
			    );
			});
		})
		.then(res => sendTunnelRequest(res));
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

const getEnvironment = () => {
	return getCurrentUrl().then(url => {
		return /((alpha)|(sandbox-\d{1,2}))\.playbuzz\.com/.test(url) ? 'staging' : 'production';
	})
}

const sendTunnelRequest = (itemData) => {
	
	fetch(`https://stg-embed.playbuzz.com/tunnel?id=${itemData.itemId}&env=${itemData.environment}`, {method: 'POST'})
		.then(res => res.text())
		.then(res => {
			Promise.resolve();
		});

	return Promise.resolve('success');
}