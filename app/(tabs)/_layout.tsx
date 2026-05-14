import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from "@/src/constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:"#2563eb",
        tabBarInactiveTintColor: "#9ca3af",
        headerShown: false,
      }}
    >
      

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size }) => (
            <Ionicons
              name="home"
              size={size}
              color={Colors.primary[600]}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="produtos"
        options={{
          title: "Produtos",
          tabBarIcon: ({ size }) => (
            <AntDesign
              name="product"
              size={size}
              color={Colors.primary[600]}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="configuracoes"
        options={{
          title: "Config",
          tabBarIcon: ({  size }) => (
            <Ionicons name="settings" 
            size={size} 
            color={Colors.primary[600]} />
          ),
        }}
      />
    </Tabs>

  );
}
