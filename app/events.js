const optionButton = document.getElementById("previous-event-options");
const previousEventsCardsDiv = document.querySelector(".previous-events-cards-div");

optionButton.addEventListener("change", function() {
    const selectedValue = optionButton.value;
    if (selectedValue === "choose-event") {
        displayPreviousEvents("all"); // trigger the backend to return everything
        return;
    }
    
    displayPreviousEvents(selectedValue);
});

async function displayPreviousEvents(query) {
    try {
        const response = await fetch(`/api/events/${encodeURIComponent(query)}`);

        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }

        const events = await response.json();
        
        // Clear previous content
        previousEventsCardsDiv.innerHTML = "";

        if (events.length === 0) {
            previousEventsCardsDiv.innerHTML = "<p class='no-events-found'>No events found for this category.</p>";
            return;
        }

        events.forEach(event => {
            const eventCard = document.createElement("div");
            eventCard.classList.add("previous-event-card");
            eventCard.innerHTML = `
                <div class="event-image">
                    <img src="${event.image_url}" alt="${event.name}" loading="lazy">
                </div>
                <div class="previous-event-content">
                    <h3>${event.name}</h3>
                    <p>${event.description}</p>
                    <div class="event-highlights-past">
                        <span class="date">${event.date}</span>
                        <span class="attendance">${event.amount}</span>
                    </div>
                    <button class="view-gallery">View Gallery</button>
                </div>
            `;
            previousEventsCardsDiv.appendChild(eventCard);
        });
    } catch (error) {
        console.error("Error fetching events:", error);
        previousEventsCardsDiv.innerHTML = "<p class='error-message'>Error loading events. Please try again later.</p>";
    }
}