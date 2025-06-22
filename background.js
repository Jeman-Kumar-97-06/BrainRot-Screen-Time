let activeTabId = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  updateTime(); // stop old timer
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (isBrainrotSite(tab.url)) {
    activeTabId = activeInfo.tabId;
    startTime = Date.now();
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete" && isBrainrotSite(tab.url)) {
    updateTime();
    activeTabId = tabId;
    startTime = Date.now();
  }
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    updateTime();
  } else {
    chrome.tabs.query({ active: true, windowId }, (tabs) => {
      if (tabs.length && isBrainrotSite(tabs[0].url)) {
        activeTabId = tabs[0].id;
        startTime = Date.now();
      }
    });
  }
});

function isBrainrotSite(url = "") {
  return url.includes("youtube.com") || url.includes("twitter.com");
}

function updateTime() {
  if (!startTime) return;
  const duration = Math.floor((Date.now() - startTime) / 1000);
  chrome.storage.local.get(["timeSpent"], (data) => {
    const newTime = (data.timeSpent || 0) + duration;
    chrome.storage.local.set({ timeSpent: newTime });
  });
  startTime = null;
}