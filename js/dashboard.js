/* ==========================================
   Dashboard
========================================== */

"use strict";

const Dashboard = {

    init() {

        this.refresh();

    },

    refresh() {

    this.renderHero();

    this.renderStats();

},

    renderHero() {

    const container =
        document.getElementById("dashboardHero");

    if (!container) return;

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour >= 5 && hour < 12) {

        greeting = "Good Morning";

    } else if (hour >= 12 && hour < 17) {

        greeting = "Good Afternoon";

    } else if (hour >= 17 && hour < 21) {

        greeting = "Good Evening";

    } else {

        greeting = "Good Night";

    }

    let name = "Guest";

    if (
        typeof firebase !== "undefined" &&
        firebase.auth().currentUser
    ) {

        name =
            firebase.auth().currentUser.displayName ||
            "User";

    }

    const examDate =
        localStorage.getItem("examDate");

    let daysLeft = "--";
    let status = "Set Exam Date";

    if (examDate) {

        const today = new Date();
        today.setHours(0,0,0,0);

        const exam = new Date(examDate);
        exam.setHours(0,0,0,0);

        const diff = Math.ceil(
            (exam - today) /
            (1000 * 60 * 60 * 24)
        );

        daysLeft = diff;

        if (diff > 1) {

            status = "Days Left";

        } else if (diff === 1) {

            status = "Tomorrow";

        } else if (diff === 0) {

            status = "Exam Today";

        } else {

            status = "Exam Over";

        }

    }

    container.innerHTML = `

<div class="dashboardHeroCard">

    <div class="heroLeft">

        <h2>

            ${greeting}, ${name} 👋

        </h2>

        <p>

            Let's continue your preparation.

        </p>

        <small>

            Every topic you complete
            brings you closer to success.

        </small>

    </div>

    <div class="heroRight">

        <div class="countdownCircle">

            <div class="countdownNumber">

                ${daysLeft}

            </div>

            <div class="countdownLabel">

                ${status}

            </div>

        </div>

    </div>

</div>

`;

}

};
