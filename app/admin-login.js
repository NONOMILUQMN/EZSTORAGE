import { useState, useContext } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useRouter } from "expo-router";
import { loginUser, checkNextcloudConnection } from "../lib/nextcloudClient";
import { AuthContext } from "../context/AuthContext";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // ✅ Step 1: Check Nextcloud server
      const health = await checkNextcloudConnection();
      if (!health.success) {
        setError("Nextcloud server unreachable. Please try again.");
        return;
      }

      // ✅ Step 2: Try logging in
      const success = await loginUser(username, password);
      if (success) {
        login(username, password, "admin"); // store in context
        router.push("/admin-dashboard"); // go to dashboard
      } else {
        setError("Invalid admin credentials");
      }
    } catch (err) {
      setError("Invalid admin credentials");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Admin Login</Text>
      <TextInput
        placeholder="Admin Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Admin Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      {error && <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
