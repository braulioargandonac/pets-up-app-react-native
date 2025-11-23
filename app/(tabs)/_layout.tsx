import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { styles } from '@/components/navigation/Tabs.styles';

function TabBarItem(props: {
  name: any;
  label: string;
  color: string;
  focused: boolean;
  isIonicons?: boolean;
  isMaterial?: boolean;
}) {
  const { name, label, color, focused, isIonicons, isMaterial } = props;

  let IconComponent: any = FontAwesome5;
  if (isMaterial) {
    IconComponent = MaterialCommunityIcons;
  } else if (isIonicons) {
    IconComponent = Ionicons;
  }

  if (focused) {
    return (
      <View style={styles.tabIconRaised}>
        <IconComponent name={name} size={24} color={Colors.white} />
        <Text style={[styles.tabLabelInactive, { color: Colors.white }]}>
          {label}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.tabItemContainer}>
      <IconComponent name={name} size={24} color={color} />
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

      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarItem
              focused={focused}
              color={color}
              label="Adoptar"
              name="heart-circle"
              isMaterial
            />
          ),
        }}
      />

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

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarItem
              focused={focused}
              color={color}
              label="Perfil"
              name="account-circle"
              isMaterial
            />
          ),
        }}
      />
    </Tabs>
  );
}