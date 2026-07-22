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

},

addTopic(subjectId, topicTitle) {

    const subject = this.planner.subjects.find(function(item) {

        return item.id === subjectId;

    });

    if (!subject) {

        return;

    }

    subject.topics.push({

        id: crypto.randomUUID(),

        title: topicTitle.trim(),

        completed: false

    });

    this.save();

}

};
