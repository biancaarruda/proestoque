export function formatarPreco(
  valor: number
) {
  return valor.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );
}

export function formatarData(
  data: string
) {
  return new Date(data)
    .toLocaleDateString("pt-BR");
}

export function formatarQuantidade(
  quantidade: number,
  unidade: string
) {
  return `${quantidade} ${unidade}`;
}