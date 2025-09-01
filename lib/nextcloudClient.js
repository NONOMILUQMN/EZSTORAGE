// lib/nextcloudClient.js
import axios from "axios";

const BASE_URL = "http://storage.projectpal.online";

export async function checkNextcloudConnection() {
  try {
    const res = await axios.get(`${BASE_URL}/status.php`);
    return { success: res.data && res.data.installed };
  } catch (err) {
    console.error("Connection check failed:", err.message);
    return { success: false, message: "Cannot connect to Nextcloud server" };
  }
}

export async function loginUser(username, password) {
  try {
    const res = await axios.get(
      `${BASE_URL}/ocs/v2.php/cloud/user?format=json`,
      {
        auth: { username, password },
        headers: { "OCS-APIRequest": "true" },
      }
    );

    if (res.data.ocs.meta.statuscode === 200) {
      const userId = res.data.ocs.data.id;
      const groups = res.data.ocs.data.groups || [];
      const isAdmin = groups.includes("admin"); // ✅ check group, not username

      if (isAdmin) {
        return { success: true, userId };
      } else {
        return { success: false, message: "User is not admin" };
      }
    }

    return { success: false, message: "Invalid credentials" };
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    return { success: false, message: "Login failed" };
  }
}
