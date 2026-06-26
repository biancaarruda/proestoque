import { api } from "./api";

export async function criarMovimentacao(
  produtoId: string,
  data: {
    tipo: "entrada" | "saida";
    quantidade: number;
    observacao?: string;
  }
) {
  const response =
    await api.post(
      `/produtos/${produtoId}/movimentacao`,
      data
    );

  return response.data;
}

export async function listarMovimentacoes(
  produtoId: string
) {
  const response =
    await api.get(
      `/produtos/${produtoId}/movimentacoes`
    );

  return response.data;
}