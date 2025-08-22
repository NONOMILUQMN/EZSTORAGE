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

export default function Signup() {
  const router = useRouter();
  const [domain, setDomain] = useState("https://your-nextcloud.com"); // change to your server
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const response = await fetch(`${domain}/ocs/v1.php/cloud/users`, {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa("admin:adminpassword"), // replace with admin creds
          "OCS-APIRequest": "true",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `userid=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      });

      if (response.ok) {
        Alert.alert("Success", "Account created! Please log in.");
        router.replace("/login");
      } else {
        Alert.alert("Error", "Failed to create account.");
      }
    } catch (error) {
      Alert.alert("Error", "Could not connect to Nextcloud server");
    }
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <Text className="text-2xl font-bold mb-4">Sign Up</Text>
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
        onPress={handleSignup}
        className="bg-green-600 py-3 rounded-lg"
      >
        <Text className="text-white text-center font-semibold">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
