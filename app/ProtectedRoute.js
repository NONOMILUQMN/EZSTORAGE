import { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user || (role && user.role !== role)) {
      router.push("/");
    }
  }, [user]);

  if (!user || (role && user.role !== role)) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Redirecting...</Text>
      </View>
    );
  }

  return children;
}
