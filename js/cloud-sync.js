/* ==========================
   CLOUD SYNC MODULE
========================== */

const cloudStatus = document.getElementById("cloudStatus");
const lastSyncTime = document.getElementById("lastSyncTime");
const syncNowBtn = document.getElementById("syncNowBtn");
const restoreBtn = document.getElementById("restoreBtn");
const autoSyncToggle = document.getElementById("autoSyncToggle");


/* =====================================
   CLOUD SYNC ENGINE
===================================== */

const CloudSync = {

    modules: {},

    register(name, saveFunction, restoreFunction) {

        this.modules[name] = {
            save: saveFunction,
            restore: restoreFunction
        };

    }

};

window.CloudSync = CloudSync;

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

    Storage.save("lastSync", text);

}

/* ---------- Load Last Sync ---------- */

function loadLastSync() {

    const saved = Storage.load("lastSync");

    if (saved && lastSyncTime) {
        lastSyncTime.textContent = "Last Sync : " + saved;
    }

}

/* ---------- Auto Sync ---------- */

function saveAutoSync() {

    Storage.save(
    "autoSync",
    autoSyncToggle.checked
);
   

}

function loadAutoSync() {

    const value =
    Storage.load("autoSync");

    if (value !== null) {

        autoSyncToggle.checked = Boolean(value);

    }

}

/* ---------- Button Events ---------- */

function initCloudSync() {

    loadLastSync();

    loadAutoSync();

    if (syncNowBtn) {

        syncNowBtn.onclick = function () {

    CloudSync.syncAll();

};

    }

    if (restoreBtn) {

        restoreBtn.onclick = function () {

    CloudSync.restoreAll();

};

    }

    if (autoSyncToggle) {

        autoSyncToggle.onchange =
            saveAutoSync;

    }

}


/* =====================================
   GENERIC CLOUD FUNCTIONS
===================================== */

CloudSync.syncAll = async function () {

    if (!auth.currentUser) {

        showToast("Please login first.", "error");
        return;

    }

    updateCloudStatus("Syncing...", "🔄");

    try {

        const cloudData = {};

        for (const module in this.modules) {

            cloudData[module] =
                this.modules[module].save();

        }

        cloudData.cloud = {

            lastSync: firebase.firestore.FieldValue.serverTimestamp(),
            version: 1

        };

        await db
            .collection("users")
            .doc(auth.currentUser.uid)
            .set(cloudData, { merge: true });

        updateCloudStatus("Synced", "🟢");

        updateLastSync();

        showToast("Cloud Sync Complete", "success");

    } catch (e) {

        console.error(e);

        updateCloudStatus("Failed", "🔴");

        showToast("Cloud Sync Failed", "error");

    }

};

CloudSync.restoreAll = async function () {

    if (!auth.currentUser) return;

    try {

        const snapshot =
            await db
                .collection("users")
                .doc(auth.currentUser.uid)
                .get();

        if (!snapshot.exists) return;

        const data = snapshot.data();

        for (const module in this.modules) {

    if (data[module]) {

        showToast(
            "Restoring: " + module,
            "success"
        );

        this.modules[module].restore(
            data[module]
        );

    } else {

        showToast(
            "Missing: " + module,
            "warning"
        );

    }

}

        showToast(
            "Cloud Restore Complete",
            "success"
        );

    } catch (e) {

        console.error(e);

        showToast(
            "Restore Failed",
            "error"
        );

    }

};

/* ---------- Export ---------- */

window.initCloudSync =
    initCloudSync;
