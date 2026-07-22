// ===============================
// ACCOUNT PROFILE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    initProfileNavigation();

    initProfileButtons();

});


// ===============================
// NAVIGATION
// ===============================

function initProfileNavigation() {

    document.querySelectorAll(".settings-item").forEach(item => {

        item.addEventListener("click", () => {

            const page = item.dataset.page;
            const action = item.dataset.action;

            if (page) {

                showPage(page);
                return;

            }

            switch (action) {

                case "sync":

                    showToast("Cloud Sync module coming soon.", "info");
                    break;

                case "downloads":

                    showToast("Downloads module coming soon.", "info");
                    break;

                case "appearance":

                    showToast("Appearance module coming soon.", "info");
                    break;

                case "privacy":

                    showToast("Privacy Policy coming soon.", "info");
                    break;

                case "about":

                    showToast("About page coming soon.", "info");
                    break;

            }

        });

    });

}


// ===============================
// LOGIN / LOGOUT
// ===============================
function initProfileButtons() {

    const loginBtn = document.getElementById("loginBtn");

    console.log("Login Button:", loginBtn);
    console.log("Login Function:", typeof login);

    if (loginBtn) {

        loginBtn.onclick = function () {

            console.log("Button clicked");

            login();

        };

    }

}

// ===============================
// PROFILE HELPERS
// ===============================

function setGuestMode() {
    
    const guestCard = document.getElementById("guestCard");

        if (!guestCard) return;

    document.getElementById("guestCard").style.display = "block";
    document.getElementById("userCard").style.display = "none";

    document.getElementById("profilePhoto").src =
        "https://vraajo.github.io/bpsc-portal/images/default-avatar.png";

    document.getElementById("profileName").textContent =
        "Guest User";

    document.getElementById("profileMail").textContent =
        "Not Logged In";

    document.getElementById("profileUID").textContent =
        "--";

    document.getElementById("syncStatus").textContent =
        "Guest Mode";

}


function setLoggedInUser(user) {

    const guestCard = document.getElementById("guestCard");

        if (!guestCard) return;

    document.getElementById("guestCard").style.display = "none";
    document.getElementById("userCard").style.display = "block";

    document.getElementById("profilePhoto").src =
        user.photoURL || "https://vraajo.github.io/bpsc-portal/images/default-avatar.png";

    document.getElementById("profileName").textContent =
        user.displayName || "User";

    document.getElementById("profileMail").textContent =
        user.email || "";

    document.getElementById("profileUID").textContent =
        user.uid;

    document.getElementById("syncStatus").textContent =
        "Synced with Google";

}


// ===============================
// PUBLIC API
// ===============================

window.setGuestMode = setGuestMode;

window.setLoggedInUser = setLoggedInUser;

window.initProfileButtons = initProfileButtons;
