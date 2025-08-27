import { View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="User Login" onPress={() => router.push("/user-login")} />
      <Button title="Admin Login" onPress={() => router.push("/admin-login")} />
      <Button title="Sign Up" onPress={() => router.push("/signup")} />
    </View>
  );
}
