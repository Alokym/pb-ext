console.log(chrome);
console.log(chrome.browserAction);

chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('test2');
  TunnelUtils.searchForEmbeddedItem();
});

console.log('test');