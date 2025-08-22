// app/user-dashboard.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserDashboard({ navigation }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [domain, setDomain] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    const loadCredentialsAndFetch = async () => {
      try {
        const storedDomain = await AsyncStorage.getItem("domain");
        const storedUsername = await AsyncStorage.getItem("username");
        const storedPassword = await AsyncStorage.getItem("password");

        if (storedDomain && storedUsername && storedPassword) {
          setDomain(storedDomain);
          setUsername(storedUsername);
          setPassword(storedPassword);
          fetchFiles(storedDomain, storedUsername, storedPassword);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading credentials:", error);
        setLoading(false);
      }
    };

    loadCredentialsAndFetch();
  }, []);

  const fetchFiles = async (domain, username, password) => {
    try {
      const response = await fetch(
        `${domain}/remote.php/dav/files/${username}/`,
        {
          method: "PROPFIND",
          headers: {
            Authorization: "Basic " + btoa(`${username}:${password}`),
            Depth: 1,
          },
        }
      );

      if (response.ok) {
        const text = await response.text();
        // For now, we’ll just show raw XML length (you can parse with xmldom later)
        setFiles([{ name: "Files fetched", details: `Length: ${text.length}` }]);
      } else {
        console.error("Error fetching files:", response.status);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace("login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Dashboard</Text>

      {loading ? (
        <Text>Loading files...</Text>
      ) : (
        <FlatList
          data={files}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.fileItem}>
              <Text>{item.name}</Text>
              <Text style={styles.fileDetails}>{item.details}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  fileItem: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
  },
  fileDetails: {
    fontSize: 12,
    color: "gray",
  },
});
