import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { DOMParser } from "xmldom";

export default function AdminDashboard({ route }) {
  const { domain, username, password } = route.params;
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await fetch(`${domain}/remote.php/webdav/`, {
        method: "PROPFIND",
        headers: {
          Authorization: "Basic " + btoa(username + ":" + password),
          Depth: 1,
        },
      });

      if (!response.ok) {
        Alert.alert("Error", "Failed to fetch files");
        return;
      }

      const textResponse = await response.text();

      // Parse XML response
      const parser = new DOMParser();
      const xml = parser.parseFromString(textResponse, "application/xml");
      const responses = xml.getElementsByTagName("d:response");

      const fileList = [];
      for (let i = 0; i < responses.length; i++) {
        const href = responses[i].getElementsByTagName("d:href")[0]?.textContent;
        if (href && !href.endsWith("/")) {
          const name = decodeURIComponent(href.split("/").pop());
          fileList.push({ id: i.toString(), name });
        }
      }

      setFiles(fileList);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not connect to server");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.subtitle}>Connected to: {domain}</Text>

      <FlatList
        data={files}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.fileItem}>
            <Text style={styles.fileText}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No files found</Text>
        }
      />

      <TouchableOpacity style={styles.refreshButton} onPress={fetchFiles}>
        <Text style={styles.refreshText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    color: "gray",
  },
  fileItem: {
    padding: 12,
    backgroundColor: "white",
    marginBottom: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  fileText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  refreshButton: {
    marginTop: 20,
    backgroundColor: "#0078D4",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  refreshText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
