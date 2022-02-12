import axios from "./axios";

export async function login(data) {
  const res = await axios.post("/login", data);
  axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
  return res.data;
}

export async function logout() {
  const res = await axios.get("/logout");
  return res.data;
}
