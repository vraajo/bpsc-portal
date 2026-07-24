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

   /* ==========================================
   Statistics Function
   ========================================== */

   getStatistics() {

    const planner = this.getPlanner();

    const totalSubjects = planner.subjects.length;

    const totalTopics = planner.subjects.reduce(
        (total, subject) => total + subject.topics.length,
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
        totalTopics === 0
        ? 0
        : Math.round(
            (completedTopics / totalTopics) * 100
        );

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    const completedToday =
        planner.subjects.reduce(

            (total, subject) => {

                return total +

                subject.topics.filter(topic => {

                    return topic.completedDate === today;

                }).length;

            },

            0

        );

            // ==========================================
// Lifetime Statistics
// ==========================================

// Number of unique study days
const studyDaySet = new Set();

planner.subjects.forEach(subject => {

    subject.topics.forEach(topic => {

        if (topic.completedDate) {

            studyDaySet.add(topic.completedDate);

        }

    });

});

const studyDays = studyDaySet.size;

// Placeholder until Pomodoro is connected
const studyHours = 0;

// Preparation information
const profile =
    typeof ProfileModule !== "undefined"
        ? ProfileModule.localLoad()
        : null;

const preparationStarted =
    profile?.startDate || "";

let daysPreparing = 0;

if (preparationStarted) {

    const start =
        new Date(preparationStarted);

    start.setHours(0,0,0,0);

    const todayDate =
        new Date();

    todayDate.setHours(0,0,0,0);

    daysPreparing = Math.max(

        0,

        Math.ceil(

            (todayDate - start) /

            (1000*60*60*24)

        )

    );

}

// Last Study
let lastStudy = "";

if (studyDaySet.size > 0) {

    const dates =
        [...studyDaySet].sort();

    lastStudy =
        dates[dates.length - 1];

}

// Current Streak (placeholder)
const currentStreak = 0;


      

    return {

    totalSubjects,

    totalTopics,

    completedTopics,

    remainingTopics,

    overallProgress,

    completedToday,

    studyDays,

    studyHours,

    preparationStarted,

    daysPreparing,

    lastStudy,

    currentStreak

};

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
