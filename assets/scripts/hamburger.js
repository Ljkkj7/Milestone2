document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menulist");
    const navbar = document.querySelector(".navbar");

    if (!menuToggle || !menu) {
        console.error("ERROR: Menu toggle or menu list not found!");
        return;
    }

    // When the menu button is clicked, toggle the menu visibility
    menuToggle.addEventListener("click", function () {
        console.log("Hamburger clicked!");
        menu.classList.toggle("show");
        console.log("Updated menu classes:", menu.classList);
    });

    // Close the menu if clicking outside of the navbar
    document.addEventListener("click", function (event) {
        if (!navbar.contains(event.target)) {
            menu.classList.remove("show");  
        }
    });

    // Prevent the click event on the menu itself from closing the menu
    menu.addEventListener("click", function (event) {
        event.stopPropagation();
    });
});