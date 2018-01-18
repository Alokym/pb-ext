class TunnelUtils {
	static searchForEmbeddedItem() {
		return Promise.resolve('test');

		
							chrome.browserAction.onClicked.addListener(function(tab) {
					  console.log('test3');
					  TunnelUtils.searchForEmbeddedItem();
					});
		console.log('here');
		function modifyDOM() {
        //You can play with your DOM here or check URL against your regex
	        console.log('Tab script:');
	        console.log(document.body);
	        return document.body.innerHTML;
	    }

	    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
	    chrome.tabs.executeScript({
	        code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
	    }, (results) => {
	        //Here we have just the innerHTML and not DOM structure
	        console.log('Popup script:')
	        console.log(results[0]);
	    });

		//return getActiveTab()
		//	.then(performSearch);
	}
}

/*const getActiveTab = () => {
	return new Promise((resolve, reject) => {
		const queryInfo = {
			active: true,
			currentWindow: true
		};

		chrome.tabs.query(queryInfo, (tabs) => {
			resolve(tabs[0]);
		});
	});
}

const performSearch = (tab) => {
	console.log('performing search');
	console.log(tab);
}*/