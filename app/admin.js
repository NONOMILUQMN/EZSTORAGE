import React from "react";
import { View, Text, Button } from "react-native";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

export default function AdminPage() {
  const { logout } = useContext(AuthContext);

  return (
    <ProtectedRoute requiredRole="admin">
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 22, marginBottom: 20 }}>Welcome, Admin!</Text>
        <Button title="Logout" onPress={logout} />
      </View>
    </ProtectedRoute>
  );
}
