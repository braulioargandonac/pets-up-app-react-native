import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { styles } from '../../components/navigation/Tabs.styles';

function TabBarItem(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  label: string;
  color: string;
  focused: boolean;
  isIonicons?: boolean;
}) {
  const { name, label, color, focused, isIonicons } = props;
  const IconComponent = isIonicons ? Ionicons : FontAwesome5;
  
  if (focused) {
    return (
      <View style={styles.tabIconRaised}>
        <IconComponent name={name as any} size={24} color={Colors.white} />
        <Text style={[styles.tabLabelInactive, { color: Colors.white }]}>
          {label}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.tabItemContainer}>
      <IconComponent name={name as any} size={24} color={color} />
      <Text style={[styles.tabLabelInactive, { color: color }]}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const inactiveColor = 'rgba(255, 255, 255, 0.6)';
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      
      {/* Pestaña 1: Perdidos */}
      <Tabs.Screen
        name="lost"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarItem
              focused={focused}
              color={color}
              label="Perdidos"
              name="paw"
            />
          ),
        }}
      />

      {/* Pestaña 2: Veterinarias */}
      <Tabs.Screen
        name="vets"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarItem
              focused={focused}
              color={color}
              label="Veterinarias"
              name="clinic-medical"
            />
          ),
        }}
      />

      {/* Pestaña 3: Adoptar */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarItem
              focused={focused}
              color={color}
              label="Adoptar"
              name="heart"
            />
          ),
        }}
      />

      {/* Pestaña 4: Comunitarios */}
      <Tabs.Screen
        name="community"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarItem
              focused={focused}
              color={color}
              label="Comunitarios"
              name="location"
              isIonicons
            />
          ),
        }}
      />

      {/* Pestaña 5: Escanear */}
      <Tabs.Screen
        name="scan"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarItem
              focused={focused}
              color={color}
              label="Encontrar"
              name="qr-code"
              isIonicons
            />
          ),
        }}
      />
    </Tabs>
  );
}