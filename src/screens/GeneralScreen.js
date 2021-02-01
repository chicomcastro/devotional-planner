import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet, TextInput, View, FlatList, KeyboardAvoidingView, TouchableOpacity, SectionList, Text } from 'react-native';
import SectionHeader from '../SectionHeader';
import Todo from '../Todo';
import colors from '../utils/colors';

export default class GeneralScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                { key: Math.random().toString(), done: false, title: 'Leitura bíblica', date: '2020-01-01' },
                { key: Math.random().toString(), done: false, title: 'Gratidão', date: '2020-01-01' },
                { key: Math.random().toString(), done: false, title: 'Oração', date: '2020-01-02' },
                { key: Math.random().toString(), done: false, title: 'Decisão', date: '2020-01-02' },
                { key: Math.random().toString(), done: false, title: 'Jejum', date: '2020-01-03' },
            ],
        };
    };

    renderItem = ({ item }) => (
        <Todo
            text={item.title}
            showCheckbox={false}
        />
    );

    getSections = () => {
        let todos = [...this.state.todos];
        let sectionsMap = {};
        todos.forEach(todo => {
            if (!sectionsMap[todo.date]) {
                let section = {
                    key: Math.random().toString(),
                    title: new Date(todo.date).toGMTString().slice(0,11),
                    checkable: false,
                    data: [],
                };
                sectionsMap[todo.date] = section;
            }
            sectionsMap[todo.date].data.push(todo);
        });
        return Object.values(sectionsMap);
    }

    render() {
        return (
            <SafeAreaView
                style={styles.container}
            >
                <StatusBar backgroundColor={colors.white} barStyle='dark-content'></StatusBar>
                <SectionList
                    sections={this.getSections()}
                    keyExtractor={(item, index) => item.key + index}
                    renderItem={({ item, index, section }) => 
                        <Todo
                            text={item.title}
                            done={item.done}
                            showCheckbox={section.checkable}
                        />
                    }
                    renderSectionHeader={({ section: { key, title, isEditing } }) => (
                        <SectionHeader
                            title={title}
                        ></SectionHeader>
                    )}
                    renderSectionFooter={() => (
                        <View style={styles.sectionFooter}></View>
                    )}
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