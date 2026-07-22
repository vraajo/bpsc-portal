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

    render() {

        // Will build in next step

    }

};
