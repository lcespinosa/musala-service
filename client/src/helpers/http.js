import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3300',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default instance;