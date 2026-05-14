import { useState, useMemo } from "react";

import {
  View,
  Text,
  FlatList,
  SectionList,
  TextInput,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import { FontAwesome, Ionicons } from "@expo/vector-icons";

import {
  PRODUTOS_MOCK,
  CATEGORIAS_MOCK,
  type Produto,
} from "@/src/data/mockData";

import {
  Colors,
  Spacing,
  Radius,
  Typography,
} from "@/src/constants/theme";

type Secao = {
  title: string;
  categoriaId: string;
  data: Produto[];
};

export default function Produtos() {

  const [busca, setBusca] = useState("");

  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState<string | null>(null);

  const [modoAgrupado, setModoAgrupado] =
    useState(false);

  const [modoGrade, setModoGrade] =
    useState(false);

  const { width } = useWindowDimensions();

  const COLUNAS = modoGrade ? 2 : 1;

  const ITEM_WIDTH =
    (width - Spacing[4] * 2) / COLUNAS;


  const produtosFiltrados = useMemo(() => {

    return PRODUTOS_MOCK.filter((p) => {

      const matchNome =
        p.nome
          .toLowerCase()
          .includes(busca.toLowerCase());

      const matchCategoria =
        categoriaSelecionada
          ? p.categoriaId === categoriaSelecionada
          : true;

      return matchNome && matchCategoria;

    });

  }, [busca, categoriaSelecionada]);

  const secoes: Secao[] = useMemo(() => {

    return CATEGORIAS_MOCK.map((categoria) => ({

      title: categoria.nome,

      categoriaId: categoria.id,

      data: produtosFiltrados.filter(
        (p) =>
          p.categoriaId === categoria.id
      ),

    })).filter(
      (secao) => secao.data.length > 0
    );

  }, [produtosFiltrados]);


  const renderProduto = ({
    item,
  }: {
    item: Produto;
  }) => {

    const emAlerta =
      item.quantidade <
      item.quantidadeMinima;

    const semEstoque =
      item.quantidade === 0;

    return (

      <View
        style={[
          styles.item,
          {
            width:
              modoGrade
                ? ITEM_WIDTH
                : "100%",
          },
        ]}
      >

        <View style={styles.row}>

          <Ionicons
            name="cube-outline"
            size={20}
            color={Colors.primary[600]}
          />

          <View style={{ flex: 1 }}>

            <Text style={styles.nome}>
              {item.nome}
            </Text>

            <Text>
              {item.quantidade}{" "}
              {item.unidade}
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

      </View>

    );

  };

  const renderSectionHeader = ({
    section,
  }: {
    section: Secao;
  }) => (

    <View style={styles.sectionHeader}>

      <Text style={styles.sectionTitle}>
        {section.title}
      </Text>

      <Text style={styles.sectionCount}>
        {section.data.length} itens
      </Text>

    </View>

  );

  return (

    <View
      style={{
        flex: 1,
        padding: Spacing[4],
      }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Produtos</Text>

        <Pressable>
          <FontAwesome
            name="plus-square-o"
            size={26}
            color={Colors.primary[600]}
          />
        </Pressable>
      </View>


      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={18}
          color={Colors.neutral[400]}
        />

        <TextInput
          placeholder="Buscar produtos..."
          value={busca}
          onChangeText={setBusca}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.searchInput}
        />
      </View>


      <View style={styles.chips}>

        <Pressable
          onPress={() =>
            setCategoriaSelecionada(null)
          }
          style={styles.chip}
        >

          <Ionicons
            name="apps-outline"
            size={16}
            color={
              categoriaSelecionada === null
                ? Colors.primary[600]
                : Colors.neutral[400]
            }
          />

          <Text>Todos</Text>

        </Pressable>

        {CATEGORIAS_MOCK.map((c) => (

          <Pressable
            key={c.id}
            onPress={() =>
              setCategoriaSelecionada(c.id)
            }
            style={styles.chip}
          >

            <Ionicons
              name={c.icone as any}
              size={16}
              color={
                categoriaSelecionada === c.id
                  ? Colors.primary[600]
                  : Colors.neutral[400]
              }
            />

            <Text>{c.nome}</Text>

          </Pressable>

        ))}

      </View>


      <View style={styles.toggles}>

        <Pressable
          onPress={() =>
            setModoAgrupado((v) => !v)
          }
        >
          <Ionicons
            name="list"
            size={25}
            color={Colors.primary[600]}
          />
        </Pressable>

        <Pressable
          onPress={() =>
            setModoGrade((v) => !v)
          }
        >
          <Ionicons
            name="grid-outline"
            size={24}
            color={Colors.primary[600]}
          />
        </Pressable>

      </View>

      {modoAgrupado ? (

        <SectionList<Produto, Secao>
          sections={secoes}
          keyExtractor={(item) =>
            item.id
          }

          renderItem={renderProduto}
          renderSectionHeader={
            renderSectionHeader
          }

          stickySectionHeadersEnabled
          ListEmptyComponent={
            <Text>
              Nenhum produto encontrado
            </Text>
          }

        />

      ) : (

        <FlatList
          key={modoGrade ? "grid" : "list"}
          data={produtosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={renderProduto}
          numColumns={COLUNAS}
          ListEmptyComponent={
            <Text>
              Nenhum produto encontrado
            </Text>
          }
        />

      )}

    </View>

  );

}

const styles = StyleSheet.create({

  input: {
    backgroundColor: Colors.surface,
    padding: Spacing[3],
    borderRadius: Radius.lg,
    marginBottom: Spacing[3],
  },

  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing[3],
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing[2],
    marginBottom: Spacing[3],
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing[1],
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },

  toggles: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Spacing[3],
    marginBottom: Spacing[3],
  },

  item: {
    backgroundColor: Colors.surface,
    padding: Spacing[3],
    borderRadius: Radius.lg,
    marginBottom: Spacing[2],
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing[2],
  },

  nome: {
    fontWeight:
      Typography.fontWeight.semibold,
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

  sectionHeader: {
    backgroundColor: Colors.surface,
    padding: Spacing[2],
    borderRadius: Radius.md,
    marginTop: Spacing[3],
  },

  sectionTitle: {
    fontWeight:
      Typography.fontWeight.bold,
  },

  sectionCount: {
    color: Colors.textSecondary,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing[3],
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing[3],
    borderRadius: Radius.lg,
    marginBottom: Spacing[3],
    gap: Spacing[2],
  },

  searchInput: {
    flex: 1,
    paddingVertical: Spacing[3],
  },

});