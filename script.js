// Force scroll to top before anything else happens
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

// Immediate scroll to top
window.scrollTo(0, 0);

// Additional scroll to top on DOM content loaded
document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  // Prevent scrolling when hero section is visible
  document.body.style.overflow = "hidden";
});

// Hero section fade out
setTimeout(() => {
  const heroSection = document.querySelector(".hero-section");
  heroSection.classList.add("fade-out");
  document.body.style.overflow = "auto";
}, 4000);

// Animated character
const character = document.querySelector(".animated-character");
let lastScrollPosition = 0;

// Add click handler for the robot
character.addEventListener("click", () => {
  const contactSection = document.querySelector("#contact");
  contactSection.scrollIntoView({ behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  const currentScrollPosition = window.pageYOffset;
  const scrollDirection =
    currentScrollPosition > lastScrollPosition ? "down" : "up";

  if (scrollDirection === "down") {
    character.style.transform = "translateY(-50%) translateX(20px)";
  } else {
    character.style.transform = "translateY(-50%) translateX(0)";
  }

  lastScrollPosition = currentScrollPosition;
});

// Scroll Reveal Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((element) => {
  observer.observe(element);
});

// Form Submission
const contactForm = document.querySelector(".contact-form");
const recaptchaContainer = document.querySelector(".g-recaptcha");

// Hobby section content
const hobbyContent = {
  technology: `
        I am deeply involved in exploring and working with cutting-edge technologies that not only solve everyday problems but also tackle bigger challenges with the potential to change lives. My passion lies in using innovative solutions to create meaningful, impactful changes in the world. Whether it's developing software to automate mundane tasks or building systems that empower individuals and businesses, I am committed to leveraging technology for progress and transformation.

        Every day, I explore new technologies to streamline processes, enhance user experiences, and drive efficiency. From artificial intelligence to embedded systems, I embrace the full spectrum of technological innovation. My approach combines technical expertise with a deep understanding of human needs, ensuring that the solutions I create make a real difference in people's lives.

        I believe that technology is more than just a tool – it's a catalyst for positive change. This belief drives me to continuously learn, experiment, and push the boundaries of what's possible, always with the goal of creating solutions that matter.
    `,
  "martial-arts": `
        My martial arts journey began with Krav Maga, where I learned practical self-defense techniques focused on real-world situations. This foundation in Krav Maga helped me develop discipline, mental resilience, and strategic thinking.

        Seeking further growth, I transitioned to Kyokushin, a style renowned for its rigorous training and emphasis on toughness. Here, I learned not only how to push my limits physically but also how to cultivate inner strength and focus in the face of adversity.

        My passion for martial arts led me to train under the legendary Ray Longo, whose expertise in mixed martial arts has had a profound impact on my approach to both training and life. His teachings have broadened my understanding of the sport, helping me integrate striking and grappling techniques effectively.

        To deepen my knowledge and further expand my skillset, I spent a solid amount of time in Thailand, training under former and current Muay Thai champions. This experience provided me with invaluable insights into one of the most effective striking arts in the world, shaping my approach to martial arts as a whole.

        Through all of these experiences, martial arts has not only enhanced my physical capabilities but has also shaped my mindset, emphasizing perseverance, focus, and the drive for continuous improvement. It continues to influence my approach to problem-solving, both in and outside of the dojo.
    `,
  travel: `
        My travels have taken me to numerous countries, each offering unique experiences and opportunities for growth. I've had the privilege of living and staying in a couple of these countries for extended periods, which has allowed me to immerse myself in diverse cultures and philosophies.

        These extended stays have not only broadened my understanding of the world but also deepened my appreciation for the richness of human experiences across different cultures. From learning new languages to participating in local customs, each place has contributed to shaping my perspective in profound ways.

        Through my travels, I've been exposed to various ways of thinking, working, and living, which have had a significant impact on how I approach both my personal and professional life. The philosophies I've encountered have taught me valuable lessons in adaptability, empathy, and the importance of understanding different worldviews.

        Whether exploring the bustling streets of vibrant cities or finding peace in quieter, more remote areas, my travel experiences have continuously fueled my curiosity and inspired my creative process. Each journey has played an integral role in shaping the way I approach challenges and opportunities in my work.
    `,
};

let currentHobby = null;

function toggleHobby(hobby) {
  const contentDiv = document.getElementById("hobby-content");

  if (currentHobby === hobby) {
    // Close the current hobby
    contentDiv.classList.remove("active");
    currentHobby = null;
    return;
  }

  // Close any open hobby first
  contentDiv.classList.remove("active");

  // Set new content
  contentDiv.innerHTML = hobbyContent[hobby]
    .split("\n\n")
    .map((paragraph) => `<p>${paragraph.trim()}</p>`)
    .join("");

  // Show new content
  contentDiv.classList.add("active");
  currentHobby = hobby;
}

// Close hobby content when clicking outside
document.addEventListener("click", (e) => {
  const hobbyCards = document.querySelectorAll(".hobby-card");
  const hobbyContent = document.getElementById("hobby-content");

  let clickedInside = false;
  hobbyCards.forEach((card) => {
    if (card.contains(e.target)) {
      clickedInside = true;
    }
  });

  if (!clickedInside && !hobbyContent.contains(e.target)) {
    hobbyContent.classList.remove("active");
    currentHobby = null;
  }
});

// Cookie Consent
document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("cookieConsent")) {
    document.getElementById("cookie-consent").classList.add("show");
  }
});

function acceptCookies() {
  localStorage.setItem("cookieConsent", "true");
  document.getElementById("cookie-consent").classList.remove("show");
}

// Form submission with Google Scripts integration
async function handleSubmit(event) {
  event.preventDefault();

  // Get form data
  const form = event.target;
  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const contactReason = formData.get("contact-reason");
  const message = formData.get("message");

  // Basic form validation
  if (!name || !email || !contactReason || !message) {
    alert("Please fill in all required fields");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Validate reCAPTCHA
  const recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    alert("Please complete the reCAPTCHA verification");
    return;
  }

  try {
    // Using Google Scripts for form handling
    const formResponse = await fetch(
      "https://script.google.com/macros/s/AKfycbxTe58gSAgtiCbSKQbOY5Yi73xaiPR9qWw45L3PGavJchKQlCz8-S6R_nEr1M-bYwNR/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          contactReason,
          message,
          recaptchaToken: recaptchaResponse,
        }),
      }
    );

    const responseData = await formResponse.json();

    if (!formResponse.ok) {
      throw new Error(responseData.error || "Form submission failed");
    }

    // Clear form and reCAPTCHA
    form.reset();
    grecaptcha.reset();

    // Show success message
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.innerHTML = `
      <h3>Thank you for your message!</h3>
      <p>I will get back to you soon.</p>
    `;
    form.parentNode.insertBefore(successMessage, form);

    // Remove success message after 5 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  } catch (error) {
    console.error("Error:", error);
    // Show error in the error modal instead of alert
    const errorModal = document.getElementById("errorModal");
    errorModal.style.display = "flex";
  }
}

// Function to close error modal
function closeErrorModal() {
  const errorModal = document.getElementById("errorModal");
  errorModal.style.display = "none";
}

// Close error modal when clicking outside
window.onclick = function (event) {
  const errorModal = document.getElementById("errorModal");
  if (event.target === errorModal) {
    errorModal.style.display = "none";
  }
};

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
});

// Technologies Carousel
function initTechCarousel() {
  const container = document.querySelector(".tech-carousel-container");

  // Reset animation when it ends to create seamless loop
  container.addEventListener("animationend", () => {
    container.style.animation = "none";
    container.offsetHeight; // Trigger reflow
    container.style.animation = null;
  });
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", initTechCarousel);
