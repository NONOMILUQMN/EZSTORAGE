import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function AdminLogin() {
  const router = useRouter();
  const [domain, setDomain] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!domain || !username || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      const response = await fetch(`${domain}/ocs/v1.php/cloud/users`, {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(username + ":" + password),
          "OCS-APIRequest": "true",
        },
      });

      if (response.ok) {
        Alert.alert("Success", "Admin login successful!");
        router.replace("/admin-dashboard"); // ✅ Redirect to admin dashboard
      } else {
        Alert.alert("Login Failed", "Invalid admin credentials.");
      }
    } catch (error) {
      Alert.alert("Error", "Could not connect to server.");
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-white">
      <Text className="text-3xl font-bold mb-6 text-center">Admin Login</Text>

      <TextInput
        placeholder="Server Domain (e.g. https://storage.projectpal.online)"
        value={domain}
        onChangeText={setDomain}
        className="border rounded-xl p-3 mb-4"
      />

      <TextInput
        placeholder="Admin Username"
        value={username}
        onChangeText={setUsername}
        className="border rounded-xl p-3 mb-4"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="border rounded-xl p-3 mb-6"
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-purple-600 py-3 rounded-xl"
      >
        <Text className="text-white text-center font-semibold">Login as Admin</Text>
      </TouchableOpacity>
    </View>
  );
}
