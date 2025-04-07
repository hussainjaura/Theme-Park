const searchResults = document.getElementById("search-results");
const searchButton = document.getElementById("search-button");

// Event listener for the search input field (to search as user types)
document.getElementById("search-input").addEventListener("input", (e) => {
  e.preventDefault();

  // Hide ride cards and show search results while typing
  document.getElementById("ride-cards-div").style.display = "none";
  searchResults.style.display = "block";

  searchRides(); // Call searchRides when user types something
});

// Event listener for the search button click
searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  const query = document.getElementById("search-input").value;

  // Check if the input field is empty when search button is clicked
  if (!query.trim()) {
    document.getElementById("ride-cards-div").style.display = "block";
    return; // Stop further processing
  }

  searchRides(); // Call searchRides function when button is clicked
});

async function searchRides() {
  // Dynamically get the query value when user types
  const query = document.getElementById("search-input").value;

  try {
    // Make sure the query isn't empty before fetching
    if (!query.trim()) {
      searchResults.innerHTML = ""; // Clear results if query is empty
      document.getElementById("ride-cards-div").style.display = "block";
      return;
    }

    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error("Ran into an issue while searching for rides");
    }

    const rides = await response.json();

    if (rides.length === 0 || rides === null || rides === undefined) {
      searchResults.innerHTML = "<p>No rides were found</p>";
      return;
    }

    searchResults.innerHTML = "";

    // Display the results for each ride
    rides.forEach((ride) => {
      const rideSearchArea = document.createElement("div");
      rideSearchArea.classList.add("ride-search-result-div");
      rideSearchArea.innerHTML = `
        <div class="ride-cards-div" id="ride-cards-div">
            <div class="rides-container">
                <div class="area-card" onclick="window.location.href='/rides-ejs/${ride.id}'">
                    <div class="area-image">
                        <img src="${ride.image_url}" alt="ride-image" class="area-image-img" loading="lazy" onclick="window.location.href='/rides-ejs/${ride.id}'">
                    </div>
                    <div class="area-content">
                        <h3>${ride.title}</h3>
                        <p>${ride.intro}</p>
                        <ul class="area-highlights">
                            <li>${ride.info1}</li>
                            <li>${ride.info2}</li>
                            <li>${ride.info3}</li>
                        </ul>
                        <p class="area-tip" style="color: #2964b1; font-style: italic;">${ride.tip}</p>
                    </div>
                </div>
            </div>
        </div>
            `;
      searchResults.appendChild(rideSearchArea);
    });
  } catch (error) {
    console.error("Error searching rides:", error);
    searchResults.innerHTML =
      "<p>Error fetching ride data. Please try again later.</p>";
  }
}
