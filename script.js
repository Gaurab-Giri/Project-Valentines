// Level Data
const levels = [
    {
        view: `<h1>Ready for a Journey? ❤️</h1>
               <p>I've built a special digital path just for you. Your presence makes every pixel brighter.</p>
               <button class="btn-valentine" onclick="startJourney()">Begin Our Story</button>`,
        question: "Where did we first meet? (🏣)",
        answer: "Noble Academy"
    },
    {
        view: `<h2>The Day It Began 👣</h2>
               <div style="margin: 20px 0; font-style: italic;">"Every great story has a start, and ours is my favorite."</div>
               <p>2023 was the year everything changed for the better.</p>
               <button class="btn-valentine" onclick="showQuiz()">Next Level</button>`,
        question: "What color was the shirt I wore on our first date? (Or your favorite color on me!)",
        answer: "black" // Change this to your real answer!
    },
    {
        view: `<h2>The Heart Test 💓</h2>
               <p>Will you be my Valentine?</p>
               <div style="height:100px; position: relative;">
                    <button onclick="showQuiz()" class="btn-valentine">YES!</button>
                    <button id="noBtn" onmouseover="moveNo()" style="padding: 10px; border-radius: 5px; border: 1px solid #ccc; cursor: pointer; background: white; color: #555;">No</button>
               </div>`,
        question: "What is the date of our anniversary? (Example: Dec 2)",
        answer: "December 2"
    },
    {
        view: `<h1>Happy Valentine's Day! 🌹</h1>
               <p>You made it! You are the most important part of my journey.</p>
               <div style="font-size: 50px; margin: 20px;">🎁</div>
               <p>I have built a special gallery of our memories for you.</p>
               <button class="btn-valentine" onclick="showAlbum()">Open Memories</button>`,
        question: null,
        answer: null
    }
];

// Photo Data - You can replace the src with actual image paths
const photos = [
    { src: "https://drive.google.com/uc?export=view&id=1wTZ1FlZsXZJOLI89VUmq-TH7V3gLEWNI", caption: "Our First Date" },
    { src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=500&auto=format&fit=crop", caption: "Adventure Time" },
    { src: "https://images.unsplash.com/photo-1522673607200-1645062cd95c?q=80&w=500&auto=format&fit=crop", caption: "Silly Moments" },
    { src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=500&auto=format&fit=crop", caption: "My Favorite Smile" },
    { src: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=500&auto=format&fit=crop", caption: "Pure Happiness" },
    { src: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=500&auto=format&fit=crop", caption: "Forever & Always" }
];

let currentLevel = 0;

// Global Functions
window.startJourney = function () {
    const music = document.getElementById('bgMusic');
    // Try to play music, handle autoplay policies
    music.play().catch(e => console.log("Music interaction required:", e));
    // This transitionTo function is not defined in the provided context.
    // Assuming the intent is to transition from the current view-shell to the quiz.
    // The showQuiz function already handles the slide-out of view-shell.
    // For now, we'll call showQuiz directly, as the original code did,
    // and let showQuiz handle the transition out of the current view.
    // If a global transitionTo is intended, it would need to be defined elsewhere.
    showQuiz();
};

window.showLevel = function () {
    const shell = document.getElementById('view-shell');

    // Animate old content out if it exists
    if (!shell.classList.contains('hidden') && shell.innerHTML.trim() !== '') { // Check if content exists to avoid animating empty shell
        shell.classList.add('slide-out-left');
        setTimeout(() => {
            renderLevel(shell);
        }, 500); // 500ms matches animation duration approx
    } else {
        renderLevel(shell);
    }
};

function renderLevel(shell) {
    shell.innerHTML = levels[currentLevel].view;
    shell.classList.remove('hidden', 'slide-out-left');
    shell.classList.add('slide-in-right');

    document.getElementById('quiz-overlay').classList.add('hidden');
    document.getElementById('photo-album').classList.add('hidden');
}

window.showQuiz = function () {
    const shell = document.getElementById('view-shell');

    // Transition Main View Out
    shell.classList.add('slide-out-left');

    setTimeout(() => {
        shell.classList.add('hidden');
        shell.classList.remove('slide-out-left');

        const quizOverlay = document.getElementById('quiz-overlay');
        document.getElementById('quiz-question').innerText = levels[currentLevel].question;
        document.getElementById('quiz-input').value = "";
        document.getElementById('quiz-error').innerText = "";

        quizOverlay.classList.remove('hidden');
        quizOverlay.classList.remove('slide-out-left'); // ensure clean state
        quizOverlay.classList.add('slide-in-right');
    }, 500);
};

window.verifyAnswer = function () {
    const input = document.getElementById('quiz-input').value.toLowerCase().trim();
    if (input === levels[currentLevel].answer.toLowerCase()) {
        // Transition Quiz Out
        const quizOverlay = document.getElementById('quiz-overlay');
        quizOverlay.classList.add('slide-out-left');

        setTimeout(() => {
            quizOverlay.classList.add('hidden');
            currentLevel++;
            showLevel();
        }, 500);

    } else {
        shakeInput();
        document.getElementById('quiz-error').innerText = "Not quite! Think harder, beautiful... ❤️";
    }
};

window.showAlbum = function () {
    const shell = document.getElementById('view-shell');
    shell.classList.add('slide-out-left');

    setTimeout(() => {
        shell.classList.add('hidden');

        const album = document.getElementById('photo-album');
        album.classList.remove('hidden');
        album.classList.add('slide-in-right');

        const grid = document.getElementById('photo-grid');
        grid.innerHTML = ""; // Clear existing

        photos.forEach((photo, index) => {
            const card = document.createElement('div');
            card.className = 'photo-card';
            const rotate = (Math.random() * 10 - 5).toFixed(2);
            card.style.setProperty('--rotation', `${rotate}deg`);

            card.innerHTML = `
                <div class="photo-frame">
                    <img src="${photo.src}" alt="${photo.caption}">
                </div>
                <div class="photo-caption">${photo.caption}</div>
            `;

            card.style.opacity = '0';
            card.style.animation = `fadeIn 0.5s ease-out forwards ${index * 0.2 + 0.5}s`; // Add delay specifically for album

            grid.appendChild(card);
        });
    }, 500);
};

window.restartJourney = function () {
    currentLevel = 0;
    showLevel();
};

window.moveNo = function () {
    const btn = document.getElementById('noBtn');
    // Ensure button stays within the view container
    const x = Math.random() * 200 - 100; // -100 to 100
    const y = Math.random() * 200 - 100;

    btn.style.transform = `translate(${x}px, ${y}px)`;
    btn.style.transition = "transform 0.2s ease";
};

function shakeInput() {
    const input = document.getElementById('quiz-input');
    input.style.transform = "translateX(5px)";
    setTimeout(() => input.style.transform = "translateX(-5px)", 50);
    setTimeout(() => input.style.transform = "translateX(5px)", 100);
    setTimeout(() => input.style.transform = "translateX(0)", 150);
}

// Background Hearts Animation
function createHearts() {
    const container = document.getElementById('heart-bg');
    if (!container) return;

    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = ['❤️', '💖', '💘', '💝'][Math.floor(Math.random() * 4)];

    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';

    const duration = Math.random() * 3 + 4; // 4 to 7 seconds
    heart.style.animationDuration = duration + 's';

    container.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
}

setInterval(createHearts, 300);

// Initialize
document.addEventListener('DOMContentLoaded', showLevel);
