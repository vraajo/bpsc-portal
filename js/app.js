/* ======================================
   BPSC Portal - app.js
====================================== */

/* ======================================
   App Visibility Controller
====================================== */

const appContainer = document.getElementById("app");

function showMainApp() {

    if (appContainer) {
        appContainer.style.display = "block";

requestAnimationFrame(() => {

    appContainer.classList.add("show");

});
    }

}

function hideMainApp() {

    if (appContainer) {
        appContainer.classList.remove("show");

setTimeout(() => {

    appContainer.style.display = "none";

},300);
    }

}

/* ======================================
   Navigation
====================================== */

document.addEventListener("DOMContentLoaded", () => {

    const pages = document.querySelectorAll("main section");
    const navButtons = document.querySelectorAll(".bottomNav button");

    function showPage(pageId) {

        pages.forEach((page) => {
            page.classList.add("hidden");
        });

        const currentPage = document.getElementById(pageId);

        if (currentPage) {
            currentPage.classList.remove("hidden");
        }

        navButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        const activeButton = document.querySelector(
            `.bottomNav button[data-page="${pageId}"]`
        );

        if (activeButton) {
            activeButton.classList.add("active");
        }

    }

    // Make available to other JS files
    window.showPage = showPage;

    navButtons.forEach((btn) => {

        btn.addEventListener("click", () => {

            showPage(btn.dataset.page);

        });

    });

    // Default page after entering the app
    showPage("homePage");

    // Keep app hidden until Welcome Module allows it
    hideMainApp();

});
