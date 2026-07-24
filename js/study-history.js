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

    const stats = document.getElementById("historyStats");

    if (!stats) return;

    const summary = StudyHistoryStorage.getStatistics();

    stats.innerHTML = `

        <div class="history-card">

            <div class="history-stats-grid">

                <div class="history-stat">

                    <h2>${summary.totalDays}</h2>

                    <span>Study Days</span>

                </div>

                <div class="history-stat">

                    <h2>${summary.completedTopics}</h2>

                    <span>Completed Topics</span>

                </div>

                <div class="history-stat">

                    <h2>${summary.totalSubjects}</h2>

                    <span>Subjects</span>

                </div>

            </div>

        </div>

    `;

},

    renderSearch() {

    const search = document.getElementById("historySearch");

    if (!search) return;

    search.innerHTML = `

        <div class="history-card">

            <div class="history-search-wrapper">

                <input
                    type="text"
                    id="historySearchInput"
                    class="history-input"
                    placeholder="Search subjects or topics..."
                >

                <input
                    type="date"
                    id="historyDateFilter"
                    class="history-input"
                >

            </div>

        </div>

    `;

    const searchInput = document.getElementById("historySearchInput");
    const dateFilter = document.getElementById("historyDateFilter");

    searchInput.addEventListener("input", () => {

        this.render();

    });

    dateFilter.addEventListener("change", () => {

        this.render();

    });

},

    renderRecords(history) {

    const recordsContainer = document.getElementById("historyRecords");

    if (!recordsContainer) return;

    if (!history.records || history.records.length === 0) {

        recordsContainer.innerHTML = "";

        return;

    }

    let html = "";
    let currentMonth = "";

    history.records.forEach(record => {

        const date = new Date(record.archivedAt);

        const monthName = date.toLocaleDateString(undefined, {

            month: "long",
            year: "numeric"

        });

        if (monthName !== currentMonth) {

            currentMonth = monthName;

            html += `

                <div class="history-month-header">

                    ${monthName}

                </div>

            `;

        }

        const displayDate = date.toLocaleDateString(undefined, {

            weekday: "short",
            day: "numeric",
            month: "short"

        });

        const displayTime = date.toLocaleTimeString([], {

            hour: "2-digit",
            minute: "2-digit"

        });

        html += `

            <div class="history-card history-record">

                <div class="history-record-header">

                    <div>

                        <h3>${displayDate}</h3>

                        <small>${displayTime}</small>

                    </div>

                    <button
                        class="history-menu-btn"
                        data-id="${record.id}">
                        ⋮
                    </button>

                </div>

            </div>

        `;

    });

    recordsContainer.innerHTML = html;

},

};

document.addEventListener("DOMContentLoaded", () => {

    StudyHistory.init();

});
