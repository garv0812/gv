// Theme Toggle Functionality
const themeToggle = document.getElementById("theme-icon")
const body = document.body

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light"
body.setAttribute("data-theme", currentTheme)
updateThemeIcon(currentTheme)

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  body.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)
})

function updateThemeIcon(theme) {
  themeToggle.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon"
}

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Cursor Effect (Desktop only)
if (window.innerWidth > 768) {
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  let mouseX = 0
  let mouseY = 0
  let followerX = 0
  let followerY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    cursor.style.left = mouseX + "px"
    cursor.style.top = mouseY + "px"
  })

  // Smooth follower animation
  function animateFollower() {
    const distX = mouseX - followerX
    const distY = mouseY - followerY

    followerX += distX * 0.1
    followerY += distY * 0.1

    cursorFollower.style.left = followerX + "px"
    cursorFollower.style.top = followerY + "px"

    requestAnimationFrame(animateFollower)
  }
  animateFollower()

  // Cursor hover effects
  const hoverElements = document.querySelectorAll("a, button, .project-card, .skill-tag")

  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursor.style.borderColor = "var(--secondary-color)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(2)"
      cursorFollower.style.opacity = "0.3"
    })

    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursor.style.borderColor = "var(--primary-color)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.opacity = "1"
    })
  })
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add fade-in class to elements and observe them
const animateElements = document.querySelectorAll(
  ".section-title, .about-description, .stat-item, .timeline-item, .skill-category, .project-card, .contact-info, .contact-form",
)

animateElements.forEach((el) => {
  el.classList.add("fade-in")
  observer.observe(el)
})

// Navbar Background on Scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    if (body.getAttribute("data-theme") === "dark") {
      navbar.style.background = "rgba(17, 24, 39, 0.98)"
    }
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    if (body.getAttribute("data-theme") === "dark") {
      navbar.style.background = "rgba(17, 24, 39, 0.95)"
    }
  }
})

// Active Navigation Link
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.querySelector('.contact-form');

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect form data
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const subject = contactForm.subject.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields.');
      return;
    }

    // Prepare the email parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
    };

    // Send email using EmailJS
    // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID' with your EmailJS service and template IDs
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
      .then(function (response) {
        alert('Message sent successfully!');
        contactForm.reset();
      }, function (error) {
        alert('Failed to send message. Please try again later.');
        console.error('EmailJS error:', error);
      });
  });
});

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }
  type()
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  const originalText = heroTitle.textContent

  setTimeout(() => {
    typeWriter(heroTitle, originalText, 50)
  }, 1000)
})

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const heroContent = document.querySelector(".hero-content")

  if (hero && heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Skills Animation on Scroll
const skillTags = document.querySelectorAll(".skill-tag")
skillTags.forEach((tag, index) => {
  tag.style.animationDelay = `${index * 0.1}s`
})

// Project Cards Stagger Animation
const projectCards = document.querySelectorAll(".project-card")
projectCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.2}s`
})

// Add CSS for stagger animations
const style = document.createElement("style")
style.textContent = `
    .skill-tag {
        animation: slideInUp 0.6s ease forwards;
        opacity: 0;
        transform: translateY(20px);
    }
    
    .project-card {
        animation: fadeInScale 0.8s ease forwards;
        opacity: 0;
        transform: scale(0.9) translateY(20px);
    }
    
    @keyframes slideInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInScale {
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`
document.head.appendChild(style)

// Background Gradient Animation
function createBackgroundAnimation() {
  const hero = document.querySelector(".hero")
  let mouseX = 0
  let mouseY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth) * 100
    mouseY = (e.clientY / window.innerHeight) * 100

    hero.style.background = `
            radial-gradient(circle at ${mouseX}% ${mouseY}%, 
            rgba(99, 102, 241, 0.1) 0%, 
            transparent 50%), 
            linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)
        `
  })
}

// Initialize background animation
createBackgroundAnimation()

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Add CSS for loading animation
const loadingStyle = document.createElement("style")
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`
document.head.appendChild(loadingStyle)
