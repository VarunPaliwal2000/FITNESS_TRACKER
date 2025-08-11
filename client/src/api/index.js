import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const UserSignUp = (data) => API.post("/user/signup", data);
export const UserSignIn = (data) => API.post("/user/signin", data);
export const getDashboardDetails = (token) => {
  API.get("/user/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getWorkoutDetails = (token, date) => {
  API.get(`/user/workout${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const addWorkoutDetails = (token, data) => {
  API.post(`/user/workout`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
