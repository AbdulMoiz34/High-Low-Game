const highBtn = document.getElementById("guess-higher");
const lowerBtn = document.getElementById("guess-lower");

const difficultyLevelEl = document.getElementById("difficulty");
const playerNameEl = document.getElementById("player-name");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const showPlayerNumEl = document.getElementById("player-number");
const showCompNumEl = document.getElementById("computer-number");
const totalRoundsEl = document.getElementById("total-rounds");
const showScoreEl = document.getElementById("score");
const resultMsg = document.getElementById("result-message");
const newRoundBtn = document.getElementById("new-round");
const roundEl = document.getElementById("round");
const timeLimitEl = document.getElementById("time-limit");

let score = 0;
let playerNum, computerNum, totalRounds, timeLimit;
let currentRound;
let id;
let isSpaceBarEnabled = true;

const startGameHandler = () => {
    event.preventDefault();
    const displayName = document.getElementById("display-name");
    const difficulty = difficultyLevelEl.value;
    gameScreen.classList.remove("hidden");
    startScreen.classList.add("hidden");
    currentRound = 1;
    setGameDifficulty(difficulty);
    updateHint(difficulty)
    displayName.textContent = playerNameEl.value;
    showPlayerNumEl.textContent = playerNum;
    totalRoundsEl.textContent = totalRounds;
    showScoreEl.textContent = score;
    showCompNumEl.textContent = "?";
    roundEl.textContent = currentRound;
    highBtn.classList.remove("hidden")
    lowerBtn.classList.remove("hidden")
    newRoundBtn.textContent = "Next Round";
    newRoundBtn.classList.add("hidden");
    if (timeLimit) {
        handleTimeLimit();
    }
}

const difficultyChangeHandler = () => {
    const roundsBox = document.getElementById("rounds-box");
    if (difficultyLevelEl.value == "easy") {
        roundsBox.classList.remove("hidden");
    } else {
        roundsBox.classList.add("hidden");
    }
}

const randomNumberGenerator = (limit) => {
    return Math.ceil(Math.random() * limit);
}

const checkNumbers = (inp) => {
    if (inp === "lower" && playerNum < computerNum) {
        return true;
    } else if (inp == "higher" && playerNum > computerNum) {
        return true;
    } else {
        return false;
    }
}


const handler = () => {
    const result = checkNumbers(event.target.textContent);
    if (result) score++;
    resultMsg.innerHTML = `Your Answer is <span class="text-white uppercase px-3 font-bold gap-y-2 bg-${result ? 'green' : "red"}-700">${result ? "correct" : "wrong"} </span>`;
    showCompNumEl.textContent = computerNum;
    showScoreEl.textContent = score;
    highBtn.classList.add("hidden");
    lowerBtn.classList.add("hidden");
    newRoundBtn.classList.remove("hidden");
    if (currentRound == totalRounds) {
        gameScreen.classList.add("hidden");
        showResult();
    }
}


const roundsInput = document.getElementById("rounds");

const setGameDifficulty = (difficulty) => {
    let limit;
    if (difficulty === "easy") {
        totalRounds = roundsInput.value;
        limit = 50;
    } else if (difficulty === "medium") {
        totalRounds = 10;
        timeLimit = 20;
        limit = 100;
    } else {
        totalRounds = 12;
        timeLimit = 15;
        limit = 200;
    }
    computerNum = randomNumberGenerator(limit);
    playerNum = randomNumberGenerator(limit);
};

const nextRound = () => {
    if (!(currentRound < totalRounds)) {
        return;
    }
    currentRound++;
    newRoundBtn.classList.add("hidden");
    highBtn.classList.remove("hidden");
    lowerBtn.classList.remove("hidden");
    roundEl.textContent = currentRound;
    resultMsg.innerHTML = "";
    let difficulty = difficultyLevelEl.value;
    let limit;
    if (difficulty === "easy") {
        limit = 50;
    } else if (difficulty === "medium") {
        limit = 100;
    } else {
        limit = 200;
    }
    playerNum = randomNumberGenerator(limit);
    computerNum = randomNumberGenerator(limit);
    showPlayerNumEl.textContent = playerNum;
    showCompNumEl.textContent = "?";
};


const handleTimeLimit = () => {
    id = setInterval(() => {
        timeLimitEl.textContent = timeLimit.toString().padStart(2, 0);
        timeLimit--;
        if (timeLimit === 10) {
            timeLimitEl.classList.add("text-red-700");
        }
        if (timeLimit <= 5) {
            timeLimitEl.classList.add("time-limit-anim");
        }
        if (timeLimit < 0) {
            clearInterval(id);
            gameScreen.classList.add("hidden");
            showResult();
        }
    }, 1000);
}

const restartGame = () => {
    clearInterval(id);
    score = 0;
    currentRound = 0;
    totalRounds = 0;
    timeLimit = 0;
    timeLimitEl.classList.remove("text-red-700");
    timeLimitEl.textContent = "";
    showScoreEl.textContent = score;
    resultMsg.innerHTML = "";
    highBtn.classList.remove("hidden");
    lowerBtn.classList.remove("hidden");
    newRoundBtn.classList.add("hidden");
    document.querySelector(".result-screen").classList.add("hidden");
    startScreen.classList.remove("hidden");
    timeLimitEl.classList.remove("time-limit-anim");
};


const calcPercentage = () => {
    const percent = score / totalRounds * 100;
    return Number.isInteger(percent) ? percent : Number(percent.toFixed(2));
}

const showResult = () => {
    clearInterval(id);
    const resultScreen = document.querySelector(".result-screen");
    const message = document.getElementById("resultMessage");
    const scoreDisplay = document.getElementById("scoreDisplay");
    const percentDisplay = document.getElementById("percentDisplay");
    const percentage = calcPercentage();
    if (timeLimit < 0 && currentRound < totalRounds) {
        message.textContent = "You Lost.⌚";
    } else if (score == totalRounds && totalRounds >= 5) {
        message.innerHTML = "🎉 Amazing! You Won!😎";
    } else if (totalRounds - score < 3 && totalRounds > 5) {
        message.innerHTML = "🎉 Excellent😃";
    } else if (totalRounds - score < 5 && totalRounds > 5) {
        message.innerHTML = "Good Job!🙂";
    } else {
        message.innerHTML = "You Lost!";
    }
    resultScreen.classList.remove("hidden");
    percentDisplay.textContent = percentage + "%";
    scoreDisplay.innerHTML = score;
}

const updateHint = (difficulty) => {
    const tooltip = document.getElementById("tooltip-animation");
    if (difficulty == "easy") {
        tooltip.textContent = "Number is between 01 to 50";
    } else if (difficulty == "medium") {
        tooltip.textContent = "Number is between 01 to 100";
    } else if (difficulty == "hard") {
        tooltip.textContent = "Number is between 01 to 200";
    }
};

// Musics/songs functionality
const playlist = [
    {
        title: "Song 1",
        artist: "Electronic Dreams",
        preview: "./songs/1.mp3",
        art: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTXtoK98tZjsGO4yuujrv66etC1jF0EwQepA&s"
    },
    {
        title: "Song 2",
        artist: "Tropical Vibes",
        preview: "./songs/2.mp3",
        art: "https://png.pngtree.com/background/20211217/original/pngtree-tropical-vibes-background-picture-image_1591024.jpg"
    },
    { title: "Song 3", artist: "Chill Beats", preview: "./songs/3.mp3", art: "https://i.scdn.co/image/ab6761610000e5ebc6afe9e8ce9516d4684e13db" },
    { title: "Rap⚡", artist: "Chill Beats", preview: "./songs/4.mp3", art: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6lo5alrXWZx2afYmQ3Xjt49qt2A7_Z-_dGQ&s" },
    { title: "Song 5", artist: "Chill Beats", preview: "./songs/5.mp3", art: "https://source.unsplash.com/random/800x800/?vinyl" },
    { title: "Song 6", artist: "Chill Beats", preview: "./songs/6.mp3", art: "https://source.unsplash.com/random/800x800/?vinyl" },
    { title: "Song 07", artist: "Chill Beats", preview: "./songs/7.mp3", art: "https://source.unsplash.com/random/800x800/?vinyl" },
    { title: "Song 08", artist: "Chill Beats", preview: "./songs/8.mp3", art: "https://source.unsplash.com/random/800x800/?vinyl" },
    { title: "Song 09", artist: "Chill Beats", preview: "./songs/9.mp3", art: "https://source.unsplash.com/random/800x800/?vinyl" },
    { title: "Song 10", artist: "Chill Beats", preview: "./songs/10.mp3", art: "https://source.unsplash.com/random/800x800/?vinyl" },
    { title: "Song 11", artist: "Chill Beats", preview: "./songs/11.mp3", art: "https://source.unsplash.com/random/800x800/?vinyl" }
];

const playlistEl = document.getElementById('playlist');
let currentAudio = new Audio();
let currentlyPlayingIndex = null;

playlist.forEach((track, index) => {
    const trackEl = document.createElement('div');
    trackEl.className = "mt-4 bg-gray-800 p-4 rounded-lg flex items-center gap-4 transition hover:bg-gray-700";

    // Initially set duration as loading
    let durationText = "Loading...";

    trackEl.innerHTML = `
        <img src="${track.art}" class="w-14 h-14 rounded-lg shadow-lg" alt="${track.title}" />
        <div class="flex-1 min-w-0">
            <h3 class="text-white font-medium truncate">${track.title}</h3>
            <p class="text-gray-400 text-sm truncate">${track.artist}</p>
            <div class="relative w-full h-2 bg-gray-600 rounded mt-2 overflow-hidden">
                <div class="progress-bar bg-blue-500 h-full w-0"></div>
            </div>
        </div>
        <button class="play-btn p-2 text-gray-300 hover:text-white">▶️</button>
        <span class="text-xs text-gray-400 min-w-[70px]">0:00 / ${durationText}</span>
    `;

    const playBtn = trackEl.querySelector('.play-btn');
    const progressBar = trackEl.querySelector('.progress-bar');
    const timeLabel = trackEl.querySelector('span');

    // Pre-load audio to get duration
    const tempAudio = new Audio(track.preview);
    tempAudio.onloadedmetadata = function () {
        const duration = formatTime(tempAudio.duration);
        timeLabel.textContent = `0:00 / ${duration}`;
        tempAudio.remove(); // Clean up
    };

    trackEl.addEventListener('click', () => togglePlay(index, playBtn, progressBar, timeLabel));
    playlistEl.appendChild(trackEl);
});

function togglePlay(index, playBtn, progressBar, timeLabel) {
    if (currentlyPlayingIndex === index && !currentAudio.paused) {
        currentAudio.pause();
        playBtn.textContent = "▶️";
        document.querySelectorAll('.play-btn').forEach(btn => btn.textContent = "▶️");
        return;
    }

    if (currentlyPlayingIndex !== null && currentlyPlayingIndex !== index) {
        const previousPlayBtn = document.querySelectorAll('.play-btn')[currentlyPlayingIndex];
        previousPlayBtn.textContent = "▶️";
        currentAudio.pause();
    }

    if (currentlyPlayingIndex !== index) {
        currentAudio.src = playlist[index].preview;
        currentAudio.load();

        currentAudio.onloadedmetadata = function () {
            const duration = formatTime(currentAudio.duration);
            playlist[index].duration = duration;
            timeLabel.textContent = `0:00 / ${duration}`;
        };
    }

    currentAudio.play();
    playBtn.textContent = "⏸️";
    currentlyPlayingIndex = index;

    currentAudio.ontimeupdate = () => {
        const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
        progressBar.style.width = `${progress}%`;
        const currentTime = formatTime(currentAudio.currentTime);
        const totalTime = formatTime(currentAudio.duration);
        timeLabel.textContent = `${currentTime} / ${totalTime}`;
    };

    currentAudio.onended = () => {
        playBtn.textContent = "▶️";
        progressBar.style.width = "0%";
        timeLabel.textContent = `0:00 / ${formatTime(currentAudio.duration)}`;
    };
}

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
    }

    if (event.code === 'Space' && isSpaceBarEnabled) {
        event.preventDefault(); // Prevent page scrolling
        if (currentlyPlayingIndex !== null) {
            const playBtn = document.querySelectorAll('.play-btn')[currentlyPlayingIndex];
            const progressBar = document.querySelectorAll('.progress-bar')[currentlyPlayingIndex];
            const timeLabel = document.querySelectorAll('span')[currentlyPlayingIndex];
            togglePlay(currentlyPlayingIndex, playBtn, progressBar, timeLabel);
        } else if (playlist.length > 0) {
            // If nothing is playing, play the first song
            const playBtn = document.querySelectorAll('.play-btn')[0];
            const progressBar = document.querySelectorAll('.progress-bar')[0];
            const timeLabel = document.querySelectorAll('span')[0];
            togglePlay(0, playBtn, progressBar, timeLabel);
        }
    }
}