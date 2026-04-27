import { useState } from "react";
import { View, Text, StyleSheet,  ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRouter } from "expo-router";

import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import { Colors, Spacing, Typography } from "@/src/constants/theme";

import LogoProEstoque from "@/src/components/LogoProEstoque";

export default function Cadastro() {
  const router = useRouter();

  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [loading, setLoading] = useState(false);

  const senhaErro =
    confirmar && senha !== confirmar ? "As senhas não coincidem" : "";

  function handleCadastro() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)");
    }, 2000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <LogoProEstoque size="lg" />
        
        <Text style={styles.title}>Criar conta</Text>

        <Input label="Nome completo" placeholder="João Silva" />

        <Input
          label="E-mail"
          placeholder="nome_usuario@email.com"
          leftIcon="mail-outline"
        />

        <Input
          label="Senha"
          leftIcon="lock-closed-outline"
          isPassword
          value={senha}
          onChangeText={setSenha}
        />

        <Input
          label="Confirmar senha"
          leftIcon="lock-closed-outline"
          isPassword
          value={confirmar}
          onChangeText={setConfirmar}
          error={senhaErro}
        />

        <Button
          label="Criar Conta"
          fullWidth
          loading={loading}
          onPress={handleCadastro}
        />

        <Pressable onPress={() => router.back()}>
          <Text style={styles.link}>
            Já tenho conta
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  inner: {
    padding: Spacing[5],
    justifyContent: "center",
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing[5],
    textAlign: "center",
  },
  link: {
    marginTop: Spacing[5],
    textAlign: "center",
    color: Colors.primary[600],
  },
});
