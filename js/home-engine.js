/* ==========================================
   Home Engine
========================================== */

"use strict";

const HomeEngine = {

    data: null,

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

    }

};
