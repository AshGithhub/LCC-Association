document.addEventListener('DOMContentLoaded', () => {

  // 1. Navigation Hamburger Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('active'));
    });
  }

  // 2. Navigation Active State on Scroll
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Form Validation for Trials / Fan Club
  const cricketForm = document.getElementById('cricket-form');
  const formStatus = document.getElementById('form-status');

  if (cricketForm) {
    cricketForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = document.getElementById('fullname');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');

      const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
      const phoneRegex = /^[0-9]{10}$/;

      if (name.value.trim() === '') {
        showError(name);
        isValid = false;
      } else {
        removeError(name);
      }

      if (!emailRegex.test(email.value.trim())) {
        showError(email);
        isValid = false;
      } else {
        removeError(email);
      }

      if (!phoneRegex.test(phone.value.trim().replace(/[- ]/g, ''))) {
        showError(phone);
        isValid = false;
      } else {
        removeError(phone);
      }

      if (isValid) {
        formStatus.className = 'form-status success';
        formStatus.innerText = 'Application received! The Ladlapur CC management team will contact you soon.';
        cricketForm.reset();
      }
    });
  }

  function showError(input) {
    input.parentElement.classList.add('invalid');
  }

  function removeError(input) {
    input.parentElement.classList.remove('invalid');
  }
});