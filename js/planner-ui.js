/* ==========================================
   Planner UI
========================================== */

"use strict";

const PlannerUI = {

    init() {

        this.bindEvents();

    },

    bindEvents() {

        const addButton =
            document.getElementById("addSubjectBtn");

        if (!addButton) return;

        addButton.addEventListener("click", () => {

            this.openSubjectModal();

        });

    },

    openSubjectModal() {

        const subject = prompt(
            "Enter Subject Name"
        );

        if (!subject) return;

        const topic = prompt(
            "Enter First Topic"
        );

        if (!topic) return;

        PlannerEngine.addSubject(subject, topic);

        showToast(
            "Subject Added",
            "success"
        );

        this.render();

    },


   //render art added in second time

    render() {

    const container =
        document.getElementById("plannerContainer");

    if (!container) return;

    const planner =
        PlannerEngine.getPlanner();

    if (
        !planner ||
        planner.subjects.length === 0
    ) {

        container.innerHTML = `

        <div class="plannerEmpty">

            <div class="plannerIcon">📚</div>

            <h3>No Study Plan Yet</h3>

            <p>Add your first subject to begin today's mission.</p>

            <button
                class="primary-btn"
                id="addSubjectBtn">

                + Add Subject

            </button>

        </div>

        `;

        this.bindEvents();

        return;

    }

    let html = "";

    planner.subjects.forEach(subject => {

        html += `

        <div class="planner-card">

            <div class="planner-title">

                ${subject.title}

            </div>

            <div class="planner-topics">

                ${subject.topics.map(topic => `

                    <div class="planner-topic">

                        ☐ ${topic.title}

                    </div>

                `).join("")}

            </div>

            <button
                class="primary-btn addTopicBtn"
                data-id="${subject.id}">

                + Add Topic

            </button>

        </div>

        `;

    });

    html += `

    <button
        class="primary-btn"
        id="addSubjectBtn">

        + Add Subject

    </button>

    `;

    container.innerHTML = html;

    this.bindEvents();

}

};
