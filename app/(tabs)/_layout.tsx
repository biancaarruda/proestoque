import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
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
              name="cube-outline"
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
            <Ionicons name="settings-outline" 
            size={size} 
            color={Colors.primary[600]} />
          ),
        }}
      />
    </Tabs>

  );
}
