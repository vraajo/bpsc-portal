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

    }

};

window.StudyHistoryStorage = StudyHistoryStorage;
