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

    submitTodo = () => {
        if (!this.state.textInput) {
            return;
        }
        this.setState(({ todos, textInput }) => ({  // TODO acertar section
            todos: [...todos, { key: Math.random().toString(), done: false, text: textInput, section: 'Leitura bíblica' }],
            textInput: '',
        }))
    }

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

    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                style={styles.container}
            >
                <DatePicker></DatePicker>
                <SectionList
                    sections={this.getSections()}
                    keyExtractor={(item, index) => item.key + index}
                    renderItem={({ item, index, section }) => (
                        <Todo
                            text={item.text}
                            done={item.done}
                            showCheckbox={section.checkable}
                            onToggleCheck={() => this.toggleCheck(item.key, section)}
                            onDeleteTask={() => this.deleteTask(item.key, section)}
                        />
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={styles.sectionHeader}>
                            <Text style={styles.title}>{title}</Text>
                        </View>
                    )}
                    renderSectionFooter={() => (
                        <View style={styles.sectionFooter}></View>
                    )}
                />
                <View style={styles.textBox}>
                    <View style={styles.wrapper}>
                        <TextInput
                            placeholder="O que você quer fazer?"
                            onChangeText={textInput => this.setState({ textInput })}
                            onSubmitEditing={this.submitTodo}
                            value={this.state.textInput}
                            style={styles.textInput}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.iconWrapper}
                            onPress={this.submitTodo}
                        >
                            <Icon
                                name="add"
                                iconStyle={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textBox: {
        flexDirection: 'row',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
        marginHorizontal: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: colors.primary2,
        backgroundColor: 'white',
        borderRadius: 4,
    },
    textInput: {
        flexGrow: 1,
        marginHorizontal: 16,
    },
    icon: {
        color: 'white',
    },
    iconWrapper: {
        padding: 10,
        backgroundColor: '#3caea3',
        borderRadius: 4,
    },
    wrapper: {
        flex: 1,
    },
    title: {
        fontSize: 18,
    },
    sectionHeader: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: colors.primary2,
    },
    sectionFooter: {
        marginBottom: 20,
    },
});