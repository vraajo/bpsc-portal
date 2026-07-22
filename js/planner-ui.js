/* ==========================================
   Planner UI
========================================== */

const PlannerUI = {

    init() {

        this.render();

    },

    render() {

        const container = document.getElementById("plannerContainer");

        if (!container) return;

        const planner = PlannerEngine.getPlanner();

        if (planner.subjects.length === 0) {

            container.innerHTML = `

                <div class="planner-empty">

                    <div class="planner-icon">📚</div>

                    <h3>No subjects added</h3>

                    <p>Plan your study for today.</p>

                    <button id="addSubjectBtn">

                        + Add Subject

                    </button>

                </div>

            `;

            document
                .getElementById("addSubjectBtn")
                .addEventListener("click", () => {

                    this.openAddSubject();

                });

            return;

        }

        let html = "";

        planner.subjects.forEach(subject => {

            html += `

                <div class="planner-card">

                    <h3>${subject.title}</h3>

                </div>

            `;

        });

        container.innerHTML = html;

    },

    openAddSubject() {

        // Modal will be built next

        alert("Add Subject Modal");

    }

};
