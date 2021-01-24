import React from 'react';
import { StyleSheet, TextInput, View, FlatList, KeyboardAvoidingView, TouchableOpacity, SectionList, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Todo from '../Todo.js';
import { DatePicker } from '../DatePicker.js';
import colors from '../utils/colors.js';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                { key: Math.random().toString(), done: false, text: 'Leitura bíblica', section: 'Leitura bíblica' },
                { key: Math.random().toString(), done: false, text: 'Gratidão', section: 'Leitura bíblica' },
                { key: Math.random().toString(), done: false, text: 'Oração', section: 'Leitura bíblica' },
                { key: Math.random().toString(), done: false, text: 'Decisão', section: 'Leitura bíblica' },
                { key: Math.random().toString(), done: false, text: 'Jejum', section: 'Leitura bíblica' },
            ],
            sections: [
                {
                    key: Math.random().toString(),
                    title: "Leitura bíblica",
                    checkable: false,
                },
            ],
            textInput: '',
            date: new Date(1598051730000),
            mode: 'date',
            show: false,
        };
    };

    submitTodo = (key, textInput) => {
        let todos = [...this.state.todos];
        let currentItemIndex = this.state.todos.findIndex(todo => todo.key === key);
        todos[currentItemIndex] = {
            ...todos[currentItemIndex],
            isEditing: false,
            text: textInput,
        };
        this.setState({ todos: todos });
    };

    requestEdit = (key) => {
        let todos = [...this.state.todos];
        let currentItemIndex = this.state.todos.findIndex(todo => todo.key === key);
        todos[currentItemIndex] = {
            ...todos[currentItemIndex],
            isEditing: true,
        };
        this.setState({ todos: todos });
    };

    toggleCheck = (key) => {
        this.setState(({ todos }) => ({
            todos: todos.map(todo => {
                if (todo.key === key) {
                    todo.done = !todo.done;
                }
                return todo;
            }),
        }));
    }

    deleteTask = (key) => {
        this.setState(({ todos }) => ({
            todos: todos.filter(todo => todo.key !== key),
        }));
    }

    getSections = () => {
        let todos = [...this.state.todos];
        let sectionsProps = [...this.state.sections];
        let sectionsList = sectionsProps.map(section => { return { ...section, data: [] } });
        let sectionsMap = {};
        sectionsList.forEach(section => sectionsMap[section.title] = section);
        todos.forEach(todo => sectionsMap[todo.section].data.push(todo));
        return sectionsList;
    }

    addItemToSection = (sectionKey) => {
        let section = this.state.sections.find(section => section.key === sectionKey);
        this.setState(({ todos }) => ({
            todos: [...todos, { key: Math.random().toString(), done: false, text: '', section: section.title, isEditing: true }],
        }));
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
            >
                <DatePicker></DatePicker>
                <SectionList
                    style={styles.sectionList}
                    sections={this.getSections()}
                    keyExtractor={(item, index) => item.key + index}
                    renderItem={({ item, index, section }) => (
                        <Todo
                            text={item.text}
                            done={item.done}
                            showCheckbox={section.checkable}
                            onSubmitTodo={(textInput) => this.submitTodo(item.key, textInput)}
                            onToggleCheck={() => this.toggleCheck(item.key, section)}
                            onDeleteTask={() => this.deleteTask(item.key, section)}
                            isEditing={item.isEditing}
                            requestEdit={() => this.requestEdit(item.key)}
                        />
                    )}
                    renderSectionHeader={({ section: { key, title } }) => (
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionHeaderTitle}>{title}</Text>
                            <TouchableOpacity style={styles.sectionHeaderButton} onPress={() => { this.addItemToSection(key) }}>
                                <Text style={{ color: 'white', fontSize: 24, marginBottom: 3 }}>+</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    renderSectionFooter={() => (
                        <View style={styles.sectionFooter}></View>
                    )}
                />
            </KeyboardAvoidingView>
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
    sectionHeader: {
        paddingHorizontal: 15,
        backgroundColor: colors.primary2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectionHeaderTitle: {
        marginVertical: 15,
        fontSize: 18,
    },
    sectionHeaderButton: {
        backgroundColor: colors.essence1,
        color: 'white',
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    sectionFooter: {
        marginBottom: 20,
    },
    sectionFooter: {
        marginBottom: 20,
    },
});