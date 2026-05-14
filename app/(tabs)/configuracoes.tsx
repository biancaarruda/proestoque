import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Button from "@/src/components/Button";

import {
  Colors,
  Spacing,
  Typography,
  Radius,
} from "@/src/constants/theme";

import { useAuth } from "@/src/contexts/AuthContext";

export default function Config() {

  const { user, logout } = useAuth();

  function handleLogout() {
    
    Alert.alert(
      "Sair da conta",
      "Deseja realmente sair?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        Configurações
      </Text>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.nome?.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View>
          <Text style={styles.name}>
            {user?.nome}
          </Text>
          <Text style={styles.email}>
            {user?.email}
          </Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <Pressable style={styles.menuItem}>
          <Ionicons
            name="notifications-outline"
            size={22}
            color={Colors.primary[600]}
          />
          <Text style={styles.menuText}>
            Notificações
          </Text>
        </Pressable>
        <Pressable style={styles.menuItem}>
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={22}
            color={Colors.primary[600]}
          />
          <Text style={styles.menuText}>
            Aparência
          </Text>
        </Pressable>

        <Pressable style={styles.menuItem}>
          <Ionicons
            name="help-circle-outline"
            size={22}
            color={Colors.primary[600]}
          />
          <Text style={styles.menuText}>
            Ajuda
          </Text>
        </Pressable>
      </View>

      <View style={{ height: Spacing[6] }} />

      <Button
        label="Sair da conta"
        variant="outline"
        fullWidth
        onPress={handleLogout}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing[5],
  },

  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing[5],
    color: Colors.textPrimary,
  },

  profileCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing[4],
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing[3],
    marginBottom: Spacing[5],
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary[600],
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: Colors.white,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },

  name: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
  },

  email: {
    color: Colors.textSecondary,
    marginTop: 2,
  },

  menuContainer: {
    gap: Spacing[3],
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing[3],
    backgroundColor: Colors.surface,
    padding: Spacing[4],
    borderRadius: Radius.lg,
  },

  menuText: {
    fontSize: Typography.fontSize.md,
    color: Colors.textPrimary,
  },

});