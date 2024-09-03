// Select DOM elements
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');

// Initialize variables
let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

// Function to update the stopwatch display
function updateDisplay() {
    const timeElapsed = Date.now() - startTime + elapsedTime;
    const minutes = Math.floor(timeElapsed / 60000);
    const seconds = Math.floor((timeElapsed % 60000) / 1000);
    const milliseconds = Math.floor((timeElapsed % 1000) / 10);

    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    millisecondsDisplay.textContent = milliseconds.toString().padStart(2, '0');
}

// Function to start or pause the stopwatch
startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        // Pause the stopwatch
        clearInterval(intervalId);
        elapsedTime += Date.now() - startTime;
        startPauseBtn.textContent = 'Start';
        lapBtn.disabled = true;
    } else {
        // Start the stopwatch
        startTime = Date.now();
        intervalId = setInterval(updateDisplay, 10);
        startPauseBtn.textContent = 'Pause';
        lapBtn.disabled = false;
    }
    isRunning = !isRunning;
});

// Function to reset the stopwatch
resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    elapsedTime = 0;
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    lapBtn.disabled = true;
    updateDisplay();
    lapsList.innerHTML = '';  // Clear laps
});

// Function to record a lap
lapBtn.addEventListener('click', () => {
    const lapTime = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
});
