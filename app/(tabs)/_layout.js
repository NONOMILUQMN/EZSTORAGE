import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4B2EF5',
        tabBarStyle: { backgroundColor: '#1A2D5A' }
      }}
    >
      <Tabs.Screen
        name="files"
        options={{
          title: 'Files',
          tabBarIcon: ({ color, size }) => <Ionicons name="folder" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: 'Upload',
          tabBarIcon: ({ color, size }) => <Ionicons name="cloud-upload" size={size} color={color} />
        }}
      />
    </Tabs>
  );
}
