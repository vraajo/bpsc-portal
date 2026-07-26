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

        if (!history || !history.history || history.history.length === 0) {

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

        <button
            id="historyTestButton"
            class="btn"
            style="margin-top:20px;">
            Create Test Record
        </button>

    </div>

`;

        const button = document.getElementById("historyTestButton");

button.addEventListener("click", () => {

    this.createTestRecord();

});

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

    const history = StudyHistoryStorage.load();

    this.renderRecords(history);

});

dateFilter.addEventListener("change", () => {

    const history = StudyHistoryStorage.load();

    this.renderRecords(history);

});

},

    filterRecords(history) {

    if (!history || !history.history) {

        return [];

    }

    const searchText =
        (
            document.getElementById("historySearchInput")?.value || ""
        )
        .trim()
        .toLowerCase();

    const selectedDate =
        document.getElementById("historyDateFilter")?.value || "";

    return history.history.filter(record => {

        /* ---------- Date Filter ---------- */

        if (selectedDate) {

            const recordDate =
                new Date(record.archivedAt)
                    .toISOString()
                    .split("T")[0];

            if (recordDate !== selectedDate) {

                return false;

            }

        }

        /* ---------- Subject / Topic Filter ---------- */

        if (!searchText) {

            return true;

        }

        return record.subjects.some(subject => {

            if (
                subject.title &&
                subject.title.toLowerCase().includes(searchText)
            ) {

                return true;

            }

            return subject.topics.some(topic => {

                return (
                    topic.title &&
                    topic.title.toLowerCase().includes(searchText)
                );

            });

        });

    });

},

    renderRecords(history) {

    const recordsContainer = document.getElementById("historyRecords");

    if (!recordsContainer) return;

    const records = this.filterRecords(history);

if (records.length === 0) {

    recordsContainer.innerHTML = `

        <div class="history-card">

            <h3>No matching records found</h3>

        </div>

    `;

    return;

}


    let html = "";
    let currentMonth = "";

    records.forEach(record => {

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

    const subjectsPreview = record.subjects.map((subject, index) => {

    const icons = ["📘", "📗", "📙", "📕", "📓"];

    const icon = icons[index % icons.length];

    return `

        <div class="history-subject-preview">

            <span>

                ${icon} ${subject.title}

            </span>

            <span>

                ${subject.topics.length} Topics

            </span>

        </div>

    `;

}).join("");

        html += `

            <div class="history-card history-record">

                <div class="history-record-header">

                    <div>

                          <h3>${displayDate}</h3>

                   </div>

                    <button
                        class="history-menu-btn"
                        data-id="${record.id}">
                        ⋮
                    </button>

                </div>

                <div class="history-subject-preview-list">

                      ${subjectsPreview}

                </div>

            </div>

        `;

    });

    recordsContainer.innerHTML = html;

        this.attachMenuEvents();

},

    attachMenuEvents() {

    document.querySelectorAll(".history-menu-btn").forEach(button => {

        button.addEventListener("click", (event) => {

            event.stopPropagation();

            const recordId = button.dataset.id;

            this.showRecordMenu(recordId);

        });

    });

},

    showRecordMenu(recordId) {

    document
        .getElementById("historyActionSheet")
        ?.remove();

    const sheet = document.createElement("div");

    sheet.id = "historyActionSheet";

    sheet.innerHTML = `

<div class="history-sheet-backdrop"></div>

<div class="history-sheet">

<div class="history-sheet-title">

Study Record

</div>

<button class="history-sheet-btn view-btn">

👁 View Details

</button>

<button class="history-sheet-btn delete-btn">

🗑 Delete Record

</button>

<button class="history-sheet-btn cancel-btn">

Cancel

</button>

</div>

`;

    document.body.appendChild(sheet);

    sheet.querySelector(".view-btn")
        .onclick = () => {

        sheet.remove();

        this.viewRecord(recordId);

    };

    sheet.querySelector(".delete-btn")
        .onclick = () => {

        sheet.remove();

        this.deleteRecord(recordId);

    };

    sheet.querySelector(".cancel-btn")
        .onclick = () => {

        sheet.remove();

    };

    sheet.querySelector(".history-sheet-backdrop")
        .onclick = () => {

        sheet.remove();

    };

},

    viewRecord(recordId) {

    const history = StudyHistoryStorage.load();

    const record = history.history.find(r => r.id === recordId);

    if (!record) return;

    const old = document.getElementById("historyDetailsModal");

    if (old) old.remove();

    const date = new Date(record.archivedAt);

    let html = "";

    let completed = 0;

    let total = 0;

    record.subjects.forEach(subject => {

        html += `

<div class="history-detail-subject">

<h3>${subject.title}</h3>

`;

        subject.topics.forEach(topic => {

            total++;

            if (topic.completed) completed++;

            html += `

<div class="history-topic-row">

<span>

${topic.completed ? "✅" : "⬜"}

${topic.title}

</span>

</div>

`;

        });

        html += "</div>";

    });

    const modal = document.createElement("div");

    modal.id = "historyDetailsModal";

    modal.innerHTML = `

<div class="history-detail-backdrop"></div>

<div class="history-detail-sheet">

<h2>📖 Study Record</h2>

<p>

${date.toLocaleDateString()}

${date.toLocaleTimeString([],{

hour:"2-digit",

minute:"2-digit"

})}

</p>

${html}

<div class="history-summary">

<div>Subjects : ${record.subjects.length}</div>

<div>Topics : ${total}</div>

<div>Completed : ${completed}</div>

</div>

<button class="primary-btn history-close-btn">

Close

</button>

</div>

`;

    document.body.appendChild(modal);

    modal.querySelector(".history-close-btn").onclick = () => {

        modal.remove();

    };

    modal.querySelector(".history-detail-backdrop").onclick = () => {

        modal.remove();

    };

},

    createTestRecord() {

    const planner = {

        date: new Date().toISOString(),

        subjects: [

            {

                name: "History",

                topics: [

                    {

                        title: "Mauryan Empire",

                        completed: true

                    },

                    {

                        title: "Gupta Empire",

                        completed: false

                    }

                ]

            },

            {

                name: "Polity",

                topics: [

                    {

                        title: "Preamble",

                        completed: true

                    }

                ]

            }

        ]

    };

    StudyHistoryStorage.add(planner);

    this.render();

},

    deleteRecord(recordId) {

    if (!confirm("Delete this study history?")) return;

    StudyHistoryStorage.delete(recordId);

    this.render();

}
};


/*
document.addEventListener("DOMContentLoaded", () => {

    StudyHistory.init();

}); */


/* ==========================================================
   CLOUD SYNC REGISTRATION
========================================================== */

if (typeof CloudSync !== "undefined") {

    CloudSync.register(

        "studyHistory",

        function () {

            return StudyHistoryStorage.load();

        },

        function (historyData) {

            if (!historyData) return;

            StudyHistoryStorage.merge(historyData);

            if (typeof StudyHistory !== "undefined") {

                StudyHistory.render();

            }

            if (typeof Dashboard !== "undefined") {

                Dashboard.refresh();

            }

        }

    );

}

