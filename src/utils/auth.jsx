// // auth.js

// export const API_BASE =
//   (typeof import.meta !== "undefined" &&
//     import.meta?.env?.VITE_API_URL) ||
//   "http://localhost:5000";

// const TOKEN_KEY = "token";

// // --- Token helpers ---
// export const getToken = () => {
//   try {
//     return localStorage.getItem(TOKEN_KEY);
//   } catch {
//     return null;
//   }
// };

// export const setToken = (token) => {
//   try {
//     if (token) localStorage.setItem(TOKEN_KEY, token);
//     else localStorage.removeItem(TOKEN_KEY);
//   } catch {
//     // ignore storage errors (private mode, etc.)
//   }
// };

// const parseJwt = (token) => {
//   try {
//     const base64 = token.split(".")[1];
//     const json = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
//     // handle unicode
//     const decoded = decodeURIComponent(
//       escape(json)
//     );
//     return JSON.parse(decoded);
//   } catch {
//     return null;
//   }
// };

// const isExpired = (token) => {
//   const payload = parseJwt(token);
//   if (!payload?.exp) return false; // if no exp, assume not expired
//   return payload.exp * 1000 <= Date.now();
// };

// // --- Public API ---
// export const isAuthenticated = () => {
//   const token = getToken();
//   return !!token && !isExpired(token);
// };

// export const getCurrentUser = () => {
//   const token = getToken();
//   if (!token) return null;
//   const payload = parseJwt(token);
//   if (!payload) return null;
//   // Your backend signs { id, email, name }
//   return {
//     id: payload.id,
//     email: payload.email,
//     name: payload.name || null,
//   };
// };

// export const logout = async () => {
//   const token = getToken();
//   try {
//     if (token) {
//       await fetch(`${API_BASE}/logout`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         credentials: "include",
//       });
//     }
//   } catch {
//     // ignore network errors on logout
//   } finally {
//     setToken(null);
//   }
// };

// // Optional: simple helpers to manage token externally
// // export { setToken };




// auth.js
import React, { createContext, useContext, useEffect, useState } from "react";

export const API_BASE =
  (typeof import.meta !== "undefined" && import.meta?.env?.VITE_API_URL) ||
  "http://localhost:5000";

const TOKEN_KEY = "token";

// --- Token helpers ---
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setToken = (token) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore storage errors (private mode, etc.)
  }
};

const parseJwt = (token) => {
  try {
    const base64 = token.split(".")[1];
    const json = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
    // handle unicode safely
    try {
      return JSON.parse(decodeURIComponent(escape(json)));
    } catch {
      return JSON.parse(json);
    }
  } catch {
    return null;
  }
};

const isExpired = (token) => {
  const payload = parseJwt(token);
  if (!payload?.exp) return false; // if no exp, assume not expired
  return payload.exp * 1000 <= Date.now();
};

// --- Public helpers (non-React) ---
export const isAuthenticated = () => {
  const token = getToken();
  return !!token && !isExpired(token);
};

export const getCurrentUser = () => {
  const token = getToken();
  if (!token) return null;
  const payload = parseJwt(token);
  if (!payload) return null;
  // Backend signs { id, email, name }
  return {
    id: payload.id,
    email: payload.email,
    name: payload.name || null,
  };
};

export const logout = async () => {
  const token = getToken();
  try {
    if (token) {
      await fetch(`${API_BASE}/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
    }
  } catch {
    // ignore network errors on logout
  } finally {
    setToken(null);
  }
};

// --- React Auth Context ---
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [tokenState, setTokenState] = useState(getToken());
  const [user, setUser] = useState(getCurrentUser());

  // If token is expired, clear it
  useEffect(() => {
    if (tokenState && isExpired(tokenState)) {
      setAuthToken(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenState]);

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === TOKEN_KEY) {
        const t = getToken();
        setTokenState(t);
        setUser(getCurrentUser());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function setAuthToken(t) {
    setToken(t);
    setTokenState(t);
    setUser(getCurrentUser());
  }

  async function logoutAndClear() {
    await logout();
    setTokenState(null);
    setUser(null);
  }

  const value = {
    token: tokenState,
    user,
    setToken: setAuthToken, // used by Login/Signup to store token and update navbar
    logout: logoutAndClear,
    isAuthenticated: () => !!tokenState && !isExpired(tokenState),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
