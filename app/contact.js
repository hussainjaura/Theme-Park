document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

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
            alert('Please fill in all fields');
            return false;
        }

        // Basic email validation
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            alert('Please enter a valid email');
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
                alert('Message sent successfully');
                contactForm.reset();
            } else {
                alert('Failed to send message: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending the message');
        }
    }
});

