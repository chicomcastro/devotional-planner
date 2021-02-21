import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Não tem nada aqui ainda ;-;</Text>
            <Text style={styles.text}>Crie alguma coisa :)</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
    },
    text: {
        margin: 5,
        color: 'gray'
    }
});