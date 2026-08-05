/* ==========================================
   Quote Engine
========================================== */

"use strict";

const QuoteEngine = {

    getQuoteOfTheDay() {

        const today = new Date();

        const dayNumber = Math.floor(
            today.getTime() / 86400000
        );

        const quotes = QuoteStorage.quotes;

        return quotes[
            dayNumber % quotes.length
        ];

    }

};
