// Selecting the body element and buttons for theme and hamburger menu
const body = document.body;
const btnTheme = document.querySelector(".fa-moon");
const btnHamburger = document.querySelector(".fa-bars");

// Function to add theme class to body and button
const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass);
  btnTheme.classList.add(btnClass);
};

// Get theme classes
const getBodyTheme = localStorage.getItem("portfolio-theme");
const getBtnTheme = localStorage.getItem("portfolio-btn-theme");

// Add theme classes to body and button
addThemeClass(getBodyTheme, getBtnTheme);

// Check if the current theme is dark
const isDark = () => body.classList.contains("dark");

// Function to set the theme
const setTheme = (bodyClass, btnClass) => {
  // Remove previous theme classes
  body.classList.remove(localStorage.getItem("portfolio-theme"));
  btnTheme.classList.remove(localStorage.getItem("portfolio-btn-theme"));

  // Add new theme classes
  addThemeClass(bodyClass, btnClass);

  // Store theme classes in local storage
  localStorage.setItem("portfolio-theme", bodyClass);
  localStorage.setItem("portfolio-btn-theme", btnClass);
};

// Toggle between dark and light themes
const toggleTheme = () =>
  isDark() ? setTheme("light", "fa-moon") : setTheme("dark", "fa-sun");

// Event listener for theme toggle button
btnTheme.addEventListener("click", toggleTheme);

// Function to display or hide the navigation menu
const displayList = () => {
  const navUl = document.querySelector(".nav__list");

  if (btnHamburger.classList.contains("fa-bars")) {
    btnHamburger.classList.remove("fa-bars");
    btnHamburger.classList.add("fa-times");
    navUl.classList.add("display-nav-list");
  } else {
    btnHamburger.classList.remove("fa-times");
    btnHamburger.classList.add("fa-bars");
    navUl.classList.remove("display-nav-list");
  }
};

// Event listener for hamburger menu button
btnHamburger.addEventListener("click", displayList);

// Function to show or hide the scroll-to-top button
const scrollUp = () => {
  const btnScrollTop = document.querySelector(".scroll-top");

  if (body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    btnScrollTop.style.display = "block";
  } else {
    btnScrollTop.style.display = "none";
  }
};

// Event listener for scroll event
document.addEventListener("scroll", scrollUp);

// Function to handle form submission
const contactForm = document.querySelector(".contact-form");

const submitForm = (event) => {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Perform form validation or additional processing here

  // Reset form fields after submission
  contactForm.reset();
};

// Event listener for form submission
contactForm.addEventListener("submit", submitForm);

// Function to handle visibility of sections and images on scroll
const handleScroll = () => {
  const sections = document.querySelectorAll(".section");
  const headshot = document.querySelector(".headshot");
  const skillsCategories = document.querySelectorAll(".skills-category");

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionVisible = sectionTop < window.innerHeight - 100;

    if (sectionVisible) {
      section.classList.add("visible");
    }
  });

  const headshotTop = headshot.getBoundingClientRect().top;
  const headshotVisible = headshotTop < window.innerHeight - 100;

  if (headshotVisible) {
    headshot.classList.add("visible");
  }

  skillsCategories.forEach((category) => {
    const categoryTop = category.getBoundingClientRect().top;
    const categoryVisible = categoryTop < window.innerHeight - 100;

    if (categoryVisible) {
      category.classList.add("visible");
    }
  });
};

// Function to toggle the visibility of skills tags
const toggleSkills = (element) => {
  const skillsTags = element.nextElementSibling;
  skillsTags.classList.toggle("visible");
};

// Event listener for scroll event
window.addEventListener("scroll", handleScroll);

// Initial call to handle visibility on page load
handleScroll();
