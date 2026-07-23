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

        let countdownText =
            "Set your BPSC exam date in Study Profile.";

        let message =
            "Every topic you complete brings you closer to success.";

        if (examDate) {

            const today = new Date();

            today.setHours(0,0,0,0);

            const exam = new Date(examDate);

            exam.setHours(0,0,0,0);

            const daysLeft = Math.ceil(
                (exam - today) /
                (1000 * 60 * 60 * 24)
            );

            if (daysLeft > 1) {

                countdownText =
                    `${daysLeft} Days Left Until Exam`;

            } else if (daysLeft === 1) {

                countdownText =
                    "Tomorrow is your exam!";

            } else if (daysLeft === 0) {

                countdownText =
                    "🎯 Best of Luck! Today is your exam.";

            } else {

                countdownText =
                    "Congratulations! Update your next exam date.";

            }

        }

        container.innerHTML = `

<div class="dashboard-hero">

    <h1>

        ${greeting}, ${name} 👋

    </h1>

    <p>

        Let's continue your BPSC preparation.

    </p>

    <div class="dashboard-countdown">

        <h2>🎯 BPSC Countdown</h2>

        <div class="dashboard-days">

            ${countdownText}

        </div>

        <p>

            ${message}

        </p>

    </div>

</div>

`;

    }

};
