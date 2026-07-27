/* ==========================================
   Home UI
========================================== */

"use strict";

const HomeUI = {

    init() {

        this.renderStudyTimer();
        this.renderButtons();
        this.startClock();
        

    },

    renderStudyTimer() {

        const container =
            document.getElementById(
                "homeStudyTimer"
            );

        if (!container) return;

        container.innerHTML = `

<div class="studyTimerCard">

    <div class="studyTimerHeader">

        <span class="material-symbols-rounded">

            timer

        </span>

        <h3>

            Study Timer

        </h3>

    </div>

    <div
        class="studyTimerClock"
        id="studyTimerClock">

        00:00:00

    </div>

    <div
    class="studyTimerButtons"
    id="studyTimerButtons">
</div>

</div>

`;

    },


   bindEvents() {

    const startBtn = document.getElementById("timerStartBtn");
    const pauseBtn = document.getElementById("timerPauseBtn");
    const resumeBtn = document.getElementById("timerResumeBtn");
    const stopBtn = document.getElementById("timerStopBtn");

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            HomeEngine.startTimer();
            this.renderButtons();
        });
    }

    if (pauseBtn) {
        pauseBtn.addEventListener("click", () => {
            HomeEngine.pauseTimer();
            this.renderButtons();
        });
    }

    if (resumeBtn) {
        resumeBtn.addEventListener("click", () => {
            HomeEngine.resumeTimer();
            this.renderButtons();
        });
    }

    if (stopBtn) {
        stopBtn.addEventListener("click", () => {
            HomeEngine.stopTimer();
            this.renderButtons();
        });
    }

},

   renderButtons() {

    const container =
        document.getElementById("studyTimerButtons");

    if (!container) return;

    const state = HomeEngine.getData().timerState;

    if (state === "ready") {

        container.innerHTML = `
            <button id="timerStartBtn" class="primaryBtn">
                <span class="material-symbols-rounded">play_arrow</span>
                Start
            </button>
        `;

    }

    else if (state === "running") {

        container.innerHTML = `
            <button id="timerPauseBtn">
                <span class="material-symbols-rounded">pause</span>
                Pause
            </button>

            <button id="timerStopBtn">
                <span class="material-symbols-rounded">stop</span>
                Stop
            </button>
        `;

    }

    else if (state === "paused") {

        container.innerHTML = `
            <button id="timerResumeBtn">
                <span class="material-symbols-rounded">play_arrow</span>
                Resume
            </button>

            <button id="timerStopBtn">
                <span class="material-symbols-rounded">stop</span>
                Stop
            </button>
        `;

    }

    this.bindEvents();

},

   startClock() {

    this.updateClock();

    setInterval(() => {

        this.updateClock();

    }, 1000);

},

updateClock() {

    const clock = document.getElementById("studyTimerClock");

    if (!clock) return;

    const seconds = HomeEngine.getCurrentSessionSeconds();

    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    clock.textContent = `${hrs}:${mins}:${secs}`;

}

 

};
