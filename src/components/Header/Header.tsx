import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const staticInfo = {
    name: "Welcome!",
};
const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.name}>{`${staticInfo.name}`}</Text>
                <Text style={styles.subtitle}>Welcome back to your goal</Text>
            </View>
            <View style={styles.rightContainer}>
                <Image source={require("../../assets/logo-app-calorias.jpg")} style={styles.profileImage} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        
    },
    leftContainer: {
        flex: 1,
        justifyContent: "center",
    },
    name: {
        color: "#444",
        fontWeight: "bold",
        fontSize: 24,
        marginLeft: 10
    },
    subtitle: {
     color: "#333",
     marginLeft: 5
    },
    rightContainer: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 50
    }
})


export default Header