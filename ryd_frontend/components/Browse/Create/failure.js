import React from 'react';
import { View, Text, StyleSheet } from "react-native";

const SuccessPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Please try again to create ride</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B3E8F9',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default SuccessPage;
