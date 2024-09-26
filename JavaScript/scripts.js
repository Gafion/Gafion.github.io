
/* Scrolling functionality for the website */
let isScrolling = false;

function handleScroll(event) {
    const messageBox = document.getElementById('message');

    // Check if the event target is the message box or a child of the message box
    if (messageBox.contains(event.target)) {
        return; // Allow normal scroll inside the message box
    }

    event.preventDefault();
    if (isScrolling) return;

    isScrolling = true;

    if (event.deltaY > 0 || event.key === 'ArrowDown') {
        window.scrollBy({
            top: window.innerHeight,
            left: 0,
            behavior: 'smooth'
        });
    } else if (event.deltaY < 0 || event.key === 'ArrowUp') {
        window.scrollBy({
            top: -window.innerHeight,
            left: 0,
            behavior: 'smooth'
        });
    }

    setTimeout(function() {
        isScrolling = false;
    }, 500);
}

document.addEventListener('wheel', handleScroll, { passive: false });
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        handleScroll(event);
    }
}, { passive: false });

document.addEventListener('scroll', function() {
    const contactSection = document.getElementById('contact');
    const footer = document.querySelector('footer');
    const contactRect = contactSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const buffer = 0.1 * windowHeight;

    if (contactRect.top >= -buffer && contactRect.bottom <= windowHeight + buffer) {
        footer.style.bottom = '0';
    } else {
        footer.style.bottom = '-8vh';
    }
});


/* Typing animation for the welcome message */
const words = ["Hello, World!", "Welcome to my portfolio.", "Enjoy your stay!"];
let wordIndex = 0;
let charIndex = 0;
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetweenWords = 2000;

const animatedText = document.getElementById('animated-text');

function type() {
    if (charIndex < words[wordIndex].length) {
        animatedText.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(erase, delayBetweenWords);
    }
}

function erase() {
    if (charIndex > 0) {
        animatedText.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingSpeed);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, typingSpeed);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(type, delayBetweenWords);
});


/* Section indicators */
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const indicatorsContainer = document.getElementById('section-indicators');

    sections.forEach((section, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('section-indicator');
        if (index === 0) indicator.classList.add('active');
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.section-indicator');

    function updateIndicators() {
        let currentIndex = 0;
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentIndex = index;
            }
        });
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    document.addEventListener('scroll', updateIndicators);
    window.addEventListener('resize', updateIndicators);
});


/* Contact form submission */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (name && email && subject && message) {
            emailjs.send("service_hhd20qp", "template_jb364mf", {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
            }).then(function(response) {
                alert('Form submitted successfully!');
                form.reset();
            }, function(error) {
                alert('Failed to send email. Please try again later.');
            });
        } else {
            alert('Please fill in all fields.');
        }
    });
});