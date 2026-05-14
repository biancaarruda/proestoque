import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRouter } from "expo-router";

import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import { Colors, Radius, Spacing, Typography } from "@/src/constants/theme";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';


export default function RecuperarSenha() {
  const router = useRouter();
  const [enviado, setEnviado] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>
          <Feather 
          name="arrow-left" 
          size={16}
          color={Colors.primary[600]} /> 
          Voltar</Text>
      </Pressable>

      <View style={styles.inner}>
        <AntDesign 
          name="lock" 
          size={40}
          color={Colors.primary[600]}
          style={styles.lock}
        />

        <Text style={styles.title}>Recuperar senha</Text>

        <Text style={styles.desc}>
            Informe seu e-mail e enviaremos um link
        </Text>

        {!enviado ? (
          <>
            <Input
              label="E-mail"
              placeholder="nome_usuario@email.com"
              leftIcon="mail-outline"
            />

            <Button
              label="Enviar"
              fullWidth
              onPress={() => setEnviado(true)}
            />
          </>
        ) : (
          <>
            <View style={styles.successCard}>
              <Text style={styles.emoji}>✉️</Text>

              <Text style={styles.successTitle}>
                E-mail enviado!
              </Text>

              <Text style={styles.successText}>
                Verifique sua caixa de entrada
              </Text>
              
            </View>
            <Button
                label="Voltar ao Login"
                variant="outline"
                fullWidth
                onPress={() => router.back()}
            />
          </>
        )}

        
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing[4],
  },

  back: {
    color: Colors.primary[600],
    fontSize: Typography.fontSize.md,
    marginBottom: Spacing[4],
  },

  inner: {
    flex: 1,
    justifyContent: "center",
  },

  lock: {
    alignSelf: "center",
    marginBottom: Spacing[4],
  },

  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing[3],
    textAlign: "center",
  },

  desc: {
    marginBottom: Spacing[5],
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.base,
    textAlign: "center",
  },

  successCard: {
    backgroundColor: Colors.success.bg,
    borderColor: Colors.success.border,
    borderWidth: 1,
    padding: Spacing[5],
    borderRadius: Radius.lg,
    alignItems: "center",
    marginBottom: Spacing[6],
  },

  emoji: {
    fontSize: 40,
    marginBottom: Spacing[2],
    textAlign: "center",
  },

  successTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.success.text,
    marginBottom: Spacing[1],
    textAlign: "center",
  },

  successText: {
    fontSize: Typography.fontSize.md,
    color: Colors.success.text,
    textAlign: "center",
  },
});
