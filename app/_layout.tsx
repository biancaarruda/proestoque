import { useEffect } from "react";

import {
  Stack,
  useRouter,
  useSegments,
} from "expo-router";

import SplashScreen from "@/src/components/SplashScreen";

import {
  AuthProvider,
  useAuth,
} from "@/src/contexts/AuthContext";
import { ProductsProvider } from "@/src/contexts/ProductsContext";

import {
  solicitarPermissaoNotificacoes,
  agendarVerificacaoDiaria,
} from "@/src/services/notifications";

function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>

      <NavigationGuard />
    </>
  );
}

function NavigationGuard() {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const estaNoGrupoAuth =
      segments[0] === "(auth)";

    if (
      !isAuthenticated &&
      !estaNoGrupoAuth
    ) {
      router.replace("/(auth)/login");
    }

    else if (
      isAuthenticated &&
      estaNoGrupoAuth
    ) {
      router.replace("/(tabs)");
    }
  }, [
    isAuthenticated,
    isLoading,
    segments,
  ]);

  useEffect(() => {
  async function configurar() {
    const permitido =
      await solicitarPermissaoNotificacoes();

    if (permitido) {
      await agendarVerificacaoDiaria();
    }
  }

  if (isAuthenticated) {
    configurar();
  }
}, [isAuthenticated]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return null;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <AppContent />
      </ProductsProvider>
    </AuthProvider>
  );
}