/**
 * 1. Global Modal Functions
 * These are outside the DOMContentLoaded so 'onclick' in HTMl can find immediately
 */

// const myProjects = [
//   {
//     title:
//   }
// ]

const openModal = (src) => {
  const imgModal = document.querySelector("#imgModal");
  const modalImg = document.querySelector("#modalImg");

  if (imgModal && modalImg) {
    modalImg.src = src;
    imgModal.classList.add("show");
  }
};

const closeModal = () => {
  const imgModal = document.querySelector("#imgModal");
  const modalImg = document.querySelector("#modalImg");

  if (imgModal && modalImg) {
    imgModal.classList.remove("show");
    // Clear the src after the modal is hidden
    setTimeout(() => {
      modalImg.src = "";
    }, 300);
  }
};

/**
 * 2. Main Application logic
 */
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("#myForm");
  const tyModal = document.querySelector("#thankYouModal");
  const submitBtn = document.querySelector("#myFormSubmit");
  const nameDisplay = document.querySelector("#userName");
  const closeThankYou = document.querySelector("#closeThankYou");

  // --- Form Submission handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the name for the personalized "Thank You"
    const nameInput = document.querySelector("#name").value;

    // UI Feedback: Disable button and show sending state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    if (nameDisplay) nameDisplay.textContent = nameInput || "Friend";

    try {
      const response = await fetch("https://formspree.io/f/mbdzpane", {
        method: "POST",
        body: new FormData(e.target),
        headers: { Accept: "application/json " },
      });

      if (response.ok) {
        // Show success modal
        if (tyModal) tyModal.classList.add("show");
        e.target.reset();
      } else {
        throw new Error("Submission Failed");
      }
    } catch (error) {
      alert("Network error. Please try again later.");
    } finally {
      //Re-enable button
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }
    }
  };

  // --- Event Listeners ---

  // Submit Form
  if (contactForm) contactForm.addEventListener("submit", handleSubmit);

  // Close Thank You Modal via Button
  if (closeThankYou) {
    closeThankYou.addEventListener("click", () => {
      tyModal.classList.remove("show");
    });
  }

  // Close Modals by clicking outside (on the overlay)
  window.addEventListener("click", (e) => {
    const imgModal = document.querySelector("#imgModal");
    // If user clicks the background overlay, close it
    if (e.target === imgModal) closeModal();
    if (e.target === tyModal) tyModal.classList.remove("show");
  });
});
