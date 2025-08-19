// TEMPLATE: Update these filenames to match your uploaded videos
const videos = [
  "videos/video1.mp4",
  "videos/video2.mp4",
  "videos/video3.mp4",
  "videos/video4.mp4",
  "videos/video5.mp4",
  "videos/video6.mp4",
  "videos/video7.mp4",
  "videos/video8.mp4",
  "videos/video9.mp4",
  "videos/video10.mp4"
];

let current = 0;
const videoElement = document.getElementById("main-video");

// Array to store view times in milliseconds for each video
let viewTimes = Array(videos.length).fill(0);
let lastViewStart = null;

// UI elements
const currentViewTimeEl = document.getElementById('current-view-time');
const allViewListEl = document.getElementById('all-view-list');

// Function to show the video at index and record timing
function showVideo(idx) {
  recordCurrentViewTime();
  current = idx;
  videoElement.src = videos[current];
  videoElement.play();
  lastViewStart = Date.now();
  updateUI();
}

// Function to record view time for the current video
function recordCurrentViewTime() {
  if (lastViewStart !== null) {
    const now = Date.now();
    viewTimes[current] += now - lastViewStart;
  }
}

// Function to update time display in the UI
function updateUI() {
  // Current video view time (in seconds)
  let currentTime = viewTimes[current];
  if (lastViewStart !== null) {
    currentTime += Date.now() - lastViewStart;
  }
  currentViewTimeEl.textContent = (currentTime / 1000).toFixed(2);

  // All video view times
  allViewListEl.innerHTML = '';
  viewTimes.forEach((ms, idx) => {
    let displayMs = ms;
    if (idx === current && lastViewStart !== null) {
      displayMs += Date.now() - lastViewStart;
    }
    const li = document.createElement('li');
    li.textContent = `Video ${idx+1}: ${(displayMs / 1000).toFixed(2)} sec`;
    allViewListEl.appendChild(li);
  });
}

// Swipe detection for mobile
let startY = null;
videoElement.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});
videoElement.addEventListener("touchend", (e) => {
  if (startY === null) return;
  const endY = e.changedTouches[0].clientY;
  const deltaY = endY - startY;
  if (Math.abs(deltaY) > 50) {
    if (deltaY < 0 && current < videos.length - 1) {
      showVideo(current + 1);
    } else if (deltaY > 0 && current > 0) {
      showVideo(current - 1);
    }
  }
  startY = null;
});

// Keyboard support (for desktop testing)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && current < videos.length - 1) {
    showVideo(current + 1);
  } else if (e.key === "ArrowDown" && current > 0) {
    showVideo(current - 1);
  }
});

// Initial load
showVideo(current);

// Update UI every 0.2 seconds for live timer
setInterval(updateUI, 200);

// Record final view time when user leaves the page
window.addEventListener("beforeunload", () => {
  recordCurrentViewTime();
  updateUI();
});