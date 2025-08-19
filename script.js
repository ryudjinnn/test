const videos = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4"
];

let current = 0;
const videoElement = document.getElementById("main-video");

// Array to store view times in milliseconds for each video
let viewTimes = Array(videos.length).fill(0);
let lastViewStart = null;

// Function to show the video at index and record timing
function showVideo(idx) {
  // Record time spent on previous video
  if (lastViewStart !== null) {
    const now = Date.now();
    viewTimes[current] += now - lastViewStart;
    console.log(`Video ${current + 1} viewed for ${(viewTimes[current] / 1000).toFixed(2)} seconds`);
  }
  current = idx;
  videoElement.src = videos[current];
  videoElement.play();
  lastViewStart = Date.now();
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

// OPTIONAL: Record final view time when user leaves the page
window.addEventListener("beforeunload", () => {
  if (lastViewStart !== null) {
    const now = Date.now();
    viewTimes[current] += now - lastViewStart;
    // Here you could send the data to a server, log, or store as needed
    console.log("Final view times (seconds):", viewTimes.map(ms => (ms/1000).toFixed(2)));
  }
});