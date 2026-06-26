import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
} from "react-native";

import {
  useState,
} from "react";

import { Picker } from "@react-native-picker/picker";

type Props = {
  onSubmit: (
    data: {
      tipo: "entrada" | "saida";
      quantidade: number;
      observacao?: string;
    }
  ) => void;
};

export default function MovimentacaoForm({
  onSubmit,
}: Props) {
  const [tipo, setTipo] =
    useState<"entrada" | "saida">(
      "entrada"
    );

  const [quantidade, setQuantidade] =
    useState("");

  const [observacao, setObservacao] =
    useState("");

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Nova movimentação
      </Text>

      <Text style={styles.label}>
        Tipo
      </Text>

      <View style={styles.picker}>
        <Picker
          selectedValue={tipo}
          onValueChange={(value) =>
            setTipo(value)
          }
        >
          <Picker.Item
            label="📈 Entrada"
            value="entrada"
          />
          <Picker.Item
            label="📉 Saída"
            value="saida"
          />
        </Picker>
      </View>

      <Text style={styles.label}>
        Quantidade
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 10"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <Text style={styles.label}>
        Observação
      </Text>

      <TextInput
        style={[
          styles.input,
          { height: 80 }
        ]}
        multiline
        placeholder="Opcional"
        value={observacao}
        onChangeText={setObservacao}
      />

      <Button
        title="Salvar movimentação"
        onPress={() => {
          onSubmit({
            tipo,
            quantidade: Number(quantidade),
            observacao,
          });

          setQuantidade("");
          setObservacao("");
          setTipo("entrada");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 12,
    elevation: 2,
    gap: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },

  label: {
    fontWeight: "600",
    color: "#555",
  },

  picker: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    overflow: "hidden",
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
  },
});