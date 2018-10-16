import reddit from './redditapi';

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
    reddit.search(searchTerm, searchLimit, sortBy)
        .then(results => {
            let output = '<div class="card-columns">';

            // Create forEach for getting the relevant data and display it
            results.forEach(post => {

                // Check if a img is contained
                let img = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'

                output += `
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${img}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${truncateText(post.selftext, 100)}</p>
                    <hr>
                    <span class ="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                    <span class ="badge badge-dark">Score: ${post.score}</span>
                    <hr>
                    <a href="${post.url}" target = "_blank" class="btn btn-success">Read More on Reddit</a>
                </div>
            </div>`;
            });

            output += '</div>';
            document.getElementById('results').innerHTML = output;
        });


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
    searchContainer.insertBefore(div, search);

    // Timeout the message to disappear
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

// Truncate post.selftext
function truncateText(text, limit) {
    // To prevent cutting of a written word it should cut at a space
    const shortened = text.indexOf(' ', limit)

    if (shortened == -1) return text;

    return text.substring(0, shortened);
}