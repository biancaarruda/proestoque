import {
  View,
  StyleSheet,
} from "react-native";

import Skeleton from "./Skeleton";

import {
  Spacing,
  Radius,
} from "@/src/constants/theme";

export function ProdutoSkeletonItem() {
  return (
    <View style={styles.card}>

      <Skeleton
        width={60}
        height={60}
        borderRadius={Radius.md}
      />

      <View style={styles.info}>

        <Skeleton
          width="70%"
          height={16}
        />

        <Skeleton
          width="40%"
          height={12}
          style={{
            marginTop: 8,
          }}
        />

        <Skeleton
          width="30%"
          height={12}
          style={{
            marginTop: 8,
          }}
        />

      </View>

      <Skeleton
        width={70}
        height={24}
        borderRadius={999}
      />

    </View>
  );
}

export function ProdutoListaSkeleton({
  count = 6,
}: {
  count?: number;
}) {
  return (
    <>
      {Array.from({
        length: count,
      }).map((_, index) => (
        <ProdutoSkeletonItem
          key={index}
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: Spacing[3],
    borderRadius: Radius.lg,
    marginBottom: Spacing[3],
    gap: Spacing[3],
  },

  info: {
    flex: 1,
  },
});