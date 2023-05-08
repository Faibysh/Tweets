import axios from "axios";
import usersData from "./data/users.json";

const baseURL = "https://6455345df803f345763d4e4a.mockapi.io/users/";

axios
  .get(baseURL, usersData)
  .then((response) => {
    console.log("Success", response.data);
  })
  .catch((error) => {
    console.error("Error", error);
  });
