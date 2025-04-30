const searchResults = document.getElementById("search-results");
const searchButton = document.getElementById("search-button");

// this is event listener for the search input field
document.getElementById("search-input").addEventListener("input", (e) => {
  e.preventDefault();

  // hide the ride cards and show search results while typing
  document.getElementById("ride-cards-div").style.display = "none";
  searchResults.style.display = "block";

  searchRides();
});

// event listeners for the search button click
searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  const query = document.getElementById("search-input").value;

  // checking if the input field is empty when search button is clicked
  if (!query.trim()) {
    document.getElementById("ride-cards-div").style.display = "block";
    return; 
  }

  searchRides();
});

async function searchRides() {
  // this gets the query value when user types
  const query = document.getElementById("search-input").value;

  try {
    // to make sure the query isn't empty before fetching
    if (!query.trim()) {
      searchResults.innerHTML = ""; 
      document.getElementById("ride-cards-div").style.display = "block";
      return;
    }

    // to send get request to backend api to look for rides
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error("Ran into an issue while searching for rides");
    }

    // usual parse json 
    const rides = await response.json();

    // to handle case when no ride is found
    if (rides.length === 0 || rides === null || rides === undefined) {
      searchResults.innerHTML = "<p class='no-rides-found'>Sorry! We don't have any rides that match your search at the moment.</p>";
      return;
    }

    searchResults.innerHTML = "";


    const ridesContainer = document.createElement("div");
    ridesContainer.classList.add("rides-container");

    // to display the results for each ride using forEach array method
    rides.forEach((ride) => {
      const rideSearchArea = document.createElement("div");
      rideSearchArea.innerHTML = `
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
      `;
      ridesContainer.appendChild(rideSearchArea);
    });

    // append the rides container to the search results
    searchResults.appendChild(ridesContainer);
  } catch (error) {
    console.error("Error searching rides:", error);
    searchResults.innerHTML =
      "<p>Error fetching ride data. Please try again later.</p>";
  }
}
