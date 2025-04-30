const optionButton = document.getElementById("previous-event-options");
const previousEventsCardsDiv = document.querySelector(
  ".previous-events-cards-div"
);
const viewGalleryButtons = document.querySelectorAll(".view-gallery");

// attaching click listeners to each existing View Gallery button
viewGalleryButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const eventCard = e.target.closest(".previous-event-card"); // to find the parent card element
    const eventId = eventCard.dataset.eventId; // to get the event id from data attribute
    window.location.href = `/api/events/previous/${eventId}`; // this is to redirect to detailed gallery page
  });
});

// to listen for changes on the dropdown for filtering of events
optionButton.addEventListener("change", function () {
  const selectedValue = optionButton.value;

  if (selectedValue === "choose-event") {
    displayPreviousEvents("all");
    return;
  }

  displayPreviousEvents(selectedValue);
});

// asynchronous function to fetch and display events based on the filter query
async function displayPreviousEvents(query) {
  try {
    // using get request to fetch events from backend API
    const response = await fetch(`/api/events/${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const events = await response.json();

    // clearing any existing event cards from the container
    previousEventsCardsDiv.innerHTML = "";

    // if no events are returned, show a message
    if (events.length === 0) {
      console.log("No events found for query:", query);
      previousEventsCardsDiv.innerHTML =
        "<p class='no-events-found'>No events found for this category.</p>";
      return;
    }

    // looping through each event and create a new card element for it
    events.forEach((event) => {
      const eventCard = document.createElement("div");
      eventCard.classList.add("previous-event-card");
      eventCard.setAttribute("data-event-id", event.id);

      // populating the card with event data
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

      // this is to add a new card to the DOM
      previousEventsCardsDiv.appendChild(eventCard);
    });

    // this is to attach View Gallery button again to click listeners for dynamically created cards
    const viewGalleryButtons = document.querySelectorAll(".view-gallery");
    viewGalleryButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const eventCard = e.target.closest(".previous-event-card");
        const eventId = eventCard.dataset.eventId;
        window.location.href = `/api/events/previous/${eventId}`;
      });
    });
  } catch (error) {
    previousEventsCardsDiv.innerHTML =
      "<p class='error-message'>Error loading events. Please try again later.</p>";
  }
}
