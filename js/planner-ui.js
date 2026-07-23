/* ==========================================
   Planner UI
========================================== */

"use strict";

const PlannerUI = {

    selectedSubjectId:null,
    modalMode: "",
    selectedTopicSubject: null,
    confirmAction: null,
    confirmSubjectId: null,
    confirmTopicId: null,

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

        this.confirmSubjectId =
    button.dataset.subject;

this.confirmTopicId =
    button.dataset.topic;

this.openConfirmModal(

    "Delete Topic",

    "Delete this topic?",

    "deleteTopic"

);

    });

});

       // // Topic checkbox

document
.querySelectorAll(".topicCheckbox")
.forEach(box => {

    box.addEventListener("change", () => {

        PlannerEngine.toggleTopic(

            box.dataset.subject,

            box.dataset.topic

        );

        this.render();

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


    openSubjectModal() {

    this.modalMode = "subject";

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

   openTopicModal(subjectId) {

    this.modalMode = "topic";

    this.selectedTopicSubject = subjectId;

    const modal =
        document.getElementById("plannerModal");

    document.getElementById(
        "plannerModalTitle"
    ).textContent = "Add Topic";

    document.getElementById(
        "plannerSubjectInput"
    ).value = "";

    document.getElementById(
        "plannerTopicField"
    ).style.display = "none";

    modal.classList.remove("hidden");

    document
        .getElementById("plannerSubjectInput")
        .focus();

},

   openRenameModal(subjectId, currentTitle) {

    this.modalMode = "rename";

    this.selectedSubjectId = subjectId;

    const modal =
        document.getElementById("plannerModal");

    document.getElementById(
        "plannerModalTitle"
    ).textContent = "Rename Subject";

    document.getElementById(
        "plannerSubjectInput"
    ).value = currentTitle;

    document.getElementById(
        "plannerTopicField"
    ).style.display = "none";

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

   openConfirmModal(title, message, action) {

    this.confirmAction = action;

    document.getElementById(
        "plannerConfirmTitle"
    ).textContent = title;

    document.getElementById(
        "plannerConfirmText"
    ).textContent = message;

    document
        .getElementById("plannerConfirmModal")
        .classList.remove("hidden");

},

   closeConfirmModal() {

    document
        .getElementById("plannerConfirmModal")
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
      
    const confirmCancel =
    document.getElementById("plannerConfirmCancelBtn");

    const confirmOk =
    document.getElementById("plannerConfirmOkBtn");

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

       if (this.modalMode === "rename") {

    const title = document
        .getElementById("plannerSubjectInput")
        .value
        .trim();

    if (!title) {

        showToast(
            "Enter subject name",
            "warning"
        );

        return;

    }

    PlannerEngine.editSubject(

        this.selectedSubjectId,

        title

    );

    this.closeModal();

    this.render();

    showToast(
        "Subject Updated",
        "success"
    );

    return;

}

    };

}

      if (confirmCancel) {

    confirmCancel.onclick = () => {

        this.closeConfirmModal();

    };

}

if (confirmOk) {

    confirmOk.onclick = () => {

        if (this.confirmAction === "deleteSubject") {

            PlannerEngine.deleteSubject(
                this.confirmSubjectId
            );

            showToast(
                "Subject Deleted",
                "success"
            );

        }

        if (this.confirmAction === "deleteTopic") {

            PlannerEngine.deleteTopic(
                this.confirmSubjectId,
                this.confirmTopicId
            );

            showToast(
                "Topic Deleted",
                "success"
            );

        }

        this.closeConfirmModal();

        this.render();

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

    const planner =
        PlannerEngine.getPlanner();

    const subject =
        planner.subjects.find(item => {

            return item.id === this.selectedSubjectId;

        });

    if (!subject) return;

    this.openRenameModal(

        subject.id,

        subject.title

    );

};

    }

      //delete sybject block 

      const remove =
    document.getElementById("removeSubjectBtn");

if (remove) {

    remove.onclick = () => {

        this.closeSubjectMenu();

        this.confirmSubjectId =
    this.selectedSubjectId;

this.openConfirmModal(

    "Delete Subject",

    "Delete this subject and all topics?",

    "deleteSubject"

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

       //adding new code

       const totalSubjects = planner.subjects.length;

const totalTopics = planner.subjects.reduce(

    (total, subject) => {

        return total + subject.topics.length;

    },

    0

);

const completedTopics = planner.subjects.reduce(

    (total, subject) => {

        return total +

        subject.topics.filter(topic => topic.completed).length;

    },

    0

);

const remainingTopics =

    totalTopics - completedTopics;

const overallProgress =

   
//adding below code
const today = new Date()
    .toISOString()
    .split("T")[0];

const completedToday = planner.subjects.reduce(

    (total, subject) => {

        return total +

        subject.topics.filter(topic => {

            return topic.completedDate === today;

        }).length;

    },

    0

);
   //adding above code


    totalTopics === 0

    ? 0

    : Math.round(

        (completedTopics / totalTopics) * 100

    );
       
       //above is new code

    let html = "";

       html += `

<div class="planner-summary">

    <h2>

        Planner Overview

    </h2>

    <div class="planner-summary-grid">

        <div>

            <strong>${totalSubjects}</strong>

            <span>Subjects</span>

        </div>

        <div>

            <strong>${completedTopics}</strong>

            <span>Topics Completed</span>

        </div>

        <div>

            <strong>${remainingTopics}</strong>

            <span>Topics Remaining</span>

        </div>

    </div>

    <div class="planner-progress">

        <div

            class="planner-progress-fill"

            style="width:${overallProgress}%">

        </div>

    </div>

    <div class="planner-progress-text">

        ${overallProgress}% Overall Progress

    </div>

</div>

`;

    planner.subjects.forEach(subject => {

       //added new code below

       const totalTopics = subject.topics.length;

const completedTopics = subject.topics.filter(topic => {

    return topic.completed;

}).length;

const progress = totalTopics === 0
    ? 0
    : Math.round((completedTopics / totalTopics) * 100);

       //added new code above

        html += `

     <div class="planner-card ${progress===100 ? "planner-card-complete" : ""}">

    <div class="planner-card-header">

    <div class="planner-card-info">

        <h3 class="planner-subject">

            ${subject.title}

        </h3>

        ${progress===100 ? `

<div class="planner-complete-badge">

    ✓ Completed

</div>

` : ""}

  <p class="planner-count">

    ${completedTopics} / ${totalTopics}
    Topic${totalTopics !== 1 ? "s" : ""} Completed

</p>

<div class="planner-progress">

    <div
        class="planner-progress-fill"
        style="width:${progress}%">

    </div>

</div>

<div class="planner-progress-text">

    ${progress}% Completed

</div>

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

    <label class="planner-checkbox">

        <input
            type="checkbox"
            class="topicCheckbox"
            data-subject="${subject.id}"
            data-topic="${topic.id}"
            ${topic.completed ? "checked" : ""}>

        <span class="checkmark"></span>

         <span class="topicText ${topic.completed ? "completed" : ""}">

         ${topic.title}

         </span>

    </label>

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
