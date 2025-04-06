document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const ridesContainer = document.querySelector('.rides-container');

    // Function to handle search
    function handleSearch() {
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm === '') {
            // If search is empty, show all rides
            fetchAllRides();
            return;
        }

        // Create AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/api/search-rides?term=${encodeURIComponent(searchTerm)}`, true);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                const rides = JSON.parse(xhr.responseText);
                displayRides(rides);
            } else {
                console.error('Error fetching rides:', xhr.statusText);
            }
        };

        xhr.onerror = function() {
            console.error('Network error occurred');
        };

        xhr.send();
    }

    // Function to fetch all rides
    function fetchAllRides() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/all-rides', true);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                const rides = JSON.parse(xhr.responseText);
                displayRides(rides);
            } else {
                console.error('Error fetching all rides:', xhr.statusText);
            }
        };

        xhr.onerror = function() {
            console.error('Network error occurred');
        };

        xhr.send();
    }

    // Function to display rides
    function displayRides(rides) {
        ridesContainer.innerHTML = '';
        
        rides.forEach(ride => {
            const rideCard = document.createElement('div');
            rideCard.className = 'area-card';
            rideCard.onclick = () => window.location.href = `/rides-ejs/${ride.id}`;
            
            rideCard.innerHTML = `
                <div class="area-image">
                    <img src="../images/newRides/ride${ride.id}.jpg" alt="ride-image" class="area-image-img" loading="lazy">
                </div>
                <div class="area-content">
                    <h3>${ride.name}</h3>
                    <p>${ride.description}</p>
                    <ul class="area-highlights">
                        ${ride.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                    </ul>
                    <p class="area-tip" style="color: #2964b1; font-style: italic;">Tip: ${ride.tip}</p>
                </div>
            `;
            
            ridesContainer.appendChild(rideCard);
        });
    }

    // Add event listeners
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
}); 