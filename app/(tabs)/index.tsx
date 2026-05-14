import { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


import {
  PRODUTOS_MOCK,
  CATEGORIAS_MOCK,
  getProdutosComEstoqueBaixo,
  getValorTotalEstoque,
  formatarPreco,
  type Produto,
} from "@/src/data/mockData";

import { Colors, Spacing, Typography, Radius } from "@/src/constants/theme";

export default function HomeScreen() {

  const [refreshing, setRefreshing] = useState(false);

  const alertas = useMemo(
    () => getProdutosComEstoqueBaixo(),
    []
  );

  const valorTotal = useMemo(
    () => getValorTotalEstoque(),
    []
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const cardsResumo = [
    {
      id: "produtos",
      titulo: "Produtos",
      valor: PRODUTOS_MOCK.length,
      icone: "cube",
    },
    {
      id: "alertas",
      titulo: "Alertas",
      valor: alertas.length,
      icone: "alert-circle",
    },
    {
      id: "categorias",
      titulo: "Categorias",
      valor: CATEGORIAS_MOCK.length,
      icone: "grid",
    },
    {
      id: "valor",
      titulo: "Em Estoque",
      valor: formatarPreco(valorTotal),
      icone: "cash-outline",
    },
  ];

  const Header = () => (
    <View>

      <Text style={styles.title}>
        Olá, João {"! "}
        <MaterialCommunityIcons
          name="human-greeting-variant"
          size={24}
          color={Colors.primary[600]}
        />
      </Text>

      <Text style={styles.subtitle}>
        Visão geral do estoque
      </Text>

      <View style={styles.cardsGrid}>
        {cardsResumo.map((card) => (
          <View key={card.id} style={styles.card}>

            <Ionicons
              name={card.icone as any}
              size={20}
              color={Colors.primary[600]}
            />

            <Text style={styles.cardValue}>
              {card.valor}
            </Text>

            <Text style={styles.cardLabel}>
              {card.titulo}
            </Text>

          </View>
        ))}
      </View>

      {alertas.length > 0 && (

        <View style={styles.alertBox}>

          <Text style={styles.alertTitle}>
            ⚠️ Estoque crítico ({alertas.length})
          </Text>

          {alertas.map((p) => (
            <View key={p.id} style={styles.alertItem}>

              <Text style={styles.alertProduct}>
                {p.nome}
              </Text>

              <Text style={styles.alertQuantity}>
                ({p.quantidade}/{p.quantidadeMinima})
              </Text>

            </View>
          ))}

        </View>

      )}

      <Text style={styles.sectionTitle}>
        Produtos recentes
      </Text>

    </View>
  );

  const renderItem = ({ item }: { item: Produto }) => {

    const emAlerta =
      item.quantidade < item.quantidadeMinima;

    const semEstoque =
      item.quantidade === 0;

    return (

      <View style={styles.item}>

        <Ionicons
          name="cube-outline"
          size={20}
          color={Colors.primary[600]}
        />

        <View style={{ flex: 1 }}>

          <Text style={styles.itemTitle}>
            {item.nome}
          </Text>

          <Text>
            {item.quantidade} {item.unidade}
          </Text>

        </View>

        <Text
          style={[
            styles.badge,
            semEstoque
              ? styles.badgeDanger
              : emAlerta
                ? styles.badgeWarning
                : styles.badgeSuccess,
          ]}
        >
          {semEstoque
            ? "Sem estoque"
            : emAlerta
              ? "Baixo"
              : "Normal"}
        </Text>

      </View>

    );

  };

  return (

    <SafeAreaView style={{ flex: 1 }}>

      <StatusBar style="dark" />

      <FlatList<Produto>

        data={PRODUTOS_MOCK}

        keyExtractor={(item) => item.id}

        renderItem={renderItem}

        ListHeaderComponent={Header}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }

        contentContainerStyle={{
          padding: Spacing[4],
        }}

      />

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },

  subtitle: {
    marginBottom: Spacing[4],
    color: Colors.textSecondary,
  },

  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing[3],
    marginBottom: Spacing[5],
  },

  card: {
    width: "48%",
    backgroundColor: Colors.surface,
    padding: Spacing[4],
    borderRadius: Radius.lg,
  },

  cardValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },

  cardLabel: {
    color: Colors.textSecondary,
  },

  alertBox: {
    backgroundColor: Colors.warning.bg,
    padding: Spacing[4],
    borderRadius: Radius.lg,
    marginBottom: Spacing[5],
  },

  alertTitle: {
    fontWeight: Typography.fontWeight.bold,
  },

  sectionTitle: {
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing[3],
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing[3],
    gap: Spacing[2],

  },

  itemTitle: {
    fontWeight: Typography.fontWeight.semibold,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.full,
    fontSize: 12,
    fontWeight: Typography.fontWeight.bold,
  },

  badgeSuccess: {
    backgroundColor: Colors.success.bg,
    color: Colors.success.text,
  },

  badgeWarning: {
    backgroundColor: Colors.warning.bg,
    color: Colors.warning.text,
  },

  badgeDanger: {
    backgroundColor: Colors.danger.bg,
    color: Colors.danger.text,
  },

  alertItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing[2],
  },

  alertProduct: {
    flex: 1,
    fontWeight: Typography.fontWeight.medium,
  },

  alertQuantity: {
    fontWeight: Typography.fontWeight.bold,
    color: Colors.warning.text,
  },

});