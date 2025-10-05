// --- 1. GAME DATA STRUCTURE (Central source of truth for modal content) ---
const GAME_DATA = {
    'BGMI': {
        img: 'https://wallpapers.com/images/hd/bgmi-parachute-landing-1y3cn7sploqanlop.jpg',
        description: "Battlegrounds Mobile India (BGMI) is a free-to-play, battle royale online multiplayer game. Squad up, drop in, and fight to be the last one standing! Classic battle royale action with high-stakes combat.",
        // Single form link for all ranks in this game
        formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeWy6lUTwzPbOFvig5_UNgLlfNXqz8o0UMsPA6rTEiTVWa54g/viewform?usp=dialog', 
        ranks: [
            { name: 'Solo', fee: '₹69' },
            { name: 'Duo', fee: '₹129' },
            { name: 'Squad', fee: '₹209' }
        ]
    },
    'Free Fire': {
        img: 'https://i.ytimg.com/vi/bTBoM9Odxmc/maxresdefault.jpg',
        description: "Garena Free Fire is a mobile battle royale game, known for its fast-paced action and unique character abilities. Survival is the key. Only the swiftest and smartest will claim the Booyah!",
        // Single form link for all ranks in this game
        formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeP4iD6JNyMb2nw0ziT3yN43dQLk0NtXV4V3doDnGTS9qUmOw/viewform?usp=dialog',
        ranks: [
            { name: 'Solo', fee: '₹69' },
            { name: 'Duo', fee: '₹129' },
            { name: 'Squad', fee: '₹209' }
        ]
    },
    'Valorant': {
        img: 'https://images.wallpapersden.com/image/download/valorant-logo-art_bGZubWuUmZqaraWkpJRobWllrWdpZWU.jpg',
        description: "VALORANT is a 5v5 character-based tactical shooter. Combine precise gunplay with unique Agent abilities to dominate the map. Strategy and team coordination are paramount.",
        // Single form link for Valorant
        formLink: 'https://docs.google.com/forms/d/e/1FAIpQLScgKRpO7do02lUIeNIf7_EyqQpEO0yyEJAcxUAszLGr9hvOPg/viewform?usp=dialog',
        ranks: [
            { name: '5v5 Team', fee: '₹299' } // Keep this for display
        ]
    }
};

// --- 2. MODAL LOGIC ---

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('registration-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalTriggers = document.querySelectorAll('.modal-trigger');

    // Modal elements
    const modalGameTitle = document.getElementById('modal-game-title');
    const modalGameDescription = document.getElementById('modal-game-description');
    const modalGameBanner = document.getElementById('modal-game-banner');
    const optionsContainer = document.getElementById('registration-options-container');

    // Function to dynamically build and show the modal
    function openRegistrationModal(gameName) {
        const data = GAME_DATA[gameName];
        if (!data) return; // Exit if game data is missing

        // 1. Populate static modal content
        modalGameTitle.textContent = gameName;
        modalGameDescription.textContent = data.description;
        modalGameBanner.src = data.img;
        modalGameBanner.alt = `${gameName} Banner`;

        // 2. Clear previous options and build new option cards
        optionsContainer.innerHTML = ''; // Clear previous content

        // Generate the option cards (for display only)
        data.ranks.forEach(rank => {
            const cardHTML = `
                <div class="registration-option-card">
                    <h4>${rank.name} Entry</h4>
                    <span class="fee">${rank.fee} <small>Fee</small></span>
                </div>
            `;
            optionsContainer.insertAdjacentHTML('beforeend', cardHTML);
        });

        // 3. Add the single Register button at the bottom, linking to the main form
        const registerButtonHTML = `
            <a href="${data.formLink}" target="_blank" class="btn single-register-btn">
                Proceed to Registration Form
            </a>
        `;
        // Insert the button *after* the options container content, but still within the modal-details
        optionsContainer.insertAdjacentHTML('afterend', registerButtonHTML);


        // 4. Show the modal
        modal.style.display = 'flex';
    }

    // Attach event listeners to all game-card buttons
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const game = this.getAttribute('data-game');
            openRegistrationModal(game); 
        });
    });

    // Close Modal Functionality
    function closeModal() {
        modal.style.display = 'none';
        // Clean up the single-register-btn when closing to prevent duplication on next open
        const existingButton = document.querySelector('.single-register-btn');
        if (existingButton) {
            existingButton.remove();
        }
    }

    closeBtn.addEventListener('click', closeModal);

    // Close when the user clicks anywhere outside of the modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Optional: Close on ESC key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
});


// --- 3. LEADERBOARD SCRIPT (Original - Keep) ---

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


// --- 4. COUNTDOWN TIMER SCRIPT (Original - Keep) ---

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