import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ezstorage</Text>
      </View>

      <View style={styles.card}>
        <Link href="/login" asChild>
          <TouchableOpacity style={{ ...styles.btn, ...styles.btnOutline }}>
            <Text style={styles.btnOutlineText}>USER LOGIN</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/admin-login" asChild>
          <TouchableOpacity style={{ ...styles.btn, ...styles.btnFilled }}>
            <Text style={styles.btnFilledText}>ADMIN LOGIN</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/signup" asChild>
          <TouchableOpacity>
            <Text style={styles.signupLink}>Need an account? Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A2D5A' },
  header: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, color: '#FFF', fontWeight: 'bold' },
  card: {
    flex: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    width: '80%',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20
  },
  btnOutline: { borderWidth: 2, borderColor: '#4B2EF5' },
  btnOutlineText: { color: '#4B2EF5', fontWeight: 'bold' },
  btnFilled: { backgroundColor: '#4B2EF5' },
  btnFilledText: { color: '#FFF', fontWeight: 'bold' },
  signupLink: { color: '#4B2EF5', marginTop: 10, fontWeight: '500' }
});
