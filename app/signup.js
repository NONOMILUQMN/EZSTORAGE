import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useRouter } from "expo-router";
import { createUser } from "../lib/nextcloudClient";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await createUser(username, password);
      router.push("/user-login");
    } catch (err) {
      setError(JSON.stringify(err));
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text>Sign Up</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
}
