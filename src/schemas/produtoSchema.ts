import { z } from "zod";

export const produtoSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome obrigatório"),

  categoriaId: z
    .string()
    .min(1, "Categoria obrigatória"),

  quantidade: z
    .number()
    .min(0, "Quantidade inválida"),

  quantidadeMinima: z
    .number()
    .min(0, "Quantidade mínima inválida"),

  preco: z
    .string()
    .min(1, "Preço obritatório"),

  unidade: z
    .string()
    .min(1, "Unidade obrigatória"),

  foto: z.string().optional(),
});

export type ProdutoFormData =
  z.infer<typeof produtoSchema>;