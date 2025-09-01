import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header Hello */}
      <Text style={styles.title}>Hello</Text>

      {/* Card Login Pilihan */}
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.userBtn}
          onPress={() => router.push("/user-login")}
        >
          <Text style={styles.btnText}>USER LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.adminBtn}
          onPress={() => router.push("/admin-login")}
        >
          <Text style={styles.btnText}>ADMIN LOGIN</Text>
        </TouchableOpacity>

        <Text style={styles.signUpText}>
          Don’t have an account?{" "}
          <Text
            style={styles.signUpLink}
            onPress={() => router.push("/signup")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff00aa", // warna pink ikut mockup
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  card: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
  },
  userBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: "100%",
    marginBottom: 15,
    alignItems: "center",
  },
  adminBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: "100%",
    marginBottom: 25,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpText: {
    fontSize: 14,
    color: "#333",
  },
  signUpLink: {
    color: "#007bff",
    fontWeight: "bold",
  },
});
