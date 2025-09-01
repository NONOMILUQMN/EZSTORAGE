import React, { useContext, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from "../context/AuthContext";
import useNetwork from "../utils/useNetwork";
import { useRouter } from "expo-router";

/**
 * Placeholder file list (safe UI).
 * You can wire this to Nextcloud WebDAV PROPFIND later.
 */
export default function Files() {
  const { user } = useContext(AuthContext);
  const [files] = useState([
    { id: "1", name: "Welcome.txt" },
    { id: "2", name: "Readme.pdf" },
  ]);
  const isConnected = useNetwork();

  const openFile = (item) => {
    Alert.alert("Open", `Pretend to open: ${item.name}`);
  };

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        {!isConnected && (
          <View style={styles.offlineBar}>
            <Text style={styles.offlineText}>Offline — file list may be outdated.</Text>
          </View>
        )}

        <Text style={styles.title}>Files</Text>
        <Text style={styles.subtitle}>Logged in as: {user?.username}</Text>

        <FlatList
          contentContainerStyle={{ paddingVertical: 10 }}
          data={files}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.fileName}>{item.name}</Text>
              <Button title="Open" onPress={() => openFile(item)} />
            </View>
          )}
          ListEmptyComponent={<Text>No files</Text>}
        />

        <View style={{ height: 8 }} />
        <Button title="Go to Upload" onPress={() => { /* navigate from dashboard buttons */ }} />
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 50 },
  offlineBar: { backgroundColor: "#fff4e5", padding: 10, borderRadius: 6, marginBottom: 12 },
  offlineText: { color: "#8a6d3b", textAlign: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 4, textAlign: "center" },
  subtitle: { fontSize: 12, color: "#666", textAlign: "center", marginBottom: 10 },
  row: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fileName: { fontSize: 16 },
});
