const API_URL= "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7bbcd7bf2880f38db552e553fa6a52b3&page=1";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = "https://api.themoviedb.org/3/search/movie?api_key=7bbcd7bf2880f38db552e553fa6a52b3&query=${search_key}&page=1";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url) {

  fetch(url).then(response => response.json()).then(data => {
    console.log(data.results)
    showMovies(data.results);
  })
}

function showMovies(data) {
   main.innerHTML = '';

   data.forEach(movie => {
      const {title, poster_path, release_date, vote_average, overview} = movie;
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      movieEl.innerHTML = `
           <img src="${IMG_URL+poster_path}" alt="${title}">

           <div class="movie-info">
               <h3>${title}</h3>
               <span class="${getColor(vote_average)}">${vote_average}</span>
           </div>

           <div class="movie-info">
               <h3>${release_date}</h3>              
           </div>
          <div class="overview">
      <h3>Overview</h3>
      ${overview}
    </div>
    `
  main.appendChild(movieEl);
  })
}

function getColor(vote) {
  if(vote>= 8){
    return 'green'
  }else if(vote >= 5){
    return "orange"
  }else{
    return 'red'
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if(searchTerm) {
    getMovies(searchURL+'&query='+searchTerm)
  }else{
    getMovies(API_URL);
  }

})
