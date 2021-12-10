import axios from "axios";
const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=6494e9a22d5dac3c1300fd83decd44ba';

//Get Popular Movies
export const getPopularMovies = async  () => {
    const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`,)
    return resp.data.results;
  }
  
//Get Upcoming Movies
export const getUpcomingMovies = async  () => {
    const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`,)
    return resp.data.results;
  }

//Get Drama Tv
export const getDrama = async  () => {
  const resp = await axios.get(`${apiUrl}/discover/movie?${apiKey}&with_genres=18`,)
    return resp.data.results;
  }


//Get Family Movie
export const getFamilyMovie = async  () => {
  const resp = await axios.get(`${apiUrl}/discover/movie?${apiKey}&with_genres=10751`,)
  return resp.data.results;
}
 //Get Movie Details
 export const getMovie = async  id => {
  const resp = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`,)
  return resp.data;
}