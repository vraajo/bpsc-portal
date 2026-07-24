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
      this.renderQuickActions();
      this.renderRecentActivity();

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

    const profile =
    typeof ProfileModule !== "undefined"
        ? ProfileModule.localLoad()
        : null;

const examDate =
    profile?.examDate || "";

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

       let progress = 0;

if (examDate && typeof daysLeft === "number") {

    // 365-day countdown scale
    progress = Math.max(
        0,
        Math.min(
            100,
            ((365 - daysLeft) / 365) * 100
        )
    );

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

    <svg class="countdownSvg" viewBox="0 0 120 120">

        <circle
            class="countdownBg"
            cx="60"
            cy="60"
            r="52">
        </circle>

        <circle
            class="countdownProgress"
            cx="60"
            cy="60"
            r="52">
        </circle>

    </svg>

    <div class="countdownContent">

        <div class="countdownNumber">

            ${daysLeft}

        </div>

        <div class="countdownLabel">

            ${status}

        </div>

    </div>

</div>

    </div>

</div>

`;

       console.log("Days:", daysLeft, "Progress:", progress);
       const ring = container.querySelector(".countdownProgress");

if (ring) {

    const radius = 52;
    const circumference = 2 * Math.PI * radius;

    ring.style.strokeDasharray = circumference;

    const offset =
        circumference * (1 - progress / 100);

    ring.style.strokeDashoffset = offset;

}

},


   renderStats() {

    const container =
        document.getElementById("dashboardStats");

    if (!container) return;

    if (typeof PlannerEngine === "undefined") return;

    const stats = PlannerEngine.getStatistics();

    container.innerHTML = `

<div class="dashboardStatsCard">

<h3>Today's Progress</h3>

<div class="dashboardStatsGrid">

<div class="dashboardStat">

<div class="statValue">${stats.completedToday}</div>

<div class="statLabel">Today</div>

</div>

<div class="dashboardStat">

<div class="statValue">${stats.overallProgress}%</div>

<div class="statLabel">Overall</div>

</div>

<div class="dashboardStat">

<div class="statValue">${stats.totalSubjects}</div>

<div class="statLabel">Subjects</div>

</div>

<div class="dashboardStat">

<div class="statValue">${stats.remainingTopics}</div>

<div class="statLabel">Remaining</div>

</div>

</div>

</div>

`;

},

   renderQuickActions() {

    const container =
        document.getElementById("dashboardQuickActions");

    if (!container) return;

    container.innerHTML = `

<div class="dashboardQuickCard">

    <h3>Quick Actions</h3>

    <div class="quickGrid">

        <button
            class="quickItem"
            onclick="showPage('plannerPage')">

            📚
            <span>Planner</span>

        </button>

        <button
            class="quickItem"
            onclick="showPage('notesPage')">

            📝
            <span>Notes</span>

        </button>

        <button
            class="quickItem"
            onclick="showPage('syllabusPage')">

            📖
            <span>Syllabus</span>

        </button>

        <button
            class="quickItem"
            onclick="showPage('cloudSyncPage')">

            ☁️
            <span>Cloud</span>

        </button>

    </div>

</div>

`;

},

   renderRecentActivity() {

    const container =
        document.getElementById(
            "dashboardRecentActivity"
        );

    if (!container) return;

    container.innerHTML = `

<div class="dashboardActivityCard">

    <h3>

        Recent Activity

    </h3>

    <div class="activityItem">

        ✅ Welcome back to BPSC Portal

    </div>

    <div class="activityItem">

        📚 Planner Loaded Successfully

    </div>

    <div class="activityItem">

        ☁ Cloud Sync Ready

    </div>

</div>

`;

}

};
