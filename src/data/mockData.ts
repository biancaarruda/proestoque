
export type Categoria = {
  id: string;
  nome: string;
  icone: string;
  cor: string;
};

export type Produto = {
  id: string;
  nome: string;
  categoriaId: string;
  quantidade: number;
  quantidadeMinima: number;
  preco: number;
  unidade: string;
};

export const CATEGORIAS_MOCK: Categoria[] = [
  { id: "cat_1", nome: "Bebidas", icone: "cafe-outline", cor: "#7c3aed" },
  { id: "cat_2", nome: "Alimentos", icone: "fast-food-outline", cor: "#059669" },
  { id: "cat_3", nome: "Limpeza", icone: "sparkles-outline", cor: "#0284c7" },
];

export const PRODUTOS_MOCK: Produto[] = [
  {
    id: "1",
    nome: "Café Especial 250g",
    categoriaId: "cat_1",
    quantidade: 4,
    quantidadeMinima: 10,
    preco: 32.9,
    unidade: "un",
  },
  {
    id: "2",
    nome: "Água Mineral 500ml",
    categoriaId: "cat_1",
    quantidade: 48,
    quantidadeMinima: 24,
    preco: 2.5,
    unidade: "un",
  },
  {
    id: "3",
    nome: "Arroz Branco 5kg",
    categoriaId: "cat_2",
    quantidade: 15,
    quantidadeMinima: 5,
    preco: 28,
    unidade: "cx",
  },
  {
    id: "4",
    nome: "Feijão Carioca",
    categoriaId: "cat_2",
    quantidade: 3,
    quantidadeMinima: 8,
    preco: 9.5,
    unidade: "un",
  },
  {
    id: "5",
    nome: "Sabão em Pó",
    categoriaId: "cat_3",
    quantidade: 0,
    quantidadeMinima: 4,
    preco: 24.9,
    unidade: "cx",
  },
    {
    id: "6",
    nome: "Refrigerante Cola 2L",
    categoriaId: "cat_1",
    quantidade: 20,
    quantidadeMinima: 12,
    preco: 8.99,
    unidade: "un",
  },
  {
    id: "7",
    nome: "Macarrão Espaguete 500g",
    categoriaId: "cat_2",
    quantidade: 10,
    quantidadeMinima: 6,
    preco: 4.5,
    unidade: "un",
  },
  {
    id: "8",
    nome: "Óleo de Soja 900ml",
    categoriaId: "cat_2",
    quantidade: 2,
    quantidadeMinima: 5,
    preco: 7.8,
    unidade: "un",
  },
  {
    id: "9",
    nome: "Detergente Líquido",
    categoriaId: "cat_3",
    quantidade: 12,
    quantidadeMinima: 6,
    preco: 2.2,
    unidade: "un",
  },
  {
    id: "10",
    nome: "Desinfetante 1L",
    categoriaId: "cat_3",
    quantidade: 1,
    quantidadeMinima: 3,
    preco: 5.9,
    unidade: "un",
  },

];


export const getProdutosComEstoqueBaixo = () =>
  PRODUTOS_MOCK.filter(
    (p) => p.quantidade < p.quantidadeMinima
  );

export const getValorTotalEstoque = () =>
  PRODUTOS_MOCK.reduce(
    (acc, p) => acc + p.quantidade * p.preco,
    0
  );

export const formatarPreco = (valor: number) =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });