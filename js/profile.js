/* ==========================================================
   Study Profile Module
   Version: 1.0
   Storage: localStorage
   (Firestore integration will be added later)
========================================================== */

(function () {
    "use strict";

    // ==========================
    // Storage Key
    // ==========================

    const STORAGE_KEY = "studyProfile";

    // ==========================
    // Element IDs
    // ==========================

    const fields = [
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

    // ==========================
    // Helpers
    // ==========================

    function $(id) {
        return document.getElementById(id);
    }

    // ==========================
    // Collect Data
    // ==========================

    function getProfileData() {

        return {

            examCategory: $("examCategory")?.value || "",

            examName: $("examName")?.value.trim() || "",

            examDate: $("examDate")?.value || "",

            attemptNumber: $("attemptNumber")?.value || "",

            targetRank: $("targetRank")?.value || "",

            studyGoal: $("studyGoal")?.value || "",

            mcqGoal: $("mcqGoal")?.value || "",

            revisionGoal: $("revisionGoal")?.value || "",

            pomodoroStudy: $("pomodoroStudy")?.value || "",

            shortBreak: $("shortBreak")?.value || "",

            longBreak: $("longBreak")?.value || "",

            autoStart: $("autoStart")?.checked || false,

            theme: $("theme")?.value || "Dark",

            accentColor: $("accentColor")?.value || "#2563eb"

        };

    }

    // ==========================
    // Fill Form
    // ==========================

    function fillProfile(data) {

        if (!data) return;

        fields.forEach(id => {

            const element = $(id);

            if (element && data[id] !== undefined) {

                element.value = data[id];

            }

        });

        if ($("autoStart")) {

            $("autoStart").checked =
                data.autoStart || false;

        }

    }

    // ==========================
    // Validation
    // ==========================

    function validateProfile(profile) {

        if (!profile.examCategory) {

            showToast("Please select Exam Category", "warning");

            return false;

        }

        if (!profile.examName) {

            showToast("Please enter Exam Name", "warning");

            return false;

        }

        if (!profile.examDate) {

            showToast("Please select Exam Date", "warning");

            return false;

        }

        return true;

    }

    // ==========================
    // Save
    // ==========================

    function saveProfile() {

        const profile = getProfileData();

        if (!validateProfile(profile)) {

            return;

        }

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(profile)

        );

        showToast("Study Profile Saved Successfully", "success");

    }

    // ==========================
    // Load
    // ==========================

    function loadProfile() {

        const saved = localStorage.getItem(

            STORAGE_KEY

        );

        if (!saved) return;

        try {

            const profile = JSON.parse(saved);

            fillProfile(profile);

        }

        catch (e) {

            console.error(e);

        }

    }

    // ==========================
    // Reset
    // ==========================

    function resetProfile() {

        localStorage.removeItem(STORAGE_KEY);

        location.reload();

    }

    // ==========================
    // Events
    // ==========================

    function registerEvents() {

        const saveButton = $("saveProfileBtn");

        if (saveButton) {

            saveButton.addEventListener(

                "click",

                saveProfile

            );

        }

    }

    // ==========================
    // Init
    // ==========================

    document.addEventListener(

        "DOMContentLoaded",

        function () {

            loadProfile();

            registerEvents();

        }

    );

    // ==========================
    // Public Functions
    // ==========================

    window.ProfileModule = {

        save: saveProfile,

        load: loadProfile,

        reset: resetProfile,

        getData: getProfileData

    };

})();
