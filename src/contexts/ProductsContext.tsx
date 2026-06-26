import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  excluirProduto as deleteProduto,
} from "@/src/services/produtos";
import { Produto } from "../data/mockData";
import axios from "axios";

import {
  notificarEstoqueCritico,
  limparBadge,
} from "@/src/services/notifications";

type ProductsContextType = {
  produtos: Produto[];

  isLoading: boolean;

  error: string | null;

  carregarProdutos: () => Promise<void>;

  adicionarProduto: (
    produto: Omit<Produto, "id">
  ) => Promise<void>;

  editarProduto: (
    produto: Produto
  ) => Promise<void>;

  excluirProduto: (
    id: string
  ) => Promise<void>;
};

type State = {
  produtos: Produto[];
};

type Action =
  | {
    type: "LOAD";
    payload: Produto[];
  }
  | {
    type: "ADD";
    payload: Produto;
  }
  | {
    type: "UPDATE";
    payload: Produto;
  }
  | {
    type: "DELETE";
    payload: string;
  };

const ProductsContext =
  createContext<ProductsContextType | null>(
    null
  );

function reducer(
  state: State,
  action: Action
): State {
  switch (action.type) {
    case "LOAD":
      return {
        produtos: action.payload,
      };

    case "ADD":
      return {
        produtos: [
          action.payload,
          ...state.produtos,
        ],
      };

    case "UPDATE":
      return {
        produtos: state.produtos.map(
          (produto) =>
            produto.id === action.payload.id
              ? action.payload
              : produto
        ),
      };

    case "DELETE":
      return {
        produtos: state.produtos.filter(
          (produto) =>
            produto.id !== action.payload
        ),
      };

    default:
      return state;
  }
}

export function ProductsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(
    reducer,
    {
      produtos: [],
    }
  );
  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      carregarProdutos();
    }
  }, [isAuthenticated]);

  async function carregarProdutos() {
  try {
    setIsLoading(true);
    setError(null);

    const produtos = await listarProdutos();

    dispatch({
      type: "LOAD",
      payload: produtos,
    });

    const criticos = produtos.filter(
  (produto) =>
    produto.quantidade <
    produto.quantidadeMinima
);

if (criticos.length > 0) {
  await notificarEstoqueCritico(
    criticos
  );
} else {
  await limparBadge();
}

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        setError("Erro de conexão");
      } else {
        setError(
          error.response.data?.erro ??
          "Algo deu errado"
        );
      }
    } else {
      setError("Algo deu errado");
    }

  } finally {
    setIsLoading(false);
  }
}

  async function adicionarProduto(
    produto: Omit<Produto, "id">
  ) {
    const novoProduto =
      await criarProduto(produto);

    dispatch({
      type: "ADD",
      payload: novoProduto,
    });
  }

  async function editarProduto(
    produto: Produto
  ) {
    const atualizado =
      await atualizarProduto(
        produto.id,
        produto
      );

    dispatch({
      type: "UPDATE",
      payload: atualizado,
    });
  }

  async function excluirProduto(
    id: string
  ) {
    await deleteProduto(id);

    dispatch({
      type: "DELETE",
      payload: id,
    });
  }

  return (
    <ProductsContext.Provider
      value={{
        produtos: state.produtos,
        isLoading,
        error,
        carregarProdutos,
        adicionarProduto,
        editarProduto,
        excluirProduto,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context =
    useContext(ProductsContext);

  if (!context) {
    throw new Error(
      "useProducts deve ser usado dentro do ProductsProvider"
    );
  }

  return context;
}