// Array of video URLs (add more as needed)
const videos = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4" // Repeats for demonstration
];

let current = 0;
const videoElement = document.getElementById("main-video");

// Function to show the video at index
function showVideo(idx) {
  current = idx;
  videoElement.src = videos[current];
  videoElement.play();
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
      // Swipe up: next video
      showVideo(current + 1);
    } else if (deltaY > 0 && current > 0) {
      // Swipe down: previous video
      showVideo(current - 1);
    }
  }
  startY = null;
});

// Optional: Keyboard support (for desktop testing)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && current < videos.length - 1) {
    showVideo(current + 1);
  } else if (e.key === "ArrowDown" && current > 0) {
    showVideo(current - 1);
  }
});

// Initial load
showVideo(current);