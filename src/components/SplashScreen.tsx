import { useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Animated,
} from "react-native";
import {
    Colors,
    Spacing,
    Typography,
    Radius,
} from "@/src/constants/theme";
import LogoProEstoque from "./LogoProEstoque";

export default function SplashScreen() {
    const progress = useRef(
        new Animated.Value(0)
    ).current;
    useEffect(() => {
        Animated.loop(
            Animated.timing(progress, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: false,
            })

        ).start();

    }, []);

    const larguraBarra = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
    });

    return (
        <View style={styles.container}>

            <LogoProEstoque size="lg" />

            <Text style={styles.title}>
                ProEstoque
            </Text>
            <Text style={styles.subtitle}>
                Carregando...
            </Text>
            <View style={styles.progressContainer}>
                <Animated.View
                    style={[
                        styles.progressBar,
                        {
                            width: larguraBarra,
                        },
                    ]}
                />
            </View>
        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
        padding: Spacing[6],
    },

    title: {
        marginTop: Spacing[5],
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: Colors.textPrimary,
    },

    subtitle: {
        marginTop: Spacing[2],
        color: Colors.textSecondary,
        fontSize: Typography.fontSize.md,
    },

    progressContainer: {
        width: "80%",
        height: 10,
        backgroundColor: Colors.neutral[200],
        borderRadius: Radius.full,
        marginTop: Spacing[6],
        overflow: "hidden",
    },

    progressBar: {
        height: "100%",
        backgroundColor: Colors.primary[600],
        borderRadius: Radius.full,
    },

});