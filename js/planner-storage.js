/* ==========================================
   Planner Storage Module
   ========================================== */

const PlannerStorage = {

    KEY: "planner_data",

    createEmptyPlanner() {

        return {
            date: this.getToday(),

            subjects: [],

            lastUpdated: Date.now()
        };

    },

    save(data) {

        data.lastUpdated = Date.now();

        Storage.save(this.KEY, data);

    },

    load() {

        let data = Storage.load(this.KEY);

        if (!data) {

            data = this.createEmptyPlanner();

            this.save(data);

        }

        // Auto reset on new day
        if (data.date !== this.getToday()) {

            data = this.createEmptyPlanner();

            this.save(data);

        }

        return data;

    },

    clear() {

        Storage.save(this.KEY, this.createEmptyPlanner());

    },

    getToday() {

        const today = new Date();

        return today.getFullYear() + "-" +
               String(today.getMonth() + 1).padStart(2, "0") + "-" +
               String(today.getDate()).padStart(2, "0");

    }

};
