import { api } from "./api";
import { Produto } from "@/src/data/mockData";

export async function listarProdutos(): Promise<Produto[]> {
  const response = await api.get<Produto[]>("/produtos");

  return response.data;
}

export async function criarProduto(
  data: Omit<Produto, "id">
): Promise<Produto> {
  const response = await api.post<Produto>(
    "/produtos",
    data
  );

  return response.data;
}

export async function atualizarProduto(
  id: string,
  data: Produto
): Promise<Produto> {
  const response = await api.put<Produto>(
    `/produtos/${id}`,
    data
  );

  return response.data;
}

export async function excluirProduto(
  id: string
): Promise<void> {
  await api.delete(`/produtos/${id}`);
}
/*
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
*/