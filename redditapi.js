export default {
    search: function (searchTerm, searchLimit, sortBy) {
        return fetch(`http://www.reddit.com/search.json?q=
        ${searchTerm}&sort=${sortBy}&limit=${searchLimit}`)
            .then(response => response.json())
            // Diggin into the data that we get relevant data
            .then(data => data.data.children.map(data => data.data))
            .catch(err => console.log(err));
    }
};