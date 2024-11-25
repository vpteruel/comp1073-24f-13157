document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'https://www.omdbapi.com/';
    const apiKey = 'f59cc8fd';

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            searchMovie();
        }
    });

    function searchMovie() {
        const searchInputValue = searchInput.value;
        if (searchInputValue) {
            fetch(`${baseUrl}?t=${encodeURIComponent(searchInputValue)}&apikey=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    if (data.Response === "True") {
                        displayMovie(data);
                    } else {
                        displayErrorMessage('Movie not found');
                    }
                })
                .catch(error => {
                    console.error('Error fetching movie data:', error);
                    alert('An error occurred while fetching movie data');
                });
        } else {
            displayErrorMessage('Please enter a movie title');
        }
    }

    function displayMovie(movie) {
        document.getElementById('movieContainer').style.display = 'block';
        document.getElementById('errorContainer').style.display = 'none';
        document.getElementById('moviePoster').src = movie.Poster;
        document.getElementById('movieTitle').textContent = `${movie.Title} (${movie.Year})`;
        document.getElementById('movieGenre').textContent = movie.Genre;
        document.getElementById('movieDirector').textContent = movie.Director;
        document.getElementById('movieActors').textContent = movie.Actors;
        document.getElementById('moviePlot').textContent = movie.Plot;
        document.getElementById('movieLanguage').textContent = movie.Language;
        document.getElementById('movieCountry').textContent = movie.Country;
        document.getElementById('movieAwards').textContent = movie.Awards;
        document.getElementById('movieRating').textContent = movie.imdbRating;
    }

    function displayErrorMessage(message) {
        document.getElementById('movieContainer').style.display = 'none';
        document.getElementById('errorContainer').style.display = 'block';
        document.getElementById('errorContainer').innerHTML = message;
    }
});