// app/admin-dashboard.js
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/admin-login"); // go back to login
  };

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18 }}>You are not logged in</Text>
        <Button title="Go to Login" onPress={() => router.replace("/admin-login")} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Admin Dashboard</Text>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Welcome, {user.username} 👋
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 30 }}>
        Role: {user.role || "admin"}
      </Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
