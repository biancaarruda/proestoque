import { Alert, View } from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import Button from "@/src/components/Button";

import ProductForm from "@/src/components/ProductForm";

import {
  ProdutoFormData,
} from "@/src/schemas/produtoSchema";

import {
  useProducts,
} from "@/src/contexts/ProductsContext";

import { Produto } from "@/src/data/mockData";

export default function EditarProduto() {
  const { id } =
    useLocalSearchParams();

  const router = useRouter();

  const {
    produtos,
    editarProduto,
    excluirProduto,
  } = useProducts();

  const produto = produtos.find(
    (p: Produto) => p.id === String(id)
  );

  if (!produto) {
    return null;
  }

  const produtoSelecionado = produto;

  function handleUpdate(
    data: ProdutoFormData
  ) {
    editarProduto({
      ...produtoSelecionado,
      ...data,
    });

    router.back();
  }

  function handleDelete() {
    Alert.alert(
      "Excluir produto",
      "Deseja realmente excluir?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },

        {
          text: "Excluir",
          style: "destructive",

          onPress: () => {
            if (!produtoSelecionado) return;

            excluirProduto(
              produtoSelecionado.id
            );

            router.back();
          },
        },
      ]
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ProductForm
        submitLabel="Salvar alterações"
        defaultValues={produtoSelecionado}
        onSubmit={handleUpdate}
      />

      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: 20,
        }}
      >
        <Button
          label="Excluir produto"
          variant="danger"
          fullWidth
          onPress={handleDelete}
        />
      </View>
    </View>
  );
}