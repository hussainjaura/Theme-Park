function hidePopup() {
    const popupContainer = document.getElementById('popup-container');
    const popupMessage = document.getElementById('popup-message-text');
    popupContainer.style.display = 'none';
    popupMessage.textContent = '';
}

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const popupContainer = document.getElementById('popup-container');
    const closeButton = document.getElementById('close-button');
    const popupMessage = document.getElementById('popup-message-text');

    function showPopup(message) {
        popupContainer.style.display = 'flex';
        popupMessage.textContent = message;
        closeButton.addEventListener('click', hidePopup);

        setTimeout(() => {
            hidePopup();
        }, 10000);
    }

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            subject: subjectInput.value,
            message: messageInput.value
        }

        if (!correctForm(formData)) {
            return;
        }

        await sendData(formData);
    });

    function correctForm(formData) {
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showPopup('Please fill in all fields');
            return false;
        }

        // Basic email validation
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            showPopup('Please enter a valid email');
            return false;
        }

        return true;
    }

    async function sendData(formData) {
        try {
            console.log('Sending form data:', formData);
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            console.log('Response:', data);

            if (response.ok) {
                showPopup('Thank you for contacting us. We will get back to you as soon as possible.');
                contactForm.reset();
            } else {
                showPopup('Failed to send message: ' + data.message);
                contactForm.reset();
            }
        } catch (error) {
            console.error('Error:', error);
            showPopup('An error occurred while sending the message. Please try again later.');
            contactForm.reset();
        }
    }
});

