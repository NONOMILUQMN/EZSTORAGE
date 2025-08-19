import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminLogin = () => {
    if (email === 'admin@ezstorage.com' && password === 'admin123') {
      router.replace('/(tabs)/files');
    } else {
      Alert.alert('Invalid', 'Admin credentials are incorrect');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADMIN LOGIN</Text>

      <TextInput
        style={styles.input}
        placeholder="Admin Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleAdminLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#1A2D5A' },
  title: { fontSize: 24, color: '#FFF', textAlign: 'center', marginBottom: 32 },
  input: { backgroundColor: '#FFF', padding: 10, borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: '#4B2EF5', padding: 12, borderRadius: 8, marginTop: 20 },
  buttonText: { color: '#FFF', textAlign: 'center', fontWeight: 'bold' }
});
