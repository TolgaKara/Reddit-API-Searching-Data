const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Search Form Event Listener
searchForm.addEventListener('submit', e => {
    // Get search term value
    const searchTerm = searchInput.value;

    // Get sort | checked value
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;

    // Get Limit
    const searchLimit = document.getElementById('limit').value;

    // Check input if empty
    if (searchTerm === '') {
        // Show warning message
        showMessage('Please add a search term', 'alert-warning')
    }

    // Clear input
    searchInput.value = '';

    // Search Reddit via Fetch API


    e.preventDefault();
});

// Show Message
function showMessage(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add class
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const searchContainer = document.getElementById('search-container');
    // Get search
    const search = document.getElementById('search')

    // Insert message
    searchContainer.insertBefore(div,search);

    // Timeout the message to disappear
    setTimeout(() => document.querySelector('.alert').remove(),3000);
}