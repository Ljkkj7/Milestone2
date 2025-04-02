document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded!"); // Debugging

    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menulist");

    if (!menuToggle || !menu) {
        console.error("ERROR: Menu toggle or menu list not found!");
        return;
    }

    menuToggle.addEventListener("click", function () {
        console.log("Hamburger clicked!");
        menu.classList.toggle("show");
        console.log("Updated menu classes:", menu.classList);
    });
});