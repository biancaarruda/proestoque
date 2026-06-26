import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function solicitarPermissaoNotificacoes() {

  if (!Device.isDevice) {
    console.log(
      "Notificações funcionam apenas em aparelho físico."
    );
    return false;
  }

  const { status: atual } =
    await Notifications.getPermissionsAsync();

  if (atual === "granted") {
    return true;
  }

  const { status } =
    await Notifications.requestPermissionsAsync();

  return status === "granted";
}

export async function notificarEstoqueCritico(
  produtos: Array<{
    nome: string;
    quantidade: number;
    quantidadeMinima: number;
  }>
) {

  const permitido =
    await solicitarPermissaoNotificacoes();

  if (!permitido) return;

  if (produtos.length === 0) return;

  const lista =
    produtos.slice(0, 3);

  for (const produto of lista) {

    await Notifications.scheduleNotificationAsync({

      content: {
        title: "⚠️ Estoque crítico",

        body:
          `${produto.nome}: ` +
          `${produto.quantidade}/${produto.quantidadeMinima}`,

        badge: produtos.length,
      },

      trigger: null,
    });

  }

  if (produtos.length > 3) {

    await Notifications.scheduleNotificationAsync({

      content: {
        title: "⚠️ Mais produtos",

        body:
          `Existem ${
            produtos.length - 3
          } outros produtos em estoque crítico.`,

        badge: produtos.length,
      },

      trigger: null,
    });

  }
}

export async function agendarVerificacaoDiaria() {

  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({

    content: {

      title: "📦 ProEstoque",

      body:
        "Confira o estoque do dia.",

    },

    trigger: {
      hour: 8,
      minute: 0,
      repeats: true,
    } as any,

  });

}

export async function limparBadge() {

  await Notifications.setBadgeCountAsync(
    0
  );

}