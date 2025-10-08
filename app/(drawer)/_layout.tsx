import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerActiveTintColor: '#21AEA8',
          drawerInactiveTintColor: '#666',
          headerStyle: {
            backgroundColor: '#21AEA8',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Drawer.Screen
          name="dashboard"
          options={{
            drawerLabel: 'Dashboard',
            title: 'Dashboard',
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="grid" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="appointments"
          options={{
            drawerLabel: 'Appointments',
            title: 'Appointments',
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="payments"
          options={{
            drawerLabel: 'Payments',
            title: 'Payments',
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="wallet" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="results"
          options={{
            drawerLabel: 'Results',
            title: 'Results',
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="document-text" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="mobile-lab"
          options={{
            drawerLabel: 'Mobile Lab',
            title: 'Mobile Lab',
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="car" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'Profile',
            title: 'Profile',
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
