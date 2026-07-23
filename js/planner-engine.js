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

    /* ==========================================
       Add Subject
       ========================================== */

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

    /* ==========================================
       Add Topic
       ========================================== */

    addTopic(subjectId, topicTitle) {

        const subject = this.planner.subjects.find(function (item) {

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

    },

     /* ==========================================
   Delete Topic
   ========================================== */

deleteTopic(subjectId, topicId) {

    const subject = this.planner.subjects.find(function(item) {

        return item.id === subjectId;

    });

    if (!subject) {

        return;

    }

    subject.topics = subject.topics.filter(function(topic) {

        return topic.id !== topicId;

    });

    subject.completed = false;

    this.save();

},

   /* ==========================================
   Delete Subject
   ========================================== */

deleteSubject(subjectId) {

    this.planner.subjects =
        this.planner.subjects.filter(function(subject) {

            return subject.id !== subjectId;

        });

    this.save();

},

   /* ==========================================
   Edit Subject
   ========================================== */

editSubject(subjectId, newTitle) {

    const subject = this.planner.subjects.find(function(subject) {

        return subject.id === subjectId;

    });

    if (!subject) {

        return;

    }

    subject.title = newTitle.trim();

    this.save();

},

    /* ==========================================
       Toggle Topic
       ========================================== */

    toggleTopic(subjectId, topicId) {

        const subject = this.planner.subjects.find(function (item) {

            return item.id === subjectId;

        });

        if (!subject) {

            return;

        }

        const topic = subject.topics.find(function (item) {

            return item.id === topicId;

        });

        if (!topic) {

            return;

        }

        if (!topic.completed) {

    topic.completed = true;

    topic.completedDate =
        new Date().toISOString().split("T")[0];

} else {

    topic.completed = false;

    delete topic.completedDate;

}

        subject.completed = subject.topics.every(function (item) {

            return item.completed;

        });

        this.save();

    }

};
