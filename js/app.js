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


      // Existing code to hide/show pages

    if (pageId === "profilePage") {

        initProfileButtons();

    }
// Cloud Sync Function is here 
       if (
    pageId === "cloudSyncPage" &&
    typeof initCloudSync === "function"
) {
    initCloudSync();
}
       // upper is the cloud sync function

       
        pages.forEach((page) => {
            page.classList.add("hidden");
        });

        const currentPage = document.getElementById(pageId);

        if (currentPage) {
            currentPage.classList.remove("hidden");
        }

       // Re-bind Profile buttons every time Profile page opens

         if (pageId === "profilePage" && typeof initProfileButtons === "function") {

          initProfileButtons();

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

   // Initialize Planner
   PlannerEngine.init();

     // Initialize Planner UI
   PlannerUI.init();

    // Keep app hidden until Welcome Module allows it
    hideMainApp();

});
