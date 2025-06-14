document.addEventListener("DOMContentLoaded", function () {
    const burgerMenu = document.getElementById("burger-menu");
    const navLinks = document.querySelector(".nav-links");

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener("click", function () {
            navLinks.classList.toggle("nav-active");
        });

        document.querySelectorAll(".nav-links li a").forEach(item => {
            item.addEventListener("click", () => {
                navLinks.classList.remove("nav-active");
            });
        });
    }

    function setupStartupButton() {
        document.querySelectorAll(".contact-btn").forEach(btn => {
            btn.addEventListener("click", function (event) {
                event.preventDefault();
                console.log("Перехід на my_profile.html");
                window.location.href = "/pages/my_profile.html";
            });
        });
    }

    setupStartupButton();
    setTimeout(setupStartupButton, 500);

    const learnMoreBtn = document.querySelector(".learn-more");

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener("click", function () {
            const url = this.getAttribute("data-link");
            if (url) {
                console.log("Перехід на: " + url);
                window.location.href = url;
            }
        });
    }
});
