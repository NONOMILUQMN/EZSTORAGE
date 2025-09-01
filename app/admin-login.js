// app/admin-login.js
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { loginUser } from "../lib/nextcloudClient";

export default function AdminLogin({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const result = await loginUser(username, password);

    if (result.success) {
      Alert.alert("Login successful", `Welcome ${result.userId}`);
      navigation.navigate("AdminDashboard");
    } else {
      Alert.alert("Login failed", result.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Admin Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
