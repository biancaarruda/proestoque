import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
    id: string;
    nome: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, senha: string) => Promise<void>;
    register: (nome: string, email: string, senha: string) => Promise<void>;
    logout: () => Promise<void>;
};

const STORAGE_KEYS = {
    TOKEN: "@proestoque:token",
    USER: "@proestoque:user",
    USERS: "@proestoque:users",
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function carregarSessao() {
            const inicio = Date.now();
            try {
                const [tokenSalvo, userString] =
                    await AsyncStorage.multiGet([
                        STORAGE_KEYS.TOKEN,
                        STORAGE_KEYS.USER,
                    ]);

                const token = tokenSalvo[1];

                const user = userString[1]
                    ? JSON.parse(userString[1])
                    : null;

                if (token && user) {
                    setToken(token);
                    setUser(user);
                }
            } catch (error) {
                console.warn("Erro ao carregar sessão:", error);
            } finally {
                const tempoCarregamento =
                    Date.now() - inicio;

                const tempoRestante =
                    Math.max(
                        1500 - tempoCarregamento,
                        0
                    );

                setTimeout(() => {
                    setIsLoading(false);
                }, tempoRestante);
            }
        }

        carregarSessao();
    }, []);

    const login = useCallback(
        async (
            email: string,
            senha: string
        ) => {
            setIsLoading(true);
            try {
                await new Promise((resolve) =>
                    setTimeout(resolve, 500)
                );

                if (!email || !senha) {
                    throw new Error("Preencha os campos");
                }

                const usuariosSalvos =
                    await AsyncStorage.getItem(
                        STORAGE_KEYS.USERS
                    );

                const usuarios = usuariosSalvos
                    ? JSON.parse(usuariosSalvos)
                    : [];

                const usuarioEncontrado = usuarios.find(
                    (u: any) =>
                        u.email === email &&
                        u.senha === senha
                );

                if (!usuarioEncontrado) {
                    throw new Error("Usuário não encontrado");
                }

                const tokenSimulado =
                    "token_" + Date.now();

                await AsyncStorage.multiSet([
                    [STORAGE_KEYS.TOKEN, tokenSimulado],
                    [
                        STORAGE_KEYS.USER,
                        JSON.stringify(usuarioEncontrado),
                    ],
                ]);

                setToken(tokenSimulado);
                setUser(usuarioEncontrado);

            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const register = useCallback(
        async (
            nome: string,
            email: string,
            senha: string
        ) => {
            setIsLoading(true);
            try {
                await new Promise((resolve) =>
                    setTimeout(resolve, 500)
                );

                if (!nome || !email || !senha) {
                    throw new Error("Preencha todos os campos");
                }

                const usuariosSalvos =
                    await AsyncStorage.getItem(
                        STORAGE_KEYS.USERS
                    );

                const usuarios = usuariosSalvos
                    ? JSON.parse(usuariosSalvos)
                    : [];

                const novoUsuario = {
                    id: "user_" + Date.now(),
                    nome,
                    email,
                    senha,
                };

                usuarios.push(novoUsuario);

                await AsyncStorage.setItem(
                    STORAGE_KEYS.USERS,
                    JSON.stringify(usuarios)
                );

                const tokenSimulado =
                    "token_" + Date.now();

                await AsyncStorage.multiSet([
                    [STORAGE_KEYS.TOKEN, tokenSimulado],
                    [
                        STORAGE_KEYS.USER,
                        JSON.stringify(novoUsuario),
                    ],
                ]);

                setToken(tokenSimulado);
                setUser(novoUsuario);

            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const logout = useCallback(async () => {
        await AsyncStorage.multiRemove([
            STORAGE_KEYS.TOKEN,
            STORAGE_KEYS.USER,
        ]);

        setToken(null);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoading,
                isAuthenticated: !!token,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth deve ser usado dentro do AuthProvider"
        );
    }

    return context;
}