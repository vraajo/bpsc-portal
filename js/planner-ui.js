/* ==========================================
   Planner UI
========================================== */

"use strict";

const PlannerUI = {

    selectedSubjectId:null,
    modalMode: "",
    selectedTopicSubject: null,

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

        this.openTopicModal(

            button.dataset.id

        );

    });

});

       // delete topic block

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

//delete subject block
       
       document
.querySelectorAll(".deleteSubjectBtn")
.forEach(button => {

    button.addEventListener("click", () => {

        const ok = confirm(
            "Delete this subject and all topics?"
        );

        if (!ok) return;

        PlannerEngine.deleteSubject(

            button.dataset.id

        );

        this.render();

        showToast(
            "Subject Deleted",
            "success"
        );

    });

});

       //edit subject block

       document
.querySelectorAll(".editSubjectBtn")
.forEach(button => {

    button.addEventListener("click", () => {

        const title = prompt(
            "Rename Subject"
        );

        if (!title) return;

        PlannerEngine.editSubject(

            button.dataset.id,

            title

        );

        this.render();

        showToast(
            "Subject Updated",
            "success"
        );

    });

});

       //Open Subject Menu 

       document
.querySelectorAll(".subjectMenuBtn")
.forEach(button => {

    button.onclick = () => {

        this.openSubjectMenu(button);

    };

});
       

},

   // new function bindSubjectMenu



   
   //above is the new code 


    openSubjectModal(subjectId) {

        this.modalMode = "topic";

    this.selectedTopicSubject = subjectId;

    const modal =
        document.getElementById("plannerModal");

    document.getElementById(
        "plannerModalTitle"
    ).textContent = "Add Subject";

    document.getElementById(
        "plannerSubjectInput"
    ).value = "";

    document.getElementById(
        "plannerTopicInput"
    ).value = "";

    document.getElementById(
        "plannerTopicField"
    ).style.display = "flex";

    modal.classList.remove("hidden");

    document
        .getElementById("plannerSubjectInput")
        .focus();

},

   closeModal() {

    document
        .getElementById("plannerModal")
        .classList.add("hidden");

},

   openSubjectMenu(button) {

    const menu = document.getElementById("subjectMenu");

    this.selectedSubjectId = button.dataset.id;

    const rect = button.getBoundingClientRect();

    menu.style.top = (rect.bottom + 8) + "px";

    menu.style.left = (rect.right - 210) + "px";

    menu.classList.remove("hidden");

},

   closeSubjectMenu() {

    document
        .getElementById("subjectMenu")
        .classList.add("hidden");

},

   /*=========================================
   bind modals function
   ==========================================*/

   bindModal() {

    const cancel =
        document.getElementById("plannerCancelBtn");

    const save =
        document.getElementById("plannerSaveBtn");

    if (cancel) {

        cancel.onclick = () => {

            this.closeModal();

        };

    }

if (save) {

    save.onclick = () => {

        if (this.modalMode === "subject") {

            const subject = document
                .getElementById("plannerSubjectInput")
                .value
                .trim();

            const topic = document
                .getElementById("plannerTopicInput")
                .value
                .trim();

            if (!subject || !topic) {

                showToast(
                    "Please fill all fields",
                    "warning"
                );

                return;

            }

            PlannerEngine.addSubject(
                subject,
                topic
            );

            this.closeModal();

            this.render();

            showToast(
                "Subject Added",
                "success"
            );

            return;

        }

        if (this.modalMode === "topic") {

            const topic = document
                .getElementById("plannerSubjectInput")
                .value
                .trim();

            if (!topic) {

                showToast(
                    "Enter topic name",
                    "warning"
                );

                return;

            }

            PlannerEngine.addTopic(

                this.selectedTopicSubject,

                topic

            );

            this.closeModal();

            this.render();

            showToast(
                "Topic Added",
                "success"
            );

            return;

        }

    };

}

},


   // new bind function below

   bindSubjectMenu() {

    const rename =
        document.getElementById("renameSubjectBtn");

    if (rename) {

        rename.onclick = () => {

            this.closeSubjectMenu();

            const title = prompt(
                "Rename Subject"
            );

            if (!title) return;

            PlannerEngine.editSubject(

                this.selectedSubjectId,

                title

            );

            this.render();

            showToast(
                "Subject Updated",
                "success"
            );

        };

    }

      //delete sybject block 

      const remove =
    document.getElementById("removeSubjectBtn");

if (remove) {

    remove.onclick = () => {

        this.closeSubjectMenu();

        const ok = confirm(
            "Delete this subject and all topics?"
        );

        if (!ok) return;

        PlannerEngine.deleteSubject(
            this.selectedSubjectId
        );

        this.render();

        showToast(
            "Subject Deleted",
            "success"
        );

    };

}

      document.onclick = (event) => {

    const menu =
        document.getElementById("subjectMenu");

    if (!menu) return;

    if (
        !menu.contains(event.target) &&
        !event.target.closest(".subjectMenuBtn")
    ) {

        this.closeSubjectMenu();

    }

};

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
        this.bindModal();

        return;

    }

    let html = "";

    planner.subjects.forEach(subject => {

        html += `

        <div class="planner-card">

    <div class="planner-card-header">

    <div class="planner-card-info">

        <h3 class="planner-subject">

            ${subject.title}

        </h3>

        <p class="planner-count">

            ${subject.topics.length}
            Topic${subject.topics.length !== 1 ? "s" : ""}

        </p>

    </div>

    <button
        class="subjectMenuBtn"
        data-id="${subject.id}">

        ⋮

    </button>

</div>

<div class="planner-divider"></div>

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
    this.bindModal();
    this.bindSubjectMenu();

}

};
