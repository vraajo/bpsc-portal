/* =====================================
   Welcome Module
===================================== */

const splashScreen = document.getElementById("splashScreen");
const welcomeScreen = document.getElementById("welcomeScreen");
const app = document.getElementById("app");

const guestBtn = document.getElementById("guestStartBtn");
const googleBtn = document.getElementById("googleStartBtn");

let authResolved = false;
let splashFinished = false;

/* ==========================
   Splash Finished
========================== */

setTimeout(() => {

    splashFinished = true;

    decideNextScreen();

}, 2500);

/* ==========================
   Decide Screen
========================== */

function decideNextScreen() {

    if (!splashFinished || !authResolved) return;

    if (auth.currentUser) {

        showApp();

    } else if (localStorage.getItem("guestMode") === "true") {

        showApp();

    } else {

        showLanding();

    }

}

/* ==========================
   Show Landing
========================== */

function showLanding() {

    splashScreen.classList.remove("active");

    welcomeScreen.classList.add("active");

    if (typeof hideMainApp === "function") {
        hideMainApp();
    }

}

/* ==========================
   Show App
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
   Guest
========================== */

function enterGuestMode() {

    localStorage.setItem("guestMode", "true");

    showApp();

}

/* ==========================
   Buttons
========================== */

if (guestBtn) {

    guestBtn.addEventListener("click", enterGuestMode);

}

if (googleBtn) {

    googleBtn.addEventListener("click", () => {

        if (typeof login === "function") {

            login();

        }

    });

}

/* ==========================
   Called by auth.js
========================== */

function welcomeAuthenticated() {

    authResolved = true;

    localStorage.removeItem("guestMode");

    decideNextScreen();

}

function welcomeGuest() {

    authResolved = true;

    decideNextScreen();

}
