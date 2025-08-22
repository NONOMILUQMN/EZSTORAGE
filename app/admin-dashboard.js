// app/admin-dashboard.js
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

export default function AdminDashboard({ navigation }) {
  const [users, setUsers] = useState([]);
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
          fetchUsers(storedDomain, storedUsername, storedPassword);
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

  const fetchUsers = async (domain, username, password) => {
    try {
      const response = await fetch(
        `${domain}/ocs/v1.php/cloud/users?format=json`,
        {
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa(`${username}:${password}`),
            "OCS-APIRequest": "true",
          },
        }
      );

      if (response.ok) {
        const json = await response.json();
        if (json.ocs && json.ocs.data && json.ocs.data.users) {
          setUsers(json.ocs.data.users.map((u) => ({ name: u })));
        } else {
          console.error("Unexpected response format:", json);
        }
      } else {
        console.error("Error fetching users:", response.status);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace("admin-login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      {loading ? (
        <Text>Loading users...</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.userItem}>
              <Text>{item.name}</Text>
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
  userItem: {
    padding: 15,
    backgroundColor: "#eaf4ff",
    borderRadius: 8,
    marginBottom: 10,
  },
});
