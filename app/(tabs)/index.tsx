import { View, Text, StyleSheet } from "react-native";
import { Colors, Typography, Spacing, Radius } from "@/src/constants/theme";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, João <MaterialCommunityIcons name="human-greeting-variant" size={24} color={Colors.primary[600]} /></Text>
      <Text style={styles.subtitle}>Visão geral do seu estoque</Text>

      <View style={styles.cards}>
        <View style={[styles.card, styles.cardPrimary]}>
          <Text style={styles.cardLabelLight}>Total em produtos</Text>
          <Text style={styles.cardValueWhite}>247</Text>
        </View>

        <View style={styles.row}>
          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.cardLabel}>Categorias</Text>
            <Text style={styles.cardValue}>12</Text>
          </View>

          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.cardLabel}>Alertas</Text>
            <Text style={styles.cardValueDanger}>5</Text>
          </View>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing[4],
  },

  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing[2],
  },

  subtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    marginBottom: Spacing[6],
  },

  cards: {
    gap: Spacing[4],
  },

  row: {
    flexDirection: "row",
    gap: Spacing[4],
  },

  halfCard: {
    flex: 1,
  },

  card: {
    backgroundColor: Colors.surface,
    padding: Spacing[4],
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  cardPrimary: {
    backgroundColor: Colors.primary[600],
    borderColor: Colors.primary[600],
  },

  cardLabel: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
  },

  cardLabelLight: {
    color: Colors.neutral[200],
    fontSize: Typography.fontSize.sm,
  },

  cardValue: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary[600],
    marginTop: Spacing[2],
  },

  cardValueWhite: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    marginTop: Spacing[2],
  },

  cardValueDanger: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.danger.border,
    marginTop: Spacing[2],
  },
});
