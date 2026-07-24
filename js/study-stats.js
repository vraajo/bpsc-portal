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

};
