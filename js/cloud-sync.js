/* ==========================
   CLOUD SYNC MODULE
========================== */

const cloudStatus = document.getElementById("cloudStatus");
const lastSyncTime = document.getElementById("lastSyncTime");
const syncNowBtn = document.getElementById("syncNowBtn");
const restoreBtn = document.getElementById("restoreBtn");
const autoSyncToggle = document.getElementById("autoSyncToggle");

/* ---------- Update Status ---------- */

function updateCloudStatus(status, color = "🟢") {

    if (cloudStatus) {
        cloudStatus.textContent = status;
    }

    const icon = document.getElementById("syncStatusIcon");

    if (icon) {
        icon.textContent = color;
    }

}

/* ---------- Update Time ---------- */

function updateLastSync() {

    const now = new Date();

    const text =
        now.toLocaleDateString() +
        " • " +
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    if (lastSyncTime) {
        lastSyncTime.textContent = "Last Sync : " + text;
    }

    localStorage.setItem("lastSync", text);

}

/* ---------- Load Last Sync ---------- */

function loadLastSync() {

    const saved = localStorage.getItem("lastSync");

    if (saved && lastSyncTime) {
        lastSyncTime.textContent = "Last Sync : " + saved;
    }

}

/* ---------- Auto Sync ---------- */

function saveAutoSync() {

    localStorage.setItem(
        "autoSync",
        autoSyncToggle.checked
    );

}

function loadAutoSync() {

    const value =
        localStorage.getItem("autoSync");

    if (value !== null) {

        autoSyncToggle.checked =
            value === "true";

    }

}

/* ---------- Button Events ---------- */

function initCloudSync() {

    loadLastSync();

    loadAutoSync();

    if (syncNowBtn) {

        syncNowBtn.onclick = function () {

            updateCloudStatus(
                "Syncing...",
                "🔄"
            );

            setTimeout(function () {

                updateCloudStatus(
                    "Synced",
                    "🟢"
                );

                updateLastSync();

                showToast(
                    "Cloud Sync Complete",
                    "success"
                );

            }, 1200);

        };

    }

    if (restoreBtn) {

        restoreBtn.onclick = function () {

            showToast(
                "Restore module coming soon.",
                "info"
            );

        };

    }

    if (autoSyncToggle) {

        autoSyncToggle.onchange =
            saveAutoSync;

    }

}

/* ---------- Export ---------- */

window.initCloudSync =
    initCloudSync;
