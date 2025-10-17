AOS.init({
  duration: 800,
  once: true,
});
feather.replace();

// --- Theme toggle functionality ---
const themeToggle = document.getElementById("theme-toggle");
const themeMenu = document.getElementById("theme-menu");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");

themeToggle.addEventListener("click", () =>
  themeMenu.classList.toggle("hidden")
);

document.querySelectorAll("#theme-menu button").forEach((button) => {
  button.addEventListener("click", () => {
    const theme = button.dataset.theme;
    if (theme === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", theme);
    }
    updateTheme();
    themeMenu.classList.add("hidden");
  });
});

function updateTheme() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
  } else {
    document.documentElement.classList.remove("dark");
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  }
}

updateTheme();
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", updateTheme);

lucide.createIcons();
// Initialize Lucide icons
lucide.createIcons();

document.addEventListener("DOMContentLoaded", () => {
  // --- Gallery Filter Logic ---
  const filterContainer = document.getElementById("filter-buttons");
  const galleryItems = document.querySelectorAll(
    "#lightgallery > .gallery-item"
  );

  if (filterContainer) {
    filterContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("filter-btn")) {
        // Handle active button state
        filterContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");

        const filterValue = e.target.dataset.filter;

        galleryItems.forEach((item) => {
          if (filterValue === "all" || item.dataset.category === filterValue) {
            item.classList.remove("hidden");
          } else {
            item.classList.add("hidden");
          }
        });
      }
    });
  }

  // --- LightGallery Initialization ---
  const gallery = document.getElementById("lightgallery");
  if (gallery) {
    lightGallery(gallery, {
      plugins: [lgZoom, lgThumbnail],
      licenseKey: "0000-0000-000-0000",
      speed: 500,
      download: false,
      selector: ".gallery-item:not(.hidden)", // Tell LightGallery to only use visible items
    });
  }
});
