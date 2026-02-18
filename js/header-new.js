document.addEventListener("DOMContentLoaded", () => {

  const menuItems = document.querySelectorAll(".menu-item.has-submenu");

  function closeAll(except = null) {
    menuItems.forEach(item => {
      if (item !== except && !item.contains(except)) {
        item.classList.remove("open");
      }
    });
  }

  menuItems.forEach(item => {

    const link = item.querySelector(":scope > a");

    // Disable click
    link.addEventListener("click", e => e.preventDefault());

    // Hover open
    item.addEventListener("mouseenter", () => {
      closeAll(item);
      item.classList.add("open");
    });

    // Close when leaving
    item.addEventListener("mouseleave", () => {
      item.classList.remove("open");
    });

  });

});
