/* ======================================
   BPSC Portal - app.js
====================================== */

document.addEventListener("DOMContentLoaded", () => {

    const pages = document.querySelectorAll("main section");
    const navButtons = document.querySelectorAll(".bottomNav button");

    function showPage(pageId){

        pages.forEach(page=>{
            page.classList.add("hidden");
        });

        document.getElementById(pageId).classList.remove("hidden");

        navButtons.forEach(btn=>{
            btn.classList.remove("active");
        });

        document
            .querySelector(`[data-page="${pageId}"]`)
            .classList.add("active");

    }

    navButtons.forEach(btn=>{

        btn.addEventListener("click",()=>{

            showPage(btn.dataset.page);

        });

    });

    showPage("homePage");

});
