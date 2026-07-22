/* =====================================
   STORAGE MODULE
===================================== */

const Storage = {

    save(key, value) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

            return true;

        } catch (e) {

            console.error("Storage Save Error", e);

            return false;

        }

    },

    load(key, defaultValue = null) {

        try {

            const data = localStorage.getItem(key);

            if (!data) return defaultValue;

            return JSON.parse(data);

        } catch (e) {

            console.error("Storage Load Error", e);

            return defaultValue;

        }

    },

    remove(key) {

        localStorage.removeItem(key);

    },

    exists(key) {

        return localStorage.getItem(key) !== null;

    },

    clear() {

        localStorage.clear();

    }

};

window.Storage = Storage;
