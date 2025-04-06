const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const rideCards = document.querySelectorAll('.area-card');

searchButton.addEventListener('click', () => {
    const searchInputValue = searchInput.value.toLowerCase();

    if (searchInputValue.length > 0) {
        rideCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
        });
    }
});
