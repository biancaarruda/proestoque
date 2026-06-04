import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { Ionicons } from "@expo/vector-icons";

import {
  Colors,
  Radius,
  Spacing,
} from "@/src/constants/theme";

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

export default function ImagePickerField({
  value,
  onChange,
}: Props) {

  async function selecionarImagem() {

    const permissao =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita acesso às fotos."
      );

      return;
    }

    const resultado =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
      });

    if (!resultado.canceled) {
      onChange(resultado.assets[0].uri);
    }
  }

  return (
    <Pressable
      style={styles.container}
      onPress={selecionarImagem}
    >
      {value ? (
        <Image
          source={{ uri: value }}
          style={styles.image}
        />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons
            name="image-outline"
            size={32}
            color={Colors.primary[600]}
          />

          <Text>
            Selecionar foto
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing[4],
  },

  image: {
    width: "100%",
    height: 200,
    borderRadius: Radius.lg,
  },

  placeholder: {
    height: 200,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing[2],
  },
});