// Initialize Animate on Scroll
AOS.init({
  duration: 800,
  once: true,
});
// Initialize Feather Icons
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

// Set initial theme and listen for system changes
updateTheme();
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", updateTheme);

// --- Gallery Functionality ---
let lgInstance = null; // Will hold the lightGallery instance

document.addEventListener("DOMContentLoaded", () => {
  const filterContainer = document.getElementById("filter-buttons");
  const gallery = document.getElementById("lightgallery");

  // Function to apply filter and refresh gallery
  function applyFilter(filterValue) {
    const allItems = document.querySelectorAll("#lightgallery > .gallery-item");
    allItems.forEach((item) => {
      const itemCategory = item.dataset.category;
      if (filterValue === "all" || itemCategory === filterValue) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });

    // Refresh the gallery instance to recognize the changes
    if (lgInstance) {
      // Use requestAnimationFrame to ensure DOM updates are rendered before refreshing
      requestAnimationFrame(() => {
        lgInstance.refresh();
      });
    }
  }

  // --- Gallery Filter Logic ---
  if (filterContainer) {
    filterContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("filter-btn")) {
        filterContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        const filterValue = e.target.dataset.filter;
        applyFilter(filterValue);
      }
    });
  }

  // --- Load More Logic ---
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      const extraItems = document.querySelectorAll(".extra-item");
      extraItems.forEach((item) => {
        // This makes them permanently part of the gallery
        item.classList.remove("extra-item");
      });
      const activeFilterBtn = document.querySelector(
        "#filter-buttons .filter-btn.active"
      );
      const activeFilterValue = activeFilterBtn
        ? activeFilterBtn.dataset.filter
        : "all";
      applyFilter(activeFilterValue);

      loadMoreBtn.style.display = "none"; // Hide button after clicking
    });
  }

  // --- LightGallery Initialization ---
  if (gallery) {
    lgInstance = lightGallery(gallery, {
      plugins: [lgZoom, lgThumbnail],
      licenseKey: "0000-0000-000-0000",
      speed: 500,
      download: false,
      // Only initialize LightGallery on visible items
      selector: ".gallery-item:not(.hidden)",
    });
  }
});
