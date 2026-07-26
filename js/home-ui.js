/* ==========================================
   Home UI
========================================== */

"use strict";

const HomeUI = {

    init() {

        this.renderStudyTimer();

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

};
