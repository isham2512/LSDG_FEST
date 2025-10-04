
// LEADERBOARD SCRIPT (Verified and Functional)
function showLeaderboard(gameId, buttonElement) {
    const allLeaderboards = document.querySelectorAll('.leaderboard-game');
    allLeaderboards.forEach(board => {
        board.style.display = 'none';
    });

    const selectedLeaderboard = document.getElementById(gameId + '-leaderboard');
    if (selectedLeaderboard) {
        selectedLeaderboard.style.display = 'block';
    }

    const allButtons = document.querySelectorAll('.leaderboard-controls button');
    allButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    if (buttonElement) {
        buttonElement.classList.add('active');
    }
}

// COUNTDOWN TIMER SCRIPT
function updateCountdown() {
    // Set the date we're counting down to: November 4, 2025, 00:00:00 (Local Time)
    const countDownDate = new Date("Nov 4, 2025 00:00:00").getTime();

    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in elements with respective IDs
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (daysElement) daysElement.innerHTML = days.toString().padStart(2, '0');
    if (hoursElement) hoursElement.innerHTML = hours.toString().padStart(2, '0');
    if (minutesElement) minutesElement.innerHTML = minutes.toString().padStart(2, '0');
    if (secondsElement) secondsElement.innerHTML = seconds.toString().padStart(2, '0');

    // If the countdown is finished, write some text and stop the timer
    if (distance < 0) {
        clearInterval(x);
        const timerContainer = document.getElementById("countdown-timer");
        if (timerContainer) {
            timerContainer.innerHTML = "<h3 style='color: var(--primary-color);'>THE BATTLE HAS BEGUN!</h3>";
        }
    }
}

// Run the updateCountdown function immediately and then every 1 second
updateCountdown();
const x = setInterval(updateCountdown, 1000);
