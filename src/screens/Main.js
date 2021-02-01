import React from 'react';
import { Keyboard, StyleSheet, TextInput, View, FlatList, KeyboardAvoidingView, TouchableOpacity, SectionList, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Todo from '../Todo.js';
import { DatePicker } from '../DatePicker.js';
import colors from '../utils/colors.js';
import SectionHeader from '../SectionHeader.js';
import FloatingButton from '../FloatingButton.js';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';

export default class HomeScreen extends React.Component {
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
            sections: [
                {
                    key: Math.random().toString(),
                    title: "Leitura bíblica",
                    checkable: false,
                },
            ],
            textInput: '',
            showingKeyboard: false,
        };
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    };

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        this.setState({ showingKeyboard: true });
    }

    _keyboardDidHide = () => {
        this.setState({ showingKeyboard: false });
    }

    submitTodo = (key, textInput) => {
        let todos = [...this.state.todos];
        let currentItemIndex = this.state.todos.findIndex(todo => todo.key === key);
        todos[currentItemIndex] = {
            ...todos[currentItemIndex],
            isEditing: false,
            title: textInput,
        };
        this.setState({ todos: todos });
    };

    requestEditTodo = (key) => {
        let todos = [...this.state.todos];
        let currentItemIndex = this.state.todos.findIndex(todo => todo.key === key);
        todos[currentItemIndex] = {
            ...todos[currentItemIndex],
            isEditing: true,
        };
        this.setState({ todos: todos });
    };

    submitHeader = (key, textInput) => {
        let sections = [...this.state.sections];
        let currentSectionIndex = this.state.sections.findIndex(section => section.key === key);
        let originalTitle = sections[currentSectionIndex].title;
        sections[currentSectionIndex] = {
            ...sections[currentSectionIndex],
            isEditing: false,
            title: textInput,
        };
        let todos = [...this.state.todos];
        todos.forEach(todo => {
            if (todo.section === originalTitle) {
                todo.section = textInput;
            }
        })
        this.setState({ sections: sections, todos: todos });
    };

    requestEditSection = (key) => {
        let sections = [...this.state.sections];
        let currentSectionIndex = this.state.sections.findIndex(section => section.key === key);
        sections[currentSectionIndex] = {
            ...sections[currentSectionIndex],
            isEditing: true,
        };
        this.setState({ sections: sections });
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
        todos.forEach(todo => {
            if (sectionsMap[todo.section]) {
                sectionsMap[todo.section].data.push(todo);
            }
        });
        return sectionsList;
    }

    addItemToSection = (sectionKey) => {
        let section = [...this.state.sections].find(section => section.key === sectionKey);
        this.setState(({ todos }) => ({
            todos: [...todos, { key: Math.random().toString(), done: false, title: '', section: section.title, isEditing: true }],
        }));
    }

    deleteSection = (sectionKey) => {
        let sections = [...this.state.sections];
        let currentSection = sections.find(section => section.key === sectionKey);
        let filteredTodos = [...this.state.todos].filter(todo => todo.section !== currentSection.title);
        let filteredSections = sections.filter(section => section.key !== sectionKey);
        this.setState({ sections: filteredSections, todos: filteredTodos });
    }

    addSection = () => {
        let newSection = {
            key: Math.random().toString(),
            title: "",
            checkable: false,
            isEditing: true,
        };
        this.setState(({ sections }) => ({
            sections: [...sections, newSection]
        }));
    }

    render() {
        return (
            <SafeAreaView
                style={styles.container}
            >
                <StatusBar backgroundColor={colors.white} barStyle='dark-content'></StatusBar>
                <DatePicker></DatePicker>
                <SectionList
                    style={styles.sectionList}
                    sections={this.getSections()}
                    keyExtractor={(item, index) => item.key + index}
                    renderItem={({ item, index, section }) => (
                        <Todo
                            text={item.title}
                            done={item.done}
                            showCheckbox={section.checkable}
                            onSubmitTodo={(textInput) => this.submitTodo(item.key, textInput)}
                            onToggleCheck={() => this.toggleCheck(item.key, section)}
                            onDeleteTask={() => this.deleteTask(item.key, section)}
                            isEditing={item.isEditing}
                            requestEdit={() => this.requestEditTodo(item.key)}
                        />
                    )}
                    renderSectionHeader={({ section: { key, title, isEditing } }) => (
                        <SectionHeader
                            title={title}
                            isEditing={isEditing}
                            onSubmitHeader={(textInput) => this.submitHeader(key, textInput)}
                            requestEdit={() => this.requestEditSection(key)}
                            onPressAdd={() => this.addItemToSection(key)}
                            onPressRemove={() => this.deleteSection(key)}
                        ></SectionHeader>
                    )}
                    renderSectionFooter={() => (
                        <View style={styles.sectionFooter}></View>
                    )}
                />
                {!this.state.showingKeyboard && <FloatingButton onPress={this.addSection}></FloatingButton>}
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