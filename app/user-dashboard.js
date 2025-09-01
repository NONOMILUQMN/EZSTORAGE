import { View, Button, Text } from "react-native";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

export default function UserDashboard() {
  const router = useRouter();
  const { logout } = useContext(AuthContext);

  return (
    <ProtectedRoute role="user">
      <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        <Text>User Dashboard</Text>
        <Button title="My Files" onPress={() => router.push("/files")} />
        <Button title="Upload File" onPress={() => router.push("/upload")} />
        <Button title="Logout" onPress={logout} />
      </View>
    </ProtectedRoute>
  );
}
