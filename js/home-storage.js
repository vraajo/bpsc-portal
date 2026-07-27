/* ==========================================
   Home Storage
========================================== */

"use strict";

const HomeStorage = {

    STORAGE_KEY: "bpsc-home-data",

    getToday() {

        return new Date().toISOString().split("T")[0];

    },

    defaultData() {

        return {

            date: this.getToday(),

            todayStudySeconds: 0,

            currentSessionSeconds: 0,

            timerState: "ready",

            sessionStartTime: null,

            pausedAt: null

            studySessions: []

        };

    },

    load() {

        try {

            const saved =
                localStorage.getItem(this.STORAGE_KEY);

            if (!saved) {

                return this.defaultData();

            }

            const data = JSON.parse(saved);

            if (data.date !== this.getToday()) {

                return this.defaultData();

            }

            return {

                ...this.defaultData(),

                ...data

            };

        } catch (e) {

            console.error(
                "HomeStorage Load Error",
                e
            );

            return this.defaultData();

        }

    },

    save(data) {

        try {

            localStorage.setItem(

                this.STORAGE_KEY,

                JSON.stringify(data)

            );

        } catch (e) {

            console.error(

                "HomeStorage Save Error",

                e

            );

        }

    },

    reset() {

        const data = this.defaultData();

        this.save(data);

        return data;

    }

};
