import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRouter } from "expo-router";

import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import { Colors, Spacing, Typography } from "@/src/constants/theme";

import LogoProEstoque from "@/src/components/LogoProEstoque";

export default function Login() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.inner}
      >
        <LogoProEstoque size="lg" />

        <Text style={styles.title}>Bem-vindo de volta</Text>

        <Input
          label="E-mail"
          placeholder="nome_usuario@email.com"
          leftIcon="mail-outline"
        />

        <Input
          label="Senha"
          leftIcon="lock-closed-outline"
          isPassword
        />

        <Pressable onPress={() => router.push("/(auth)/recuperar-senha")}>
          <Text style={styles.link}>Esqueci minha senha</Text>
        </Pressable>

        <Button
          label="Entrar"
          fullWidth
          onPress={() => router.replace("/(tabs)")}
        />

        <Pressable onPress={() => router.push("/(auth)/cadastro")}>
          <Text style={styles.linkBottom}>
            Não tem conta? <Text style={styles.bold}>Cadastrar</Text>
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  inner: {
    flex: 1,
    padding: Spacing[5],
    justifyContent: "center",
  },
  title: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing[2],
    color: Colors.neutral[400],
    textAlign: "center",
  },
  link: {
    color: Colors.primary[600],
    marginBottom: Spacing[5],
    textAlign: "center",
  },
  linkBottom: {
    marginTop: Spacing[5],
    textAlign: "center",
    color: Colors.textSecondary,
  },
  bold: {
    color: Colors.primary[600],
    fontWeight: Typography.fontWeight.semibold,
  },
});
