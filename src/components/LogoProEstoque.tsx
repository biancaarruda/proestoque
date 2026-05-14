import { View, Text, StyleSheet } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
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
      <FontAwesome6 
        name="cubes" 
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
  },
  text: {
    color: Colors.primary[600],
    fontWeight: Typography.fontWeight.bold,
    marginTop: Spacing[2], 
  },
});

