import { useMemo, useState } from "react";

import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";

import { useRouter } from "expo-router";
import { ProdutoListaSkeleton } from "@/src/components/ProdutoSkeleton";
import { Ionicons } from "@expo/vector-icons";

import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "@/src/constants/theme";

import { Produto } from "@/src/data/mockData";
import { useCategorias } from "@/src/hooks/useCategorias";

import { useProducts } from "@/src/contexts/ProductsContext";
import LoadingView from "@/src/components/LoadingView";

import ErrorView from "@/src/components/ErrorView";

import { RefreshControl, } from "react-native";
export default function ProdutosScreen() {
  const router = useRouter();

  const { produtos, isLoading, error, carregarProdutos } = useProducts();

  const [busca, setBusca] = useState("");
  const { categorias } = useCategorias();
  const [refreshing, setRefreshing] = useState(false);
  const [
    categoriaSelecionada,
    setCategoriaSelecionada,
  ] = useState("todos");

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((produto: Produto) => {
      const buscaMatch =
        produto.nome
          .toLowerCase()
          .includes(busca.toLowerCase());

      const categoriaMatch =
        categoriaSelecionada === "todos"
          ? true
          : produto.categoriaId ===
          categoriaSelecionada;

      return buscaMatch && categoriaMatch;
    });
  }, [
    busca,
    produtos,
    categoriaSelecionada,
  ]);

  const [modoGrid, setModoGrid] =
    useState(false);

async function onRefresh() {

  setRefreshing(true);

  await carregarProdutos();

  setRefreshing(false);

}

  function renderProduto({
    item,
  }: {
    item: Produto;
  }) {
    const emAlerta =
      item.quantidade < item.quantidadeMinima;

    const semEstoque =
      item.quantidade === 0;

    return (
      <Pressable
        style={[
          styles.card,
          modoGrid && styles.cardGrid,
        ]}
        onPress={() =>
          router.push(`/produtos/${item.id}`)
        }
      >
        {item.foto ? (
          <Image
            source={{ uri: item.foto }}
            style={styles.image}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons
              name="cube-outline"
              size={24}
              color={Colors.primary[600]}
            />
          </View>
        )}

        <View style={{
          flex: 1,
          alignItems: modoGrid
            ? "center"
            : "flex-start",
        }}>
          <Text style={styles.nome}>
            {item.nome}
          </Text>

          <Text style={styles.info}>
            {item.quantidade} {item.unidade}
          </Text>

          <Text style={styles.info}>
            R$ {item.preco}
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
      </Pressable>
    );
  }
  /*if (isLoading) {
  return <LoadingView />;
}*/

  if (isLoading && produtos.length === 0) {
  return (
    <View style={styles.container}>
      <ProdutoListaSkeleton count={6} />
    </View>
  );
}

if (error) {
  return (
    <ErrorView
      message={error}
      onRetry={carregarProdutos}
    />
  );
}

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={18}
          color={Colors.neutral[400]}
        />

        <TextInput
          placeholder=" Buscar produto..."
          value={busca}
          onChangeText={setBusca}
          style={styles.searchInput}
        />

        <Pressable
          onPress={() =>
            setModoGrid(!modoGrid)
          }
        >
          <Ionicons
            name={
              modoGrid
                ? "list"
                : "grid"
            }
            size={24}
            color={Colors.primary[600]}
          />
        </Pressable>
      </View>


      <View style={styles.filtrosContainer}>
        <Pressable
          style={[
            styles.filtroButton,
            categoriaSelecionada ===
            "todos" &&
            styles.filtroButtonAtivo,
          ]}
          onPress={() =>
            setCategoriaSelecionada(
              "todos"
            )
          }
        >
          <Text
            style={[
              styles.filtroText,
              categoriaSelecionada ===
              "todos" &&
              styles.filtroTextAtivo,
            ]}
          >
            Todos
          </Text>
        </Pressable>

        {categorias.map(
          (categoria) => (
            <Pressable
              key={categoria.id}
              style={[
                styles.filtroButton,
                categoriaSelecionada ===
                categoria.id &&
                styles.filtroButtonAtivo,
              ]}
              onPress={() =>
                setCategoriaSelecionada(
                  categoria.id
                )
              }
            >
              <Text
                style={[
                  styles.filtroText,
                  categoriaSelecionada ===
                  categoria.id &&
                  styles.filtroTextAtivo,
                ]}
              >
                {categoria.nome}
              </Text>
            </Pressable>
          )
        )}

      </View>

      <FlatList
        data={produtosFiltrados}
        numColumns={modoGrid ? 2 : 1}
        key={modoGrid ? "grid" : "list"}
        keyExtractor={(item) => item.id}
        renderItem={renderProduto}
        showsVerticalScrollIndicator={false}
        
        ListEmptyComponent={
          <Text>
            Nenhum produto encontrado
          </Text>
        }
      refreshControl={
  <RefreshControl
    refreshing={refreshing}
    onRefresh={onRefresh}
  />
}/>

      <Pressable
        style={styles.fab}
        onPress={() =>
          router.push("/produtos/novo")
        }
      >
        <Ionicons
          name="add"
          size={30}
          color="white"
        />
      </Pressable>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing[4],
    backgroundColor: Colors.background,
  },

  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing[4],
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing[3],
    marginBottom: Spacing[4],
  },

  searchInput: {
    flex: 1,
    paddingVertical: Spacing[3],
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    padding: Spacing[3],
    borderRadius: Radius.lg,
    marginBottom: Spacing[3],
    gap: Spacing[3],
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: Radius.md,
  },

  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary[100],
    justifyContent: "center",
    alignItems: "center",
  },

  nome: {
    fontWeight: Typography.fontWeight.bold,
    fontSize: Typography.fontSize.md,
  },

  info: {
    color: Colors.textSecondary,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
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

  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary[600],
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing[4],
  },

  cardGrid: {
    flex: 1,
    maxWidth: "48%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  filtrosContainer: {
    flexDirection: "row",
    gap: Spacing[2],
    marginBottom: Spacing[4],
    flexWrap: "wrap",
  },

  filtroButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
  },

  filtroButtonAtivo: {
    backgroundColor: Colors.primary[600],
  },

  filtroText: {
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },

  filtroTextAtivo: {
    color: Colors.white,
  },
});