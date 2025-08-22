import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔐 Helper: encode credentials
  const getAuthHeader = (username, password) => {
    return "Basic " + btoa(`${username}:${password}`);
  };

  // Admin/User Login with Nextcloud
  const login = async ({ domain, username, password }) => {
    try {
      const res = await fetch(`${domain}/remote.php/webdav/`, {
        method: "PROPFIND", // WebDAV check
        headers: {
          Authorization: getAuthHeader(username, password),
        },
      });

      if (res.ok || res.status === 207) {
        setUser({ domain, username, password });
        return true;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      console.error("Login failed", err);
      return false;
    }
  };

  // 🆕 User Signup (via Admin account)
  const signup = async ({ domain, email, username, password, adminUser, adminPass }) => {
    try {
      const res = await fetch(`${domain}/ocs/v1.php/cloud/users`, {
        method: "POST",
        headers: {
          Authorization: getAuthHeader(adminUser, adminPass),
          "OCS-APIRequest": "true",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          userid: username,
          password,
          email,
        }).toString(),
      });

      if (res.ok) {
        return true;
      } else {
        throw new Error("Signup failed");
      }
    } catch (err) {
      console.error("Signup error", err);
      return false;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
