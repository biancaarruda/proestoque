import { useRouter } from "expo-router";

import ProductForm from "@/src/components/ProductForm";

import { ProdutoFormData } from "@/src/schemas/produtoSchema";

import { useProducts } from "@/src/contexts/ProductsContext";

export default function NovoProduto() {
  const router = useRouter();

  const { adicionarProduto } =
    useProducts();

  async function handleCreate(
    data: ProdutoFormData
  ) { await adicionarProduto(data);

    router.back();
  }

  return (
    <ProductForm
      submitLabel="Salvar"
      onSubmit={handleCreate}
    />
  );
}