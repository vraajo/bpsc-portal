/* ==========================================
   Planner Engine
   ========================================== */

const PlannerEngine = {

    planner: null,

    init() {

        this.planner = PlannerStorage.load();

    },

    getPlanner() {

        return this.planner;

    },

    save() {

        PlannerStorage.save(this.planner);

    },

    addSubject(subjectName, firstTopic) {

        const subject = {

            id: crypto.randomUUID(),

            title: subjectName.trim(),

            completed: false,

            topics: [

                {

                    id: crypto.randomUUID(),

                    title: firstTopic.trim(),

                    completed: false

                }

            ]

        };

        this.planner.subjects.push(subject);

        this.save();

    }

};
