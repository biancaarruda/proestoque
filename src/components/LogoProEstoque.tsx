import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Typography, Spacing } from "@/src/constants/theme";

type Props = {
  size?: "sm" | "md" | "lg";
};

export default function LogoProEstoque({ size = "lg" }: Props) {
  const sizes = {
    sm: 18,
    md: 24,
    lg: 32,
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="cube-outline"
        size={sizes[size]}
        color={Colors.primary[600]}
      />
      <Text style={[styles.text, { fontSize: sizes[size] }]}>
        ProEstoque
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing[6],
  },
  text: {
    color: Colors.primary[600],
    fontWeight: Typography.fontWeight.bold,
    marginTop: Spacing[2], 
  },
});

