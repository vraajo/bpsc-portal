/* ==========================================================
   BPSC Portal
   Study Profile Module
   Version : 2.0
   Storage : Firestore + Local Storage
   Author  : VRaaj
========================================================== */

"use strict";

/* ==========================================================
   CONFIGURATION
========================================================== */

const PROFILE_COLLECTION = "users";
const PROFILE_KEY = "studyProfile";

/* ==========================================================
   DOM HELPERS
========================================================== */

function $(id) {
    return document.getElementById(id);
}

/* ==========================================================
   ALL INPUT FIELDS
========================================================== */

const profileFields = [

    "examCategory",

    "examName",

    "examDate",

    "attemptNumber",

    "targetRank",

    "studyGoal",

    "mcqGoal",

    "revisionGoal",

    "pomodoroStudy",

    "shortBreak",

    "longBreak",

    "theme",

    "accentColor"

];

/* ==========================================================
   CURRENT USER
========================================================== */

function currentUser() {

    return auth.currentUser;

}

/* ==========================================================
   GUEST MODE
========================================================== */

function isGuestMode() {

    return currentUser() == null;

}

/* ==========================================================
   PROFILE OBJECT
========================================================== */

function collectProfile() {

    return {

        examCategory:
            $("examCategory")?.value || "",

        examName:
            $("examName")?.value.trim() || "",

        examDate:
            $("examDate")?.value || "",

        attemptNumber:
            $("attemptNumber")?.value || "",

        targetRank:
            $("targetRank")?.value || "",

        studyGoal:
            $("studyGoal")?.value || "",

        mcqGoal:
            $("mcqGoal")?.value || "",

        revisionGoal:
            $("revisionGoal")?.value || "",

        pomodoroStudy:
            $("pomodoroStudy")?.value || "",

        shortBreak:
            $("shortBreak")?.value || "",

        longBreak:
            $("longBreak")?.value || "",

        autoStart:
            $("autoStart")?.checked || false,

        theme:
            $("theme")?.value || "Dark",

        accentColor:
            $("accentColor")?.value || "#2563eb",

        startDate:
    loadLocalProfile()?.startDate || Date.now(),

updatedAt:
    Date.now()

    };

}

/* ==========================================================
   FILL FORM
========================================================== */

function fillProfile(profile) {

    if (!profile) return;

    profileFields.forEach(function(id){

        if($(id) && profile[id] !== undefined){

            $(id).value = profile[id];

        }

    });

    if($("autoStart")){

        $("autoStart").checked =
            profile.autoStart || false;

    }

}

/* ==========================================================
   VALIDATION
========================================================== */

function validateProfile(profile){

    if(profile.examCategory === ""){

        showToast(
            "Please select Exam Category",
            "warning"
        );

        return false;

    }

    if(profile.examName === ""){

        showToast(
            "Please enter Exam Name",
            "warning"
        );

        return false;

    }

    if(profile.examDate === ""){

        showToast(
            "Please choose Exam Date",
            "warning"
        );

        return false;

    }

    return true;

}

/* ==========================================================
   LOCAL STORAGE
========================================================== */

function saveLocalProfile(profile) {

    return Storage.save(PROFILE_KEY, profile);

}

function loadLocalProfile() {

    return Storage.load(PROFILE_KEY);

}

/* ==========================================================
   FIRESTORE SAVE
========================================================== */

async function saveCloudProfile(profile) {

    const user = currentUser();

    if (!user) {

        return false;

    }

    try {

        await db

            .collection(PROFILE_COLLECTION)

            .doc(user.uid)

            .set({

                profile: profile

            }, {

                merge: true

            });

        return true;

    }

    catch (error) {

        console.error(error);

        showToast(

            "Cloud Sync Failed",

            "error"

        );

        return false;

    }

}

/* ==========================================================
   FIRESTORE LOAD
========================================================== */

async function loadCloudProfile() {

    const user = currentUser();

    if (!user) {

        return null;

    }

    try {

        const doc = await db

            .collection(PROFILE_COLLECTION)

            .doc(user.uid)

            .get();

        if (!doc.exists) {

            return null;

        }

        const data = doc.data();

        if (!data.profile) {

            return null;

        }

        return data.profile;

    }

    catch (error) {

        console.error(error);

        return null;

    }

}

/* ==========================================================
   SMART SAVE
========================================================== */

async function saveProfile() {

    const profile = collectProfile();

    if (!validateProfile(profile)) {

        return;

    }

    if (isGuestMode()) {

        saveLocalProfile(profile);

        showToast(

            "Profile Saved",

            "success"

        );

        return;

    }

    const ok = await saveCloudProfile(profile);

    if (ok) {

        saveLocalProfile(profile);

        showToast(

            "Profile Synced",

            "success"

        );

    }

}

/* ==========================================================
   SMART LOAD
========================================================== */

async function loadProfile() {

    let profile = null;

    // Logged-in user → Firestore first
    if (!isGuestMode()) {

        profile = await loadCloudProfile();

        if (profile) {

            fillProfile(profile);

            saveLocalProfile(profile);

            return;

        }

    }

    // Guest or no cloud profile
    profile = loadLocalProfile();

    if (profile) {

        fillProfile(profile);

    }

}

/* ==========================================================
   AUTO SAVE
========================================================== */

function enableAutoSave() {

    profileFields.forEach(function (id) {

        const element = $(id);

        if (!element) return;

        element.addEventListener("change", function () {

            saveProfile();

        });

    });

    if ($("autoStart")) {

        $("autoStart").addEventListener(

            "change",

            saveProfile

        );

    }

}

/* ==========================================================
   APPLY THEME
========================================================== */

function applyTheme() {

    const theme = $("theme")?.value || "Dark";

    document.documentElement.setAttribute(

        "data-theme",

        theme.toLowerCase()

    );

}

/* ==========================================================
   APPLY ACCENT COLOR
========================================================== */

function applyAccentColor() {

    const color = $("accentColor")?.value;

    if (!color) return;

    document.documentElement.style.setProperty(

        "--accent-color",

        color

    );

}

/* ==========================================================
   LIVE SETTINGS
========================================================== */

function enableLivePreview() {

    if ($("theme")) {

        $("theme").addEventListener(

            "change",

            applyTheme

        );

    }

    if ($("accentColor")) {

        $("accentColor").addEventListener(

            "input",

            applyAccentColor

        );

    }

}

/* ==========================================================
   SAVE BUTTON
========================================================== */

function registerButtons() {

    const button = $("saveStudyProfileBtn");

    if (!button) return;

    button.addEventListener(

        "click",

        saveProfile

    );

}

/* ==========================================================
   SYNC LOCAL PROFILE TO FIRESTORE
========================================================== */

async function syncLocalToCloud() {

    if (isGuestMode()) {

        return;

    }

    const localProfile = loadLocalProfile();

    if (!localProfile) {

        return;

    }

    const cloudProfile = await loadCloudProfile();

    // First login or no cloud data
    if (!cloudProfile) {

        await saveCloudProfile(localProfile);

        return;

    }

    // Compare timestamps
    const localTime = localProfile.updatedAt || 0;
    const cloudTime = cloudProfile.updatedAt || 0;

    if (localTime > cloudTime) {

        await saveCloudProfile(localProfile);

    }
    else {

        fillProfile(cloudProfile);

        saveLocalProfile(cloudProfile);

    }

}

/* ==========================================================
   AUTH STATE LISTENER
========================================================== */

function initializeAuthSync() {

    auth.onAuthStateChanged(async function(user){

        if(user){

            await syncLocalToCloud();

            await loadProfile();

        }
        else{

            loadProfile();

        }

    });

}

/* ==========================================================
   INITIALIZATION
========================================================== */

async function initializeProfile(){

    registerButtons();

    enableAutoSave();

    enableLivePreview();

    await loadProfile();

    applyTheme();

    applyAccentColor();

}

/* ==========================================================
   START MODULE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    async function(){

        await initializeProfile();

        initializeAuthSync();

    }

);

/* ==========================================================
   PUBLIC API
========================================================== */

window.ProfileModule = {

    save: saveProfile,

    load: loadProfile,

    getProfile: collectProfile,

    fill: fillProfile,

    sync: syncLocalToCloud,

    localSave: saveLocalProfile,

    localLoad: loadLocalProfile

};


/* ==========================================================
   CLOUD SYNC REGISTRATION
========================================================== */

if (typeof CloudSync !== "undefined") {

    CloudSync.register(

        "profile",

        function () {

            return loadLocalProfile();

        },

        function (profile) {

            fillProfile(profile);

            saveLocalProfile(profile);

            applyTheme();

            applyAccentColor();

        }

    );

}

/* ==========================================================
   END OF FILE
========================================================== */
