import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet, TextInput, View, FlatList, KeyboardAvoidingView, TouchableOpacity, SectionList, Text } from 'react-native';
import colors from '../utils/colors';

export default class GeneralScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    render() {
        return (
            <SafeAreaView
                style={styles.container}
            >
                <StatusBar backgroundColor={colors.white} barStyle='dark-content'></StatusBar>
                <Text>Hey hey</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionList: {
        marginTop: 8,
    },
    sectionFooter: {
        marginBottom: 20,
    },
    sectionFooter: {
        marginBottom: 20,
    },
});