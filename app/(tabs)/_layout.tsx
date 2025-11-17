import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { styles } from '../../components/navigation/Tabs.styles';

export default function TabLayout() {
  const inactiveColor = 'rgba(255, 255, 255, 0.6)';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        headerShown: false,
        
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 2,
          paddingBottom: 10,
        },
      }}>
      
      {/* Pestaña 1: Perdidos */}
      <Tabs.Screen
        name="lost"
        options={{
          title: 'Perdidos',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="paw" size={26} color={color} />
          ),
        }}
      />

      {/* Pestaña 2: Veterinarias */}
      <Tabs.Screen
        name="vets"
        options={{
          title: 'Veterinarias',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="clinic-medical" size={26} color={color} />
          ),
        }}
      />

      {/* Pestaña 3: Adoptar */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Adoptar',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="heart" size={26} color={color} />
          ),
        }}
      />

      {/* Pestaña 4: Comunitarios */}
      <Tabs.Screen
        name="community"
        options={{
          title: 'Comunitarios',
          tabBarIcon: ({ color }) => (
            <Ionicons name="location" size={26} color={color} />
          ),
        }}
      />

      {/* Pestaña 5: Escanear */}
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Escanear',
          tabBarIcon: ({ color }) => (
            <Ionicons name="qr-code" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}