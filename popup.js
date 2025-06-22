function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  }
  
  chrome.storage.local.get(["timeSpent"], (data) => {
    const time = data.timeSpent || 0;
    document.getElementById("time").textContent = formatTime(time);
  });
  
  document.getElementById("reset").addEventListener("click", () => {
    chrome.storage.local.set({ timeSpent: 0 }, () => {
      document.getElementById("time").textContent = "0h 0m 0s";
    });
  });