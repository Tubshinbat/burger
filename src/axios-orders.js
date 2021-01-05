import axios from "axios";

const instance = axios.create({
  baseURL: "https://berger-d6f78-default-rtdb.firebaseio.com/"
});

export default instance;
