// MAIN SCRIPT – Tab, Menu, Form, Header, etc.
document.addEventListener('DOMContentLoaded', function () {

    // ================================
    // TAB FUNCTIONALITY
    // ================================
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(targetTab) {
        tabLinks.forEach(link => link.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        document.querySelectorAll(`[data-tab="${targetTab}"]`)
            .forEach(link => link.classList.add('active'));

        const targetContent = document.getElementById(targetTab);
        if (targetContent) targetContent.classList.add('active');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    tabLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            switchTab(this.getAttribute('data-tab'));
        });
    });


    // ================================
    // HAMBURGER MENU (NO `menu` ERROR)
    // ================================
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');

    hamburger.addEventListener('click', function () {
        navbar.classList.toggle('show');
    });

    document.addEventListener('click', function (event) {
        if (!navbar.contains(event.target) && !hamburger.contains(event.target)) {
            navbar.classList.remove('show');
        }
    });


    // ================================
    // CONTACT FORM SUBMISSION
    // ================================
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            const successMsg = document.querySelector(".form-message.success");
            const errorMsg = document.querySelector(".form-message.error");

            if (!name || !phone || !email || !message) {
                errorMsg.textContent = "⚠ Please fill in all fields.";
                errorMsg.style.display = "block";
                successMsg.style.display = "none";
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errorMsg.textContent = "⚠ Please enter a valid email address.";
                errorMsg.style.display = "block";
                successMsg.style.display = "none";
                return;
            }

            // Save data
            localStorage.setItem("contactName", name);
            localStorage.setItem("contactPhone", phone);
            localStorage.setItem("contactEmail", email);
            localStorage.setItem("contactMessage", message);

            // Redirect to details page
            window.location.href = "view_details.html";
        });
    }


    // ================================
    // CTA BUTTON (HOME → ABOUT SMOOTH)
    // ================================
    const ctaButtons = document.querySelectorAll('.cta-button[data-tab]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            switchTab(this.getAttribute('data-tab'));
        });
    });


    // ================================
    // KEYBOARD TAB SWITCH (Accessibility)
    // ================================
    tabLinks.forEach(link => {
        link.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                switchTab(this.getAttribute('data-tab'));
            }
        });
    });


    // ================================
    // DEFAULT LOAD → HOME
    // ================================
    switchTab('home');
});


// ================================
// HEADER SHRINK EFFECT
// ================================
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 30) header.classList.add('small');
        else header.classList.remove('small');
    });
});
