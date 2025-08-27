import React, { useContext, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from "../context/AuthContext";
import useNetwork from "../utils/useNetwork";
import { useRouter } from "expo-router";

/**
 * Placeholder upload UI.
 * Wire to Nextcloud WebDAV PUT later with domain/credentials.
 */
export default function Upload() {
  const { user } = useContext(AuthContext);
  const [selected, setSelected] = useState(null);
  const isConnected = useNetwork();

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ multiple: false });
      if (res.canceled) return;
      const file = res.assets?.[0];
      setSelected(file || null);
    } catch (e) {
      Alert.alert("Picker Error", String(e?.message || e));
    }
  };

  const uploadFile = async () => {
    if (!selected) {
      Alert.alert("No file", "Please choose a file.");
      return;
    }
    if (!isConnected) {
      Alert.alert("Offline", "Connect to the internet to upload.");
      return;
    }
    // TODO: integrate Nextcloud upload with stored domain/credentials
    Alert.alert("Upload", `Pretend to upload: ${selected.name}`);
  };

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        {!isConnected && (
          <View style={styles.offlineBar}>
            <Text style={styles.offlineText}>Offline — upload disabled.</Text>
          </View>
        )}

        <Text style={styles.title}>Upload</Text>
        <Text style={styles.subtitle}>Logged in as: {user?.username}</Text>

        <View style={{ height: 8 }} />

        <Button title="Choose File" onPress={pickFile} />
        <View style={{ height: 10 }} />
        <Text style={{ textAlign: "center" }}>
          {selected ? `Selected: ${selected.name}` : "No file selected"}
        </Text>

        <View style={{ height: 16 }} />
        <Button title="Upload" onPress={uploadFile} />
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 50 },
  offlineBar: { backgroundColor: "#fdecea", padding: 10, borderRadius: 6, marginBottom: 12 },
  offlineText: { color: "#c0392b", textAlign: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 4, textAlign: "center" },
  subtitle: { fontSize: 12, color: "#666", textAlign: "center", marginBottom: 10 },
});
