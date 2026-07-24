"use strict";

const StudyEvents = {

    listeners: {},

    on(event, callback) {

        if (!this.listeners[event]) {

            this.listeners[event] = [];

        }

        this.listeners[event].push(callback);

    },

    emit(event, data = null) {

        if (!this.listeners[event]) {

            return;

        }

        this.listeners[event].forEach(callback => {

            callback(data);

        });

    }

};
