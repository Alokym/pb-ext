class TunnelUtils {
	static searchForEmbeddedItem() {
		return executeEmbedSearch();
	}
}

const executeEmbedSearch = (fileName) => {
	return new Promise((resolve, reject) => {
	    chrome.tabs.executeScript(null, {code:`
	    		document.querySelector('.playbuzz').getAttribute('data-id');
			`}, 
			(results) => {
		        resolve(results);
		    }
	    );
	});
};