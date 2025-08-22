import React, { useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { authState } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authState.user) {
      // Not logged in → send to login
      router.replace("/login");
    } else if (requiredRole && authState.role !== requiredRole) {
      // Wrong role → send them away
      if (authState.role === "user") {
        router.replace("/(tabs)");
      } else {
        router.replace("/admin-login");
      }
    }
  }, [authState]);

  return children;
}
