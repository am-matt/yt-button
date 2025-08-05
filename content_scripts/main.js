console.log("booted up");

const filter = { urls: ["*://*.youtube.com/*"] }; 

browser.tabs.onUpdated.addListener(function(tabId,changeInfo) {
    if (changeInfo.status == "complete") {
        browser.tabs.executeScript(tabId, {file: "content_scripts/button.js"});
    }
},filter);

/*browser.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    console.log(details.tabId);
    browser.tabs.sendMessage(details.tabId, {command: "newVideoPage"});
},{url: [{hostSuffix: 'youtube.com', pathPrefix:"/watch"}]});*/