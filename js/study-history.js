"use strict";

const StudyHistory = {

    init() {

        console.log("Study History Initialized");

        this.render();

    },

    render() {

        const container = document.getElementById("studyHistoryContainer");

        if (!container) return;

        const history = StudyHistoryStorage.load();

        if (!history || !history.records || history.records.length === 0) {

            this.renderEmpty(container);

            return;

        }

        this.renderPage(container, history);

    },

    renderEmpty(container) {

        container.innerHTML = `

            <div class="history-empty">

                <div class="history-empty-icon">📖</div>

                <h3>No Study History</h3>

                <p>
                    Complete today's planner and press
                    <strong>Finish Today</strong>
                    to archive your first study session.
                </p>

            </div>

        `;

    },

    renderPage(container, history) {

        container.innerHTML = `

            <div id="historyStats"></div>

            <div id="historySearch"></div>

            <div id="historyRecords"></div>

        `;

        this.renderStats(history);

        this.renderSearch();

        this.renderRecords(history);

    },

    renderStats(history) {

        // Next step

    },

    renderSearch() {

        // Next step

    },

    renderRecords(history) {

        // Next step

    }

};

document.addEventListener("DOMContentLoaded", () => {

    StudyHistory.init();

});
