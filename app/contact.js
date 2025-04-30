// this function will hide the popup message and clear its content
function hidePopup() {
  const popupContainer = document.getElementById("popup-container");
  const popupMessage = document.getElementById("popup-message-text");
  popupContainer.style.display = "none";
  popupMessage.textContent = "";
}

// to wait for DOM to complete loading
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const popupContainer = document.getElementById("popup-container");
  const closeButton = document.getElementById("close-button");
  const popupMessage = document.getElementById("popup-message-text");

  // this is to display the popup with a message
  function showPopup(message) {
    popupContainer.style.display = "flex";
    popupMessage.textContent = message;
    closeButton.addEventListener("click", hidePopup);

    // automatically hide popup after 10 seconds
    setTimeout(() => {
      hidePopup();
    }, 10000);
  }

  // to submit form
  contactForm.addEventListener("submit", async function (e) {
    // prevent page from auto reload
    e.preventDefault();

    // getting inputs from form
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      subject: subjectInput.value,
      message: messageInput.value,
    };

    // validate the form fields
    if (!correctForm(formData)) {
      return;
    }

    // send data to the server
    await sendData(formData);
  });

  // this will validate the form
  function correctForm(formData) {
    // make sure no fields are empty
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      showPopup("Please fill in all fields");
      return false;
    }

    // basic email format check using regular expressions
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      showPopup("Please enter a valid email");
      return false;
    }

    return true;
  }

  // this is the function to send form data to the backend using fetch
  async function sendData(formData) {
    try {
      // post request to server api
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // basic check
      if (response.ok) {
        showPopup(
          "Thank you for contacting us. We will get back to you as soon as possible."
        );
        // clear and reset the form
        contactForm.reset();
      } else {
        showPopup("Failed to send message: " + data.message);
        contactForm.reset();
      }
    } catch (error) {
      showPopup(
        "An error occurred while sending the message. Please try again later."
      );
      contactForm.reset();
    }
  }
});
