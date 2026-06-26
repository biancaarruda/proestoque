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
import { Modal, Switch } from "react-native";
import { useState } from "react";
import {
  Colors,
  Spacing,
  Typography,
  Radius,
} from "@/src/constants/theme";

import { useAuth } from "@/src/contexts/AuthContext";

export default function Config() {

  const [temaModalVisible, setTemaModalVisible] =
  useState(false);

const [ajudaModalVisible, setAjudaModalVisible] =
  useState(false);

const [temaEscuro, setTemaEscuro] =
  useState(false);
  
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

        <Pressable
          style={styles.menuItem}
          onPress={() => setTemaModalVisible(true)}
        >
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={22}
            color={Colors.primary[600]}
          />

          <Text style={styles.menuText}>
            Aparência
          </Text>
        </Pressable>

        <Pressable
          style={styles.menuItem}
          onPress={() => setAjudaModalVisible(true)}
        >
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


    <Modal
  visible={temaModalVisible}
  transparent={false}
  animationType="slide"
>
  <View style={styles.modalOverlay}>
    <View style={styles.modal}>
      <Text style={styles.modalTitle}>
        Aparência
      </Text>

      <View style={styles.optionRow}>
        <Text style={styles.optionText}>
          Tema escuro
        </Text>

        <Switch
          value={temaEscuro}
          onValueChange={setTemaEscuro}
        />
      </View>

      <Text
        style={{
          color: Colors.textSecondary,
          marginBottom: 20,
        }}
      >
        Tema atual:{" "}
        {temaEscuro ? "Escuro 🌙" : "Claro ☀️"}
      </Text>

      <Button
        label="Fechar"
        fullWidth
        onPress={() =>
          setTemaModalVisible(false)
        }
      />
    </View>
  </View>
</Modal>

<Modal
  visible={ajudaModalVisible}
  transparent
  animationType="fade"
>
  <View style={styles.modalOverlay}>
    <View style={styles.modal}>
      <Text style={styles.modalTitle}>
        Ajuda
      </Text>

      <Text style={styles.helpItem}>
        • Cadastre produtos na aba Produtos.
      </Text>

      <Text style={styles.helpItem}>
        • Edite um produto tocando sobre ele.
      </Text>

      <Text style={styles.helpItem}>
        • Use Movimentações para registrar
        entradas e saídas do estoque.
      </Text>

      <Text style={styles.helpItem}>
        • A quantidade do estoque é
        atualizada automaticamente após
        uma movimentação.
      </Text>

      <Text style={styles.helpItem}>
        • Arraste a lista para baixo para
        atualizar os dados.
      </Text>

      <View style={{ marginTop: 20 }}>
        <Button
          label="Fechar"
          fullWidth
          onPress={() =>
            setAjudaModalVisible(false)
          }
        />
      </View>
    </View>
  </View>
</Modal>

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

  modalOverlay: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.45)",
},

modal: {
  width: "88%",
  backgroundColor: Colors.surface,
  borderRadius: Radius.xl,
  padding: Spacing[5],
},

modalTitle: {
  fontSize: Typography.fontSize.lg,
  fontWeight: Typography.fontWeight.bold,
  marginBottom: Spacing[4],
  color: Colors.textPrimary,
},

optionRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: Spacing[3],
},

optionText: {
  fontSize: Typography.fontSize.md,
  color: Colors.textPrimary,
},

helpItem: {
  fontSize: Typography.fontSize.sm,
  color: Colors.textSecondary,
  marginBottom: 12,
  lineHeight: 22,
},

});