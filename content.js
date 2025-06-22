chrome.storage.local.get(["timeSpent"], (data) => {
    const seconds = data.timeSpent || 0;
    if (seconds > 3600) {
      alert("You've been on this site for over an hour. Maybe take a break?");
    }
  });
  