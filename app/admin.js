import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";

/** Optional helper screen; you can remove if not needed. */
export default function Admin() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Area</Text>
      <Button title="Go to Admin Login" onPress={() => router.replace("/admin-login")} />
      <View style={{ height: 10 }} />
      <Button title="Back to Home" onPress={() => router.replace("/index")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
});
