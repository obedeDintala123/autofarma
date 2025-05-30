import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { Stethoscope } from "phosphor-react-native";

export default function Splash() {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 0.9,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );

        pulse.start();
    }, [scaleAnim]);

    return (
        <View className="flex justify-center items-center min-h-screen bg-white">
            <Animated.View
                style={{
                    transform: [{ scale: scaleAnim }],
                }}
                className="flex flex-col items-center gap-4"
            >
                <View className="p-3 rounded bg-primary">
                    <Stethoscope size={32} color={"#fff"} weight="bold"/>
                </View>
                <Text className="font-poppins font-semibold text-secondary ">
                    Auto Farma
                </Text>
            </Animated.View>
        </View>
    );
}
