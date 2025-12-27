// --- 1. GAME DATA STRUCTURE (No change, keeping original) ---
const GAME_DATA = {
    'BGMI': {
        img: 'https://wallpapers.com/images/hd/bgmi-parachute-landing-1y3cn7sploqanlop.jpg',
        description: "Battlegrounds Mobile India (BGMI) is a free-to-play, battle royale online multiplayer game. Squad up, drop in, and fight to be the last one standing! Classic battle royale action with high-stakes combat.",
        formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeWy6lUTwzPbOFvig5_UNgLlfNXqz8o0UMsPA6rTEiTVWa54g/viewform?usp=dialog',
        ranks: [
            { name: 'Solo', fee: '₹69' },
            { name: 'Duo', fee: '₹129' },
            { name: 'Squad', fee: '₹209' }
        ],
        // Changed alignment to 'align-bottom' (or center) for better visible cropping.
        alignmentClass: 'align-bottom'
    },
    'Free Fire': {
        img: 'https://i.ytimg.com/vi/bTBoM9Odxmc/maxresdefault.jpg',
        description: "Garena Free Fire is a mobile battle royale game, known for its fast-paced action and unique character abilities. Survival is the key. Only the swiftest and smartest will claim the Booyah!",
        formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeP4iD6JNyMb2nw0ziT3yN43dQLk0NtXV4V3doDnGTS9qUmOw/viewform?usp=dialog',
        ranks: [
            { name: 'Solo', fee: '₹69' },
            { name: 'Duo', fee: '₹129' },
            { name: 'Squad', 'fee': '₹209' }
        ],
        alignmentClass: 'align-bottom'
    },
    'Valorant': {
        img: 'https://mmos.com/wp-content/uploads/2021/06/valorant-heroes-grayscale-banner.jpg',
        description: "VALORANT is a 5v5 character-based tactical shooter. Combine precise gunplay with unique Agent abilities to dominate the map. Strategy and team coordination are paramount.",
        formLink: 'https://docs.google.com/forms/d/e/1FAIpQLScgKRpO7do02lUIeNIf7_EyqQpEO0yyEJAcxUAszLGr9hvOPg/viewform?usp=dialog',
        ranks: [
            { name: '5v5 Team', fee: '₹299' }
        ],
        alignmentClass: 'align-bottom'
    }
};

// --- 2. MODAL LOGIC (Corrected to fix registration button display) ---

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('registration-modal');
    const modalContent = document.querySelector('.modal-content');
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
        if (!data) return;

        // 1. Clean up and apply alignment class for banner cropping
        modalContent.classList.remove('align-top', 'align-bottom');
        if (data.alignmentClass) {
            modalContent.classList.add(data.alignmentClass);
        }

        // 2. Populate static modal content
        modalGameTitle.textContent = gameName;
        modalGameDescription.textContent = data.description;
        modalGameBanner.src = data.img;
        modalGameBanner.alt = `${gameName} Banner`;

        // 3. Clear previous options and button
        optionsContainer.innerHTML = '';
        const existingButton = document.querySelector('.single-register-btn');
        if (existingButton) {
            existingButton.remove();
        }

        // 4. Generate the scrollable option cards
        data.ranks.forEach(rank => {
            const cardHTML = `
                <div class="registration-option-card">
                    <h4>${rank.name} Entry</h4>
                    <span class="fee">${rank.fee} <small>Fee</small></span>
                </div>
            `;
            optionsContainer.insertAdjacentHTML('beforeend', cardHTML);
        });

        // 5. Add the single Register button (always visible below the scrollable cards)
        const registerButtonHTML = `
            <a href="${data.formLink}" target="_blank" class="btn single-register-btn">
                Proceed to Registration Form
            </a>
        `;
        // FIX APPLIED HERE: Corrected the variable name from 'registerButtonButtonHTML' to 'registerButtonHTML'
        optionsContainer.insertAdjacentHTML('afterend', registerButtonHTML);


        // 6. Show the modal
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
        const existingButton = document.querySelector('.single-register-btn');
        if (existingButton) {
            existingButton.remove();
        }
        modalContent.classList.remove('align-top', 'align-bottom');
    }

    closeBtn.addEventListener('click', closeModal);

    // Close on overlay click
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close on ESC key press
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
    const countDownDate = new Date("Nov 4, 2026 00:00:00").getTime();

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


// ------------------------------------------------------------------
// --- 5. WELCOME POPUP LOGIC (Original - Keep) ---
// This handles showing the "ALERT! Registration Started" popup on page load.

document.addEventListener('DOMContentLoaded', () => {
    // Get the popup element
    const welcomePopup = document.getElementById("welcome-popup");

    if (!welcomePopup) return; // Exit if the popup HTML isn't found

    // Function to show the popup
    function showWelcomePopup() {
        welcomePopup.style.display = "block";
    }

    // --- POPUP DISPLAY LOGIC ---
    // Show the popup automatically when the DOM is ready (or after a short delay)
    // Using a delay (e.g., 500ms) can sometimes improve user experience 
    // by letting the main content load first.
    setTimeout(showWelcomePopup, 500); 

    // --- CLOSING LOGIC (For clicking outside) ---
    // When the user clicks anywhere outside of the popup content, close it
    window.addEventListener('click', (event) => {
        if (event.target === welcomePopup) {
            welcomePopup.style.display = "none";
        }
    });
});
