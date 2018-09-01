import axios from "axios";

// function that makes the api request and returns a Promise(response) //
export default function getUsersFromApi() {
  return axios.get('https://api.github.com/users');
}