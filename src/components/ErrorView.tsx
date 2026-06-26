import { View, Text } from "react-native";
import Button from "./Button";

type Props = {
  message: string;
  onRetry: () => void;
};

export default function ErrorView({
  message,
  onRetry,
}: Props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Algo deu errado
      </Text>

      <Text
        style={{
          marginBottom: 20,
        }}
      >
        {message}
      </Text>

      <Button
        label="Tentar novamente"
        onPress={onRetry}
      />
    </View>
  );
}