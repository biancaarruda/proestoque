import {
  useEffect,
  useState,
} from "react";

import { Categoria } from "@/src/data/mockData";
import { listarCategorias } from "@/src/services/categorias";

export function useCategorias() {
  const [categorias, setCategorias] =
  useState<Categoria[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    carregarCategorias();
  }, []);

  async function carregarCategorias() {
    try {
      const dados =
        await listarCategorias();

      setCategorias(dados);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    categorias,
    loading,
  };
}