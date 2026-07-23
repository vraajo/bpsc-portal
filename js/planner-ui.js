/* ==========================================
   Planner UI
========================================== */

"use strict";

const PlannerUI = {

    init() {

    this.render();

},

   // Bind event function 
   
    bindEvents() {

    const addButton =
        document.getElementById("addSubjectBtn");

    if (addButton) {

        addButton.addEventListener("click", () => {

            this.openSubjectModal();

        });

    }

    const topicButtons =
        document.querySelectorAll(".addTopicBtn");

    topicButtons.forEach(button => {

        button.addEventListener("click", () => {

            const topic = prompt(
                "Enter Topic Name"
            );

            if (!topic) return;

            PlannerEngine.addTopic(

                button.dataset.id,

                topic

            );

            this.render();

            showToast(
                "Topic Added",
                "success"
            );

        });

    });

       

       // Adding here new code 

       document
.querySelectorAll(".deleteTopicBtn")
.forEach(button => {

    button.addEventListener("click", () => {

        const ok = confirm(
            "Delete this topic?"
        );

        if (!ok) return;

        PlannerEngine.deleteTopic(

            button.dataset.subject,

            button.dataset.topic

        );

        this.render();

        showToast(
            "Topic Deleted",
            "success"
        );

    });

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
    !planner.subjects ||
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

    <span>

        ☐ ${topic.title}

    </span>

    <button
        class="deleteTopicBtn"
        data-subject="${subject.id}"
        data-topic="${topic.id}">

        🗑

    </button>

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
