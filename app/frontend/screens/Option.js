import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable, Button } from "react-native";


export default function Option({ navigation }) {
    const [selected, setselected] = useState("");

    const handleProceed = () => {
        if (selected === "WorkerFrom") {
            navigation.replace("WorkerFrom");
        }
        else if (selected === "NavTabs") {
            navigation.replace("NavTabs");
        }
        else {
            alert("Please slect an option!");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose the best option that aligns with your profession</Text>
            <Pressable
                style={[styles.optCard, , selected === "WorkerFrom" && styles.actvcard]}
                onPress={() => setselected("WorkerFrom")}
            >
                <Text style={styles.Text}>Ready to be hired?</Text>
            </Pressable>

            <Pressable
                style={[styles.optCard, , selected === "NavTabs" && styles.actvcard]}
                onPress={() => setselected("NavTabs")}
            >
                <Text style={styles.Text}>Finding to hire someone?</Text>
            </Pressable>

            <Pressable style={[styles.btn, { borderBottomWidth: 1, borderBottomColor: "#000" }]}
                onPress={() => handleProceed()}
            >
                <Text style={styles.btn_text}>Proceed</Text>
            </Pressable>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        padding: 24,
        justifyContent: "center"
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    optCard: {
        backgroundColor: "#afafaf2c",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 28,
        borderRadius: 3,
        marginBottom: 16,
        elevation: 2,
        borderColor: "#3d7e96"
    },
    actvcard: {
        borderColor: "#3d7e96",
        borderWidth: 2
    },
    text: {
        fontSize: 16,
        color: "#3d7e96",
        fontWeight: 600
    },
    btn: {
        padding: 2,
        backgroundColor: "#3d7e96",
        justifyContent: "left",
        borderColor: "#afafaf2c",
        borderRadius: 10,
        maxWidth: 150,
        position: "absolute",
        bottom: 70,
        right: 25
    },
    btn_text: {
        fontFamily: "Arial",
        padding: 6,
        textAlign: "center",
        fontSize: 18,
        fontWeight: 700,
        color: "#ffffff"
    }
})

