/* =====================================
   Welcome Module
===================================== */

const splashScreen = document.getElementById("splashScreen");
const welcomeScreen = document.getElementById("welcomeScreen");
const app = document.getElementById("app");

const guestBtn = document.getElementById("guestStartBtn");
const googleBtn = document.getElementById("googleStartBtn");

let authChecked = false;

/* ==========================
   Show Main Website
========================== */

function showApp() {

    splashScreen.classList.remove("active");

    welcomeScreen.classList.remove("active");

    if (typeof showMainApp === "function") {

        showMainApp();

    } else {

        app.style.display = "block";

    }

}

/* ==========================
   Show Landing Page
========================== */
function showLanding() {

    if (typeof hideMainApp === "function") {

        hideMainApp();

    }

    splashScreen.classList.remove("active");

    welcomeScreen.classList.add("active");

}


/* ==========================
   Guest Mode
========================== */

function enterGuestMode() {

    localStorage.setItem("guestMode", "true");

    showApp();

}

/* ==========================
   Google Login
========================== */

if (googleBtn) {

    googleBtn.addEventListener("click", function () {

        if (typeof login === "function") {

            login();

        }

    });

}

/* ==========================
   Guest Login
========================== */

if (guestBtn) {

    guestBtn.addEventListener("click", enterGuestMode);

}

/* ==========================
   Startup
========================== */

window.addEventListener("load", function () {

    setTimeout(function () {

        if (!authChecked) {

            if (localStorage.getItem("guestMode") === "true") {

                showApp();

            } else {

                showLanding();

            }

        }

    }, 2500);

});

/* ==========================
   Called by auth.js
========================== */

function welcomeAuthenticated() {

    authChecked = true;

    localStorage.removeItem("guestMode");

    showApp();

}

function welcomeGuest() {

    authChecked = true;

    if (localStorage.getItem("guestMode") === "true") {

        showApp();

    } else {

        showLanding();

    }

}
