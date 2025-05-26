// Theme Toggle
const themeToggleButton = document.getElementById("theme-toggle");
themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", currentTheme);
});

// Load Theme from localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.classList.add(savedTheme);
}

// Menu Toggle for Mobile
const menuToggleButton = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggleButton.addEventListener("click", () => {
  navMenu.classList.toggle("hidden");
});

// Search Toggle
const searchToggleButton = document.getElementById("search-toggle");
const searchBar = document.getElementById("search-bar");
const searchCloseButton = document.getElementById("search-close");

searchToggleButton.addEventListener("click", () => {
  searchBar.classList.toggle("hidden");
});

searchCloseButton.addEventListener("click", () => {
  searchBar.classList.add("hidden");
});

// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();
