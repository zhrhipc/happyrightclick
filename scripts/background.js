const TITLE_DISABLED = browser.i18n.getMessage("titleDisabled"); //"Click to Enable Right-Click";
const TITLE_ENABLED = browser.i18n.getMessage("titleEnabled"); //"Right-Click Enabled";
const APPLICABLE_PROTOCOLS = ["http:", "https:", "file:"];

/*
Returns true only if the URL's protocol is in APPLICABLE_PROTOCOLS.
*/
function protocolIsApplicable(url) {
  let anchor =  document.createElement('a');
  anchor.href = url;
  return APPLICABLE_PROTOCOLS.includes(anchor.protocol);
}

/*
Initialize the page action: set icon and title, then show.
Only operates on tabs whose URL's protocol is applicable.
*/
function initializePageAction(tab) {
  if (protocolIsApplicable(tab.url)) {
    browser.pageAction.setIcon({tabId: tab.id, path: "icons/icon_disabled.svg"});
    browser.pageAction.setTitle({tabId: tab.id, title: TITLE_DISABLED});
    browser.pageAction.show(tab.id);
  }
}

/*
When first loaded, initialize the page action for all tabs.
*/
let gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (tab of tabs) {
    initializePageAction(tab);
  }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

/*
Enable Right-Click when the page action is clicked.
*/
browser.pageAction.onClicked.addListener((tab) => {
	browser.tabs.executeScript(null, {
		file: "scripts/enable_right_click.js"
	});
	browser.pageAction.setIcon({tabId: tab.id, path: "icons/icon_enabled.svg"});
	browser.pageAction.setTitle({tabId: tab.id, title: TITLE_ENABLED});
});