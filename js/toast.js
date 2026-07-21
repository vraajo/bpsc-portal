/* =====================================================
   Premium Toast Notification
   Version 1.0
===================================================== */

(function () {

    "use strict";

    function showToast(message, type = "success") {

        const oldToast = document.querySelector(".vr-toast");

        if (oldToast) {
            oldToast.remove();
        }

        const toast = document.createElement("div");

        toast.className = "vr-toast " + type;

        let icon = "✓";

        if (type === "error") icon = "✕";

        if (type === "warning") icon = "⚠";

        if (type === "info") icon = "ℹ";

        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-text">${message}</span>
        `;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add("show");
        });

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => {

                toast.remove();

            }, 350);

        }, 2500);

    }

    window.showToast = showToast;

})();
