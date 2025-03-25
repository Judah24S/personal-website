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
}, 2000);

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

function toggleHobby(hobby) {
  const content = document.getElementById("hobby-content");
  const currentHobby = content.getAttribute("data-hobby");
  const allDetails = document.querySelectorAll(".hobby-detail");

  // Hide all hobby details
  allDetails.forEach((detail) => detail.classList.remove("active"));

  // If clicking the same hobby, hide the content
  if (currentHobby === hobby) {
    content.classList.remove("active");
    content.setAttribute("data-hobby", "");
    return;
  }

  // Show new hobby content
  const targetDetail = document.getElementById(`${hobby}-content`);
  targetDetail.classList.add("active");
  content.classList.add("active");
  content.setAttribute("data-hobby", hobby);
}

function getHobbyContent(hobby) {
  const content = hobbyContent[hobby];
  if (!content) return "";

  // Split the content into paragraphs and format them
  return `
    <h3>${hobby
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")}</h3>
    ${content
      .split("\n\n")
      .map((paragraph) => `<p>${paragraph.trim()}</p>`)
      .join("")}
  `;
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
    document
      .querySelectorAll(".hobby-detail")
      .forEach((detail) => detail.classList.remove("active"));
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
    showErrorModal("Please fill in all required fields");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showErrorModal("Please enter a valid email address");
    return;
  }

  // Validate reCAPTCHA
  const recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    showErrorModal("Please complete the reCAPTCHA verification");
    return;
  }

  try {
    // Using Google Scripts for form handling
    const formResponse = await fetch(
      "https://script.google.com/macros/s/AKfycbxG9dpZNQ_kuW1moRJ_Opk9cMCAoTmYKeDDP4ql_IL6PYrRebvpZIJqNmrOsoJgR5oX/exec",
      {
        method: "POST",
        mode: "no-cors",
        body: formData,
      }
    );

    // Since we're using no-cors mode, we can't check the response status
    // Instead, we'll assume success if the request completes without throwing an error
    form.reset();
    grecaptcha.reset();
    showSuccessMessage();
  } catch (error) {
    console.error("Form submission error:", error);
    showErrorModal("There was an error submitting the form. Please try again.");
  }
}

function showSuccessMessage() {
  const formContainer = document.querySelector(".contact-form-container");
  formContainer.innerHTML = `
    <div class="success-message">
      <i class="fas fa-check-circle"></i>
      <h3>Thank You!</h3>
      <p>I appreciate you reaching out. I will review your message and get back to you shortly.</p>
      <button class="reset-form-btn" onclick="resetContactForm()">Send Another Message</button>
    </div>
  `;
}

function resetContactForm() {
  const formContainer = document.querySelector(".contact-form-container");
  formContainer.innerHTML = `
    <form class="contact-form" onsubmit="handleSubmit(event)">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required placeholder="Your name" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required placeholder="Your email" />
      </div>
      <div class="form-group">
        <label for="contact-reason">Contact Reason</label>
        <select id="contact-reason" name="contact-reason" required>
          <option value="">Select a reason</option>
          <option value="job">Job Opportunity</option>
          <option value="project">Project Collaboration</option>
          <option value="freelance">Freelance Work</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" required placeholder="Your message" rows="5"></textarea>
      </div>
      <div class="g-recaptcha" data-sitekey="6LdJrvwqAAAAAMG_dZLBSk2T4LyiblhxRJ26PCOE"></div>
      <button type="submit" class="submit-btn">Send Message</button>
    </form>
  `;
  // Reload reCAPTCHA
  grecaptcha.render(document.querySelector(".g-recaptcha"));
}

// Function to show error modal
function showErrorModal(message) {
  const modal = document.getElementById("errorModal");
  const modalMessage = modal.querySelector(".modal-body p");
  modalMessage.textContent = message;
  modal.classList.add("show");
}

// Function to close error modal
function closeErrorModal() {
  const modal = document.getElementById("errorModal");
  modal.classList.remove("show");
}

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
