import logo from "../assets/logo.png";
import React, { useState, useRef, useEffect } from "react";
import { View, Image, StyleSheet, Dimensions, Animated } from "react-native";
import { ImageBackground } from "react-native-web";
import Option from '../screens/Option.js';

const { height } = Dimensions.get("window");

export default function Onboarding({ navigation }) {
    const translateY = useRef(new Animated.Value(height)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    useEffect(() => {
        Animated.sequence([
            Animated.timing(translateY, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            }),
            Animated.delay(800),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true
            }),
        ]).start(() => {
            navigation.replace("Option");
        })
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={{
                    transform: [{ translateY }],
                    opacity,
                    alignItems: "center"
                }}>
                <Image
                    source={logo} style={styles.logo}>
                </Image>

            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0228bf",
    },
    logo: {
        height: 128,
        width: 128
    }
});