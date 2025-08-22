import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function AdminLogin({ navigation }) {
  const [domain, setDomain] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!domain || !username || !password) {
      Alert.alert("Error", "Please enter domain, username, and password");
      return;
    }

    try {
      // Clean up domain (remove trailing / if any)
      let cleanDomain = domain.endsWith("/")
        ? domain.slice(0, -1)
        : domain;

      const response = await fetch(
        `${cleanDomain}/remote.php/webdav/`,
        {
          method: "PROPFIND",
          headers: {
            Authorization:
              "Basic " + btoa(username + ":" + password),
          },
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Login successful!");
        navigation.navigate("AdminDashboard", {
          domain: cleanDomain,
          username,
          password,
        });
      } else {
        Alert.alert("Login Failed", "Invalid domain or credentials");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not connect to server");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Nextcloud Domain (https://example.com/nextcloud)"
        value={domain}
        onChangeText={setDomain}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#0078D4",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
