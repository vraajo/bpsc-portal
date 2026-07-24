/* ==========================================
   Study History Storage Module
   Version : 1.0
   Author  : VRaaj
========================================== */

"use strict";

const StudyHistoryStorage = {

    KEY: "study_history",

    createEmptyHistory() {

        return {

            history: []

        };

    },

    load() {

        let data = Storage.load(this.KEY);

        if (!data || !Array.isArray(data.history)) {

            data = this.createEmptyHistory();

            this.save(data);

        }

        return data;

    },

    save(data) {

        Storage.save(this.KEY, data);

    },

   add(planner) {

    if (!planner) {

        return false;

    }

    const data = this.load();

    const snapshot = {

        id: crypto.randomUUID(),

        date: planner.date,

        archivedAt: Date.now(),

        subjects: structuredClone(planner.subjects)

    };

    data.history.unshift(snapshot);

    this.save(data);

    return snapshot;

},

delete(historyId) {

    const data = this.load();

    data.history = data.history.filter(record => {

        return record.id !== historyId;

    });

    this.save(data);

    return data;

},

clear() {

    this.save(this.createEmptyHistory());

},

getStatistics() {

    const data = this.load();

    const totalDays = data.history.length;

    let totalSubjects = 0;
    let totalTopics = 0;
    let completedTopics = 0;

    data.history.forEach(record => {

        totalSubjects += record.subjects.length;

        record.subjects.forEach(subject => {

            totalTopics += subject.topics.length;

            completedTopics += subject.topics.filter(topic => {

                return topic.completed;

            }).length;

        });

    });

    return {

        totalDays,

        totalSubjects,

        totalTopics,

        completedTopics

    };

}

};

window.StudyHistoryStorage = StudyHistoryStorage;
