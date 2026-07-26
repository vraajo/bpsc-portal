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

    if (
    !planner ||
    !planner.subjects ||
    planner.subjects.length === 0
) {

    return false;

}

    const data = this.load();

    const now = Date.now();

      const today = new Date(now)
    .toISOString()
    .split("T")[0];

const existingRecord = data.history.find(record => {

    return (
        new Date(record.archivedAt)
            .toISOString()
            .split("T")[0] === today
    );

});


      

if (existingRecord) {

    planner.subjects.forEach(newSubject => {

        let existingSubject = existingRecord.subjects.find(subject => {

            return subject.title === newSubject.title;

        });

        if (!existingSubject) {

            existingRecord.subjects.push(
                structuredClone(newSubject)
            );

            return;

        }

        newSubject.topics.forEach(newTopic => {

            let existingTopic = existingSubject.topics.find(topic => {

                return topic.title === newTopic.title;

            });

            if (!existingTopic) {

                existingSubject.topics.push(
                    structuredClone(newTopic)
                );

                return;

            }

            if (newTopic.completed) {

                existingTopic.completed = true;

            }

        });

    });

    existingRecord.updatedAt = now;

    this.save(data);

    return existingRecord;

}
      

const snapshot = {

    id: crypto.randomUUID(),

    date: planner.date,

    archivedAt: now,

    updatedAt: now,

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

},

merge(cloudData) {

    if (
        !cloudData ||
        !Array.isArray(cloudData.history)
    ) {
        return;
    }

    const localData = this.load();

    const existingIds = new Set(
        localData.history.map(record => record.id)
    );

    cloudData.history.forEach(record => {

        if (!existingIds.has(record.id)) {

            localData.history.push(record);

        }

    });

    localData.history.sort((a, b) => {

        return b.archivedAt - a.archivedAt;

    });

    this.save(localData);

},

};

window.StudyHistoryStorage = StudyHistoryStorage;
