import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet, TextInput, View, FlatList, KeyboardAvoidingView, TouchableOpacity, SectionList, Text } from 'react-native';
import Todo from '../Todo';
import colors from '../utils/colors';

export default class GeneralScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                { key: Math.random().toString(), done: false, title: 'Leitura bíblica', section: 'Leitura bíblica' },
                { key: Math.random().toString(), done: false, title: 'Gratidão', section: 'Leitura bíblica' },
                { key: Math.random().toString(), done: false, title: 'Oração', section: 'Leitura bíblica' },
                { key: Math.random().toString(), done: false, title: 'Decisão', section: 'Leitura bíblica' },
                { key: Math.random().toString(), done: false, title: 'Jejum', section: 'Leitura bíblica' },
            ],
        };
    };

    renderItem = ({ item }) => (
        <Todo
            text={item.title}
            showCheckbox={false}
        />
    );

    render() {
        return (
            <SafeAreaView
                style={styles.container}
            >
                <StatusBar backgroundColor={colors.white} barStyle='dark-content'></StatusBar>
                <Text>Hey hey</Text>
                <FlatList
                    data={this.state.todos}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.key}
                />
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