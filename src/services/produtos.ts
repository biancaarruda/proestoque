import { api } from "./api";

export async function listarProdutos() {
  const response =
    await api.get("/produtos");

  return response.data;
}

export async function criarProduto(
  data: any
) {
  const response =
    await api.post(
      "/produtos",
      data
    );

  return response.data;
}

export async function atualizarProduto(
  id: string,
  data: any
) {
  const response =
    await api.put(
      `/produtos/${id}`,
      data
    );

  return response.data;
}

export async function excluirProduto(
  id: string
) {
  await api.delete(
    `/produtos/${id}`
  );
}