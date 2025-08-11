import axios from "axios";

const API = axios.create({
  baseURL: "https://fitness-tracker-a6dl.onrender.com/api/",
});

export const UserSignUp = async (data) => API.post("/user/signup", data);
export const UserSignIn = async (data) => API.post("/user/signin", data);

export const getDashboardDetails = async (token) => {
  return await API.get("/user/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getWorkoutDetails = async (token, date) => {
  return await API.get(`/user/workout${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const apiAddNewWorkout = async (token, data) => {
  return await API.post(`/user/workout`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
