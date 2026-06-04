import { ScrollView, Text } from "react-native";

import {
  Controller,
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import ImagePickerField from "@/src/components/ImagePickerField";
import { Picker } from "@react-native-picker/picker";
import {
  CATEGORIAS_MOCK,
} from "@/src/data/mockData";
import {
  produtoSchema,
  ProdutoFormData,
} from "@/src/schemas/produtoSchema";

type Props = {
  defaultValues?: ProdutoFormData;

  onSubmit: (
    data: ProdutoFormData
  ) => void;

  submitLabel: string;
};

export default function ProductForm({
  defaultValues,
  onSubmit,
  submitLabel,
}: Props) {
  const {
    control,
    handleSubmit,
  } = useForm<ProdutoFormData>({
    resolver:
      zodResolver(produtoSchema),
    defaultValues: defaultValues ?? {
      nome: "",
      categoriaId: "",
      quantidade: 0,
      quantidadeMinima: 0,
      preco: "",
      unidade: "",
      foto: "",
    },
  });

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
      }}
    >
      <Controller
        control={control}
        name="foto"
        render={({
          field: {
            value,
            onChange,
          },
        }) => (
          <ImagePickerField
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="nome"
        render={({
          field: {
            value,
            onChange,
          },
          fieldState: {
            error,
          },
        }) => (
          <Input
            label="Nome"
            value={value}
            onChangeText={onChange}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="categoriaId"
        render={({
          field: {
            value,
            onChange,
          },
          fieldState: {
            error,
          },
        }) => (
          <>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
            >
              <Picker.Item
                label="Selecione uma categoria"
                value=""
              />

              {CATEGORIAS_MOCK.map((categoria) => (
                <Picker.Item
                  key={categoria.id}
                  label={categoria.nome}
                  value={categoria.id}
                />
              ))}
            </Picker>

            {error && (
              <Text
                style={{
                  color: "red",
                  marginBottom: 10,
                }}
              >
                {error.message}
              </Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="quantidade"
        render={({
          field: {
            value,
            onChange,
          },
          fieldState: {
            error,
          },
        }) => (
          <Input
            label="Quantidade"
            keyboardType="numeric"
            value={String(value)}
            onChangeText={(text) =>
              onChange(Number(text))
            }
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="quantidadeMinima"
        render={({
          field: {
            value,
            onChange,
          },
          fieldState: {
            error,
          },
        }) => (
          <Input
            label="Quantidade mínima"
            keyboardType="numeric"
            value={String(value)}
            onChangeText={(text) =>
              onChange(Number(text))
            }
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="preco"
        render={({
          field: {
            value,
            onChange,
          },
          fieldState: {
            error,
          },
        }) => (
          <Input
            label="Preço"
            keyboardType="decimal-pad"
            value={value}
            onChangeText={onChange}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="unidade"
        render={({
          field: {
            value,
            onChange,
          },
          fieldState: {
            error,
          },
        }) => (
          <Input
            label="Unidade"
            value={value}
            onChangeText={onChange}
            error={error?.message}
          />
        )}
      />

      <Button
        label={submitLabel}
        fullWidth
        onPress={handleSubmit(onSubmit)}
      />
    </ScrollView>
  );
}