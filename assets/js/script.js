document.addEventListener('DOMContentLoaded', function () {
    // Password check
    const passwordModal = document.getElementById('passwordModal');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContent = document.getElementById('mainContent');
    const passwordInput = document.getElementById('passwordInput');
    const submitPassword = document.getElementById('submitPassword');

    submitPassword.addEventListener('click', function () {
        if (passwordInput.value.toLowerCase() === 'december28') {
            passwordModal.style.opacity = '0';
            setTimeout(() => {
                passwordModal.style.display = 'none';
                welcomeScreen.style.display = 'flex';

                setTimeout(() => {
                    welcomeScreen.style.opacity = '0';
                    setTimeout(() => {
                        welcomeScreen.style.display = 'none';
                        mainContent.style.display = 'block';
                    }, 800);
                }, 2500);
            }, 500);
        } else {
            passwordInput.value = '';
            passwordInput.placeholder = 'Try again, my crush...';
            passwordInput.style.borderColor = '#ff4d4d';
            setTimeout(() => {
                passwordInput.style.borderColor = '#ffb7c5';
                passwordInput.placeholder = 'Ulit, your birthday po...';
            }, 1500);
        }
    });

    // Allow Enter key to submit password
    passwordInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitPassword.click();
        }
    });

    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Expandable love letter
    const loveLetter = document.getElementById('loveLetter');
    loveLetter.addEventListener('click', function () {
        this.classList.toggle('expanded');
    });

    // Add floating decorative elements
    function addFloatingElements() {
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 5 + 's';
            document.body.appendChild(heart);
        }

        for (let i = 0; i < 5; i++) {
            const teddy = document.createElement('div');
            teddy.classList.add('teddy-bear');
            teddy.innerHTML = '🧸';
            teddy.style.left = Math.random() * 100 + '%';
            teddy.style.top = Math.random() * 100 + '%';
            teddy.style.animationDelay = Math.random() * 5 + 's';
            document.body.appendChild(teddy);
        }
    }

    addFloatingElements();
});

// Music play/pause per song (clickable with icon update + replay when ended)
const songElements = document.querySelectorAll('.song');
let currentAudio = null;
let currentIcon = null;

songElements.forEach(song => {
    song.addEventListener('click', function () {
        const audioSrc = this.getAttribute('data-audio');
        const icon = this.querySelector('.song-icon');

        // Kung may tumutugtog na ibang kanta, i-pause muna at ibalik icon
        if (currentAudio && currentAudio.src.includes(audioSrc) === false) {
            currentAudio.pause();
            currentAudio.currentTime = 0; // reset old audio
            if (currentIcon) currentIcon.textContent = "▶️";
        }

        // Kung wala pang naka-load o ibang kanta ang pipindutin
        if (!currentAudio || currentAudio.src.includes(audioSrc) === false) {
            currentAudio = new Audio(audioSrc);
            currentAudio.play();
            icon.textContent = "⏸️";
            currentIcon = icon;

            // replay kapag natapos yung kanta
            currentAudio.onended = () => {
                currentAudio.currentTime = 0;
                currentAudio.play(); // auto replay
            };
        }
        // Kung same song ang pinindot (toggle pause/play)
        else {
            if (currentAudio.paused) {
                currentAudio.play();
                icon.textContent = "⏸️";
            } else {
                currentAudio.pause();
                icon.textContent = "▶️";
            }
        }
    });
});