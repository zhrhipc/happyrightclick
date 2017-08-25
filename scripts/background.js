const CSS = "* {-webkit-user-drag: auto !important; -webkit-user-select: text !important;' + '-moz-user-drag: auto !important; -moz-user-select: text !important;' + '-khtml-user-drag: auto !important; -khtml-user-select: text !important;' + 'user-drag: auto !important; user-select: text !important;}";
const TITLE_DISABLED = browser.i18n.getMessage("titleDisabled"); //"Click to Enable Right-Click";
const TITLE_ENABLED = browser.i18n.getMessage("titleEnabled"); //"Right-Click Enabled";
const APPLICABLE_PROTOCOLS = ["http:", "https:", "file:"];

/*
Returns true only if the URL's protocol is in APPLICABLE_PROTOCOLS.
 */
function protocolIsApplicable(url) {
	let anchor = document.createElement('a');
	anchor.href = url;
	return APPLICABLE_PROTOCOLS.includes(anchor.protocol);
}

/*
Initialize the page action: set icon and title, then show.
Only operates on tabs whose URL's protocol is applicable.
 */
function initializePageAction(tab) {
	if (protocolIsApplicable(tab.url)) {
		browser.pageAction.setIcon({
			tabId: tab.id,
			path: "icons/icon_disabled.svg"
		});
		browser.pageAction.setTitle({
			tabId: tab.id,
			title: TITLE_DISABLED
		});
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
function enableRightClick(tab) {
	browser.tabs.executeScript(null, {
		allFrames: true,
		file: "scripts/enable_right_click.js"
	});
	browser.tabs.insertCSS(null, {
		allFrames: true,
		code: CSS
	});
	browser.pageAction.setIcon({
		tabId: tab.id,
		path: "icons/icon_enabled.svg"
	});
	browser.pageAction.setTitle({
		tabId: tab.id,
		title: TITLE_ENABLED
	});
}

/*
Disable Right-Click when the page action is clicked.
 */
function disableRightClick(tab) {
	browser.tabs.executeScript(null, {
		allFrames: true,
		file: "scripts/disable_right_click.js"
	});
	browser.tabs.removeCSS(null, {
		allFrames: true,
		code: CSS
	});
	browser.pageAction.setIcon({
		tabId: tab.id,
		path: "icons/icon_disabled.svg"
	});
	browser.pageAction.setTitle({
		tabId: tab.id,
		title: TITLE_DISABLED
	});
}

/*
Toggle Right-Click: based on the current title, enable or disable the Right-Click functon.
Update the page action's title and icon to reflect its state.
 */
function toggleRightClick(tab) {

	function gotTitle(title) {
		if (title === TITLE_ENABLED) {
			disableRightClick(tab);
		} else {
			enableRightClick(tab);
		}
	}

	var gettingTitle = browser.pageAction.getTitle({
			tabId: tab.id
		});
	gettingTitle.then(gotTitle);
}

browser.pageAction.onClicked.addListener(toggleRightClick);
