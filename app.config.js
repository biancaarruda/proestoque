export default {
  expo: {
    name: "ProEstoque",
    slug: "proestoque",

    extra: {
      apiUrl:
        process.env.EXPO_PUBLIC_API_URL ??
        "http://192.168.1.10:3333/api",
    },
  },
};