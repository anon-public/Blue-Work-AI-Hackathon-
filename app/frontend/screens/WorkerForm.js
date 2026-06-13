import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";


export default function WorkerForm({ navigation }) {
    const [bool, setbool] = useState('');
    const [name, setname] = useState('');
    const [age, setage] = useState('');
    const [category, setcategory] = useState('');
    const [area, setarea] = useState('');
    const [avb_dist, setavb_dist] = useState('');


    const handleBool = (val) => {
        setbool(val);
    }

    const [form, setfrom] = useState({
        name: "",
        age: "",
        category: "",
        area: "",
        avb_dist: "",
        // avb: ""
    })

    // const handleChange = (field, value) => {
    //     setfrom((prev) => ({
    //         ...prev,
    //         [field]: value,
    //     }));
    // };

    const handleSubmit = () => {
        if (name == "" || age == "" || category == "" || area == "" || avb_dist == "") {
            Alert.alert("Error", "Please fill all the fields");
            return;
        }
        console.log("Clicked");
        navigation.navigate("WorkerDashboard", {
            name, age, category, area, avb_dist
        });


    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, paddingTop: 50, ...styles.container }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    padding: 20,
                }}

                keyboardShouldPersistTaps="handled">
                {/* <View style={styles.container}> */}
                <Text style={styles.title}>Add Your{'\n'} Details</Text>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    id="NAME"
                    style={styles.input}
                    value={name}
                    onChangeText={setname}
                    placeholder="Enter name"

                />
                <Text style={styles.label}>Age</Text>
                <TextInput
                    id="AGE"
                    style={styles.input}
                    value={age}
                    onChangeText={setage}
                    placeholder="Enter age"
                    keyboardType="numeric"
                />
                <Text style={styles.label}>Category</Text>
                <TextInput
                    id="CATEGORY"
                    style={styles.input}
                    value={category}
                    onChangeText={setcategory}
                    placeholder="Enter your best skills e.g Technician"
                />
                <Text style={styles.label}>Area</Text>
                <TextInput
                    id="AREA"
                    style={styles.input}
                    value={area}
                    onChangeText={setarea}
                    placeholder="Enter your shop location"
                    keyboardType="text"
                />
                <Text style={styles.label}>Available Distance</Text>
                <TextInput
                    id="AVB_DIST"
                    style={styles.input}
                    value={avb_dist}
                    onChangeText={setavb_dist}
                    placeholder="Provide your availabe distance e.g 4 km"
                    keyboardType="numeric"
                />
                {/* <Text style={styles.label}>Avalablility</Text> */}
                {/* <TextInput
                id="AVB"
                style={styles.input}
                value={form.avb}
                onChangeText={(boolean) => handleChange("avb", boolean}
                placeholder="Enter avalability status"
                keyboardType="boolean"
            /> */}
                {/* <Pressable style={styles.subbtn} onPress={() => handleBool(true)}>
                <Text style={styles.label}>YES</Text>
            </Pressable>
            <Pressable style={styles.subbtn} onPress={() => handleBool(false)}>
                <Text style={styles.label}>NO, but later will be!</Text>
            </Pressable> */}

                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </Pressable>

                {/* </View > */}
            </ScrollView>
        </KeyboardAvoidingView>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#62c2e53a",
    },
    title: {
        padding: 5,
        fontFamily: "Boldonse",
        fontSize: 56,
        fontWeight: 900
    },
    label: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 6,
        color: "#111827",
    },
    input: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#89c5fd",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#3d7e96",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",

    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "700",
        outlineColor: "#000"
    },
    subbtn: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#89c5fd",
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 12,
        marginBottom: 16,
    }
});