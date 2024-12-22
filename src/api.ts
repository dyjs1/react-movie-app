const API_KEY = "5b2fedc90d61abaee682940c2f61ad17";
const BASE_PATH = "https://api.themoviedb.org/3";

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getMovie(query: string) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=kr&query=${query}&page=1&include_adult=false`
  ).then((response) => response.json());
}

export function getGenres() {
  return fetch(
    `${BASE_PATH}/genre/movie/list?api_key=${API_KEY}&language=en`
  ).then((response) => response.json());
}

export function getMovieDetail(id: number) {
  return fetch(`${BASE_PATH}/movie/${id}?api_key=${API_KEY}&language=en`).then(
    (response) => response.json()
  );
}
