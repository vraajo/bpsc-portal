/* ==========================================
   Home Engine
========================================== */

"use strict";

const HomeEngine = {

    data: null,
   interval: null,

    init() {

        this.data = HomeStorage.load();

    },

    save() {

        HomeStorage.save(this.data);

    },

    getData() {

        return this.data;

    },

    refresh() {

        this.data = HomeStorage.load();

    },

   startTimer() {

    if (this.data.timerState === "running") {

        return;

    }

    this.data.timerState = "running";

    this.data.sessionStartTime = Date.now();

    this.startTicker();

    this.save();

},

pauseTimer() {

    if (this.data.timerState !== "running") {

        return;

    }

    clearInterval(this.interval);

    this.interval = null;

    this.data.timerState = "paused";

    this.data.pausedAt = Date.now();

    this.save();

},

resumeTimer() {

    if (this.data.timerState !== "paused") {

        return;

    }

    this.data.timerState = "running";

    this.data.sessionStartTime =

        Date.now() -

        this.data.currentSessionSeconds * 1000;

    this.startTicker();

    this.save();

},

   startTicker() {

    clearInterval(this.interval);

    this.interval = setInterval(() => {

        this.data.currentSessionSeconds = Math.floor(

            (Date.now() -

            this.data.sessionStartTime) / 1000

        );

        this.save();

    },1000);

},

   stopTimer() {

    if (this.data.timerState === "ready") {

        return;

    }

    if (this.data.timerState === "running") {

        this.data.currentSessionSeconds = this.getCurrentSessionSeconds();

    }

    this.data.todayStudySeconds += this.data.currentSessionSeconds;

    this.data.currentSessionSeconds = 0;

    this.data.timerState = "ready";

    this.data.sessionStartTime = null;

    this.data.pausedAt = null;

    this.save();

},

   getCurrentSessionSeconds() {

    if (this.data.timerState === "running") {

        return Math.floor(

            (Date.now() - this.data.sessionStartTime) / 1000

        );

    }

    return this.data.currentSessionSeconds;

}

};
