import axios from "axios";

const NEXTCLOUD_URL = "http://storage.projectpal.online"; 

export async function loginUser(username, password) {
  try {
    // Try to fetch user info via WebDAV
    const response = await axios({
      method: "PROPFIND",
      url: `${NEXTCLOUD_URL}/remote.php/dav/files/${username}/`,
      auth: {
        username,
        password,
      },
      headers: {
        Depth: 1,
      },
    });

    if (response.status === 207) {
      // Success ✅
      return true;
    } else {
      throw new Error("Invalid response");
    }
  } catch (err) {
    throw new Error("Invalid credentials");
  }
}
