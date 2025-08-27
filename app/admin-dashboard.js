import { View, Button, Text } from "react-native";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

export default function AdminDashboard() {
  const router = useRouter();
  const { logout } = useContext(AuthContext);

  return (
    <ProtectedRoute role="admin">
      <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        <Text>Admin Dashboard</Text>
        <Button title="Manage Users" onPress={() => router.push("/signup")} />
        <Button title="Logout" onPress={logout} />
      </View>
    </ProtectedRoute>
  );
}
