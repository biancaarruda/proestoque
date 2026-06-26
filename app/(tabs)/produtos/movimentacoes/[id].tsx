import {
  View,
  FlatList,
  Text,
} from "react-native";
import { Stack } from "expo-router";
import {
  useEffect,
  useState,
} from "react";

import {
  useLocalSearchParams,
} from "expo-router";

import {
  criarMovimentacao,
  listarMovimentacoes,
} from "@/src/services/movimentacoes";
import MovimentacaoForm from "@/src/components/MovimentacaoForm";

export default function MovimentacoesScreen() {
  const { id } =
    useLocalSearchParams();

  const [
    movimentacoes,
    setMovimentacoes,
  ] = useState([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const dados =
      await listarMovimentacoes(
        String(id)
      );

    setMovimentacoes(dados);
   
  }

  async function salvarMovimentacao(data: any) {
  await criarMovimentacao(
    String(id),
    data
  );

  carregar();
}

  return (
    
    <View style={{ flex: 1 }}>
      <Stack.Screen
      options={{
        title: "Movimentações",
      }}
    />
    <MovimentacaoForm
      onSubmit={salvarMovimentacao}
    />

    <FlatList
    contentContainerStyle={{
  paddingBottom: 24,
}}
      data={movimentacoes}
      keyExtractor={(item: any) => item.id}
      renderItem={({ item }: any) => (
  <View
    style={{
      backgroundColor: "#FFF",
      marginHorizontal: 16,
      marginBottom: 12,
      borderRadius: 12,
      padding: 16,
      elevation: 2,
    }}
  >
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          fontWeight: "700",
          color:
            item.tipo === "entrada"
              ? "#16A34A"
              : "#DC2626",
        }}
      >
        {item.tipo === "entrada"
          ? "📈 Entrada"
          : "📉 Saída"}
      </Text>

      <Text
        style={{
          fontWeight: "bold",
        }}
      >
        {item.quantidade}
      </Text>
    </View>

    {item.observacao ? (
      <Text
        style={{
          marginTop: 8,
          color: "#555",
        }}
      >
        {item.observacao}
      </Text>
    ) : null}

    <Text
      style={{
        marginTop: 8,
        fontSize: 12,
        color: "#999",
      }}
    >
      {new Date(item.criadoEm).toLocaleString()}
    </Text>
  </View>
)}
    />
  </View>

);
}