// Security Measures

// 1. XSS Protection
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

// 2. Rate Limiting for Form Submissions
const submissionTimestamps = [];
const MAX_SUBMISSIONS = 5;
const TIME_WINDOW = 300000; // 5 minutes in milliseconds

function checkRateLimit() {
  const now = Date.now();
  // Remove timestamps older than TIME_WINDOW
  while (
    submissionTimestamps.length > 0 &&
    submissionTimestamps[0] < now - TIME_WINDOW
  ) {
    submissionTimestamps.shift();
  }
  // Check if user has exceeded rate limit
  if (submissionTimestamps.length >= MAX_SUBMISSIONS) {
    return false;
  }
  submissionTimestamps.push(now);
  return true;
}

// 3. Content Security Policy
function addCSPHeaders() {
  const meta = document.createElement("meta");
  meta.httpEquiv = "Content-Security-Policy";
  meta.content =
    "default-src 'self' https:; script-src 'self' https: 'unsafe-inline' 'unsafe-eval'; style-src 'self' https: 'unsafe-inline'; img-src 'self' https: data:; font-src 'self' https: data:;";
  document.head.appendChild(meta);
}

// 4. Referrer Policy
function addReferrerPolicy() {
  const meta = document.createElement("meta");
  meta.name = "referrer";
  meta.content = "strict-origin-when-cross-origin";
  document.head.appendChild(meta);
}

// 5. Feature Policy
function addFeaturePolicy() {
  const meta = document.createElement("meta");
  meta.httpEquiv = "Feature-Policy";
  meta.content = "camera 'none'; microphone 'none'; geolocation 'none'";
  document.head.appendChild(meta);
}

// 6. Session Security
function initializeSessionSecurity() {
  // Generate a session token
  const sessionToken = Math.random().toString(36).substring(2);
  sessionStorage.setItem("sessionToken", sessionToken);

  // Check for session hijacking
  window.setInterval(() => {
    const currentToken = sessionStorage.getItem("sessionToken");
    if (currentToken !== sessionToken) {
      // Session might be compromised
      window.location.reload();
    }
  }, 5000);
}

// 7. Form Security Enhancement
function enhanceFormSecurity(form) {
  // Add CSRF token
  const csrfToken = Math.random().toString(36).substring(2);
  sessionStorage.setItem("csrfToken", csrfToken);

  const csrfInput = document.createElement("input");
  csrfInput.type = "hidden";
  csrfInput.name = "csrf_token";
  csrfInput.value = csrfToken;
  form.appendChild(csrfInput);

  // Disable autocomplete for sensitive fields
  const sensitiveFields = form.querySelectorAll(
    'input[type="email"], input[type="text"]'
  );
  sensitiveFields.forEach((field) => {
    field.autocomplete = "off";
  });
}

// Initialize all security measures
document.addEventListener("DOMContentLoaded", function () {
  addCSPHeaders();
  addReferrerPolicy();
  addFeaturePolicy();
  initializeSessionSecurity();

  // Enhance security for all forms
  const forms = document.querySelectorAll("form");
  forms.forEach(enhanceFormSecurity);
});
