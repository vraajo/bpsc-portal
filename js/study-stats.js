/* ==========================================================
   Study Statistics Module
   Version : 1.0
   Author  : VRaaj
========================================================== */

"use strict";

const STUDY_STATS_KEY = "studyStats";

const DEFAULT_STATS = {

    studyDays: 0,

    topicsCompleted: 0,

    revisionsCompleted: 0,

    studyMinutes: 0,

    lastStudyDate: ""

};

function loadStats() {

    return Storage.load(STUDY_STATS_KEY) || {

        ...DEFAULT_STATS

    };

}

function saveStats(stats) {

    Storage.save(STUDY_STATS_KEY, stats);

}

window.StudyStats = {

    load: loadStats,

    save: saveStats

   incrementStudyDay() {

    const stats = loadStats();

    const today = new Date()
        .toISOString()
        .split("T")[0];

    if (stats.lastStudyDate !== today) {

        stats.studyDays++;

        stats.lastStudyDate = today;

        saveStats(stats);

    }

    return stats;

},

completeTopic() {

    const stats = loadStats();

    stats.topicsCompleted++;

    saveStats(stats);

    return stats;

},

completeRevision() {

    const stats = loadStats();

    stats.revisionsCompleted++;

    saveStats(stats);

    return stats;

},

addStudyMinutes(minutes) {

    const stats = loadStats();

    const value = Number(minutes);

    if (!Number.isFinite(value) || value <= 0) {
        return stats;
    }

    stats.studyMinutes += value;

    saveStats(stats);

    return stats;

},

reset() {

    const stats = {

        ...DEFAULT_STATS

    };

    saveStats(stats);

    return stats;

}

};
