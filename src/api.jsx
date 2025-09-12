// import axios from 'axios';

// export const API_BASE = 'http://localhost:5000';

// // export async function fetchUsers() {
// // 	const res = await fetch("/api/server", { credentials: "include" });
// // 	if (!res.ok) throw new Error(`API ${res.status}`);
// // 	return res.json();
// // }

// export async function loginUser(payload) {
// 	const res = await axios.post(`${API_BASE}/login`, payload, { withCredentials: true });
// 	return res.data;
// }

// export async function signupUser(payload) {
// 	const res = await axios.post(`${API_BASE}/signup`, payload, { withCredentials: true });
// 	return res.data;
// }



import axios from "axios";

export const API_BASE =
  (typeof import.meta !== "undefined" &&
    import.meta?.env?.VITE_API_URL) ||
  "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // harmless for JWT header-based auth; useful if you later use cookies
});

// Always attach the freshest token from localStorage
api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config?.headers?.Authorization) {
    delete config.headers.Authorization;
  }
  return config;
});

function getErrMsg(err) {
  return (
    err?.response?.data?.error ||
    err?.response?.data?.message ||
    err?.message ||
    "Request failed"
  );
}

export async function loginUser(payload) {
  try {
    const res = await api.post("/login", payload);
    return res.data; // { token }
  } catch (err) {
    throw new Error(getErrMsg(err));
  }
}

export async function signupUser(payload) {
  try {
    const res = await api.post("/signup", payload);
    return res.data; // { token }
  } catch (err) {
    throw new Error(getErrMsg(err));
  }
}

export async function logoutUser() {
  try {
    await api.post("/logout");
  } catch {
    // ignore server errors on logout; client-side token removal is what matters
  }
  // Caller (e.g., AuthProvider) should clear localStorage and state.
}

export async function getProtected() {
  try {
    const res = await api.get("/api/protected");
    return res.data;
  } catch (err) {
    throw new Error(getErrMsg(err));
  }
}

export function getGoogleAuthUrl() {
  return `${API_BASE}/auth/google`;
}
