import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Produto,
  PRODUTOS_MOCK,
} from "@/src/data/mockData";

type ProductsContextType = {
  produtos: Produto[];

  adicionarProduto: (
    produto: Omit<Produto, "id">
  ) => void;

  editarProduto: (
    produto: Produto
  ) => void;

  excluirProduto: (
    id: string
  ) => void;
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

const STORAGE_KEY =
  "@proestoque:produtos";

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

  useEffect(() => {
    carregarProdutos();
  }, []);

  useEffect(() => {
    salvarProdutos();
  }, [state.produtos]);

  async function carregarProdutos() {
    try {
      const dados =
        await AsyncStorage.getItem(
          STORAGE_KEY
        );

      if (dados) {
        dispatch({
          type: "LOAD",
          payload: JSON.parse(dados),
        });
      } else {
        dispatch({
          type: "LOAD",
          payload: PRODUTOS_MOCK,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function salvarProdutos() {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state.produtos)
      );
    } catch (error) {
      console.log(error);
    }
  }

  function adicionarProduto(
    produto: Omit<Produto, "id">
  ) {
    dispatch({
      type: "ADD",
      payload: {
        ...produto,
        id: Date.now().toString(),
      },
    });
  }

  function editarProduto(
    produto: Produto
  ) {
    dispatch({
      type: "UPDATE",
      payload: produto,
    });
  }

  function excluirProduto(
    id: string
  ) {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  }

  return (
    <ProductsContext.Provider
      value={{
        produtos: state.produtos,
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