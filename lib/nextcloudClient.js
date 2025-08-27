// lib/nextcloudClient.js
import axios from "axios";

const NEXTCLOUD_URL = "http://storage.projectpal.online";

// 🔹 Function to check if server is reachable
export async function checkNextcloudConnection() {
  try {
    const response = await axios.get(`${NEXTCLOUD_URL}/status.php`, {
      headers: { Accept: "application/json" },
    });

    if (response.data && response.data.installed) {
      return { success: true, version: response.data.versionstring };
    } else {
      return { success: false, message: "Nextcloud not installed or misconfigured" };
    }
  } catch (error) {
    return { success: false, message: "Server unreachable" };
  }
}

// 🔹 Function to login user with OCS API
export async function loginUser(username, password) {
  try {
    const response = await axios.get(
      `${NEXTCLOUD_URL}/ocs/v2.php/cloud/user?format=json`,
      {
        auth: { username, password },
        headers: {
          Accept: "application/json",
          "OCS-APIRequest": "true", // required by Nextcloud OCS API
        },
      }
    );

    if (response.status === 200 && response.data.ocs.meta.status === "ok") {
      return true; // ✅ Login success
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.log("Login error:", error.response?.status, error.response?.data);
    throw new Error("Invalid credentials");
  }
}
