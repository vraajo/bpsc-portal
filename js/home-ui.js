/* ==========================================
   Home UI
========================================== */

"use strict";

const HomeUI = {

    init() {

        this.renderStudyTimer();
        this.bindEvents();
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

    <div class="studyTimerButtons">

        <button
            id="timerStartBtn">

            <span class="material-symbols-rounded">

                play_arrow

            </span>

            Start

        </button>

        <button
            id="timerPauseBtn">

            <span class="material-symbols-rounded">

                pause

            </span>

            Pause

        </button>

        <button
            id="timerStopBtn">

            <span class="material-symbols-rounded">

                stop

            </span>

            Stop

        </button>

    </div>

</div>

`;

    }


   bindEvents() {

    const startBtn = document.getElementById("timerStartBtn");
    const pauseBtn = document.getElementById("timerPauseBtn");
    const stopBtn = document.getElementById("timerStopBtn");

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            HomeEngine.startTimer();
        });
    }

    if (pauseBtn) {
        pauseBtn.addEventListener("click", () => {

            if (HomeEngine.getData().timerState === "running") {
                HomeEngine.pauseTimer();
            } else if (HomeEngine.getData().timerState === "paused") {
                HomeEngine.resumeTimer();
            }

        });
    }

    if (stopBtn) {
        stopBtn.addEventListener("click", () => {
            HomeEngine.stopTimer();
        });
    }

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
