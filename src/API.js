import axios from "axios";

// function that makes the api request and returns a Promise(response) //
export default function getUsers() {
  return axios.get('https://api.github.com/users');
}