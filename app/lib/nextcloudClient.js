export async function signupUser(domain, adminUser, adminPass, email, username, password) {
  const url = `${domain}/ocs/v1.php/cloud/users`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "OCS-APIRequest": "true",
      "Authorization": "Basic " + btoa(`${adminUser}:${adminPass}`),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `userid=${username}&password=${password}&email=${email}`
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Nextcloud signup failed: ${text}`);
  }

  return await response.text();
}
