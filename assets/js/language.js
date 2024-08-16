function setLanguage(language) {
  document.querySelectorAll("[data-lang]").forEach((element) => {
    if (element.getAttribute("data-lang") === language) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
}

// Set default language on page load
document.addEventListener("DOMContentLoaded", () => {
  setLanguage("en"); // You can use 'pt' to set Portuguese as the default
});
