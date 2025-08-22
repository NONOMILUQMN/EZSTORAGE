import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [domain, setDomain] = useState("https://your-nextcloud.com"); // change to your Nextcloud server
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter username and password");
      return;
    }

    try {
      const response = await fetch(`${domain}/ocs/v1.php/cloud/users/${username}`, {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(username + ":" + password),
          "OCS-APIRequest": "true",
        },
      });

      if (response.ok) {
        await AsyncStorage.setItem("domain", domain);
        await AsyncStorage.setItem("username", username);
        await AsyncStorage.setItem("password", password);
        router.replace("/user-dashboard");
      } else {
        Alert.alert("Error", "Invalid username or password");
      }
    } catch (error) {
      Alert.alert("Error", "Could not connect to Nextcloud server");
    }
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <Text className="text-2xl font-bold mb-4">User Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        className="border rounded-lg p-3 mb-3"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="border rounded-lg p-3 mb-3"
      />
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-blue-600 py-3 rounded-lg"
      >
        <Text className="text-white text-center font-semibold">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/signup")}
        className="mt-4"
      >
        <Text className="text-blue-600 text-center">Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
