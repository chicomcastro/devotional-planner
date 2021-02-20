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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../redux/actions.js';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textInput: '',
            showingKeyboard: false,
            date: new Date(),
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


    // ---
    // Todos (items)
    // ---

    submitTodo = (key, textInput) => {
        let todos = [...this.props.todos];
        let currentItemIndex = todos.findIndex(todo => todo.key === key);
        todos[currentItemIndex] = {
            ...todos[currentItemIndex],
            isEditing: false,
            title: textInput,
        };
        this.setState({ todos: todos });
    };

    requestEditTodo = (key) => {
        let todos = [...this.props.todos];
        let currentItemIndex = this.props.todos.findIndex(todo => todo.key === key);
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


    // ---
    // Sections
    // ---

    submitSection = (sectionKey, textInput) => {
        if (!textInput && !this.props.todos.some(todos => todos.section === sectionKey)) {
            this.props.deleteSection(sectionKey);
        }
        this.props.submitSection({ sectionKey, textInput });
    };

    requestEditSection = this.props.toggleEditSection;

    insertItemToSection = (sectionKey) => this.props.insertItemToSection(this.state.date, sectionKey);

    deleteSection = this.props.deleteSection;

    insertSection = () => this.props.insertSection(this.state.date);


    // ---
    // Render (jsx)
    // ---
    
    getSections = () => {
        let todos = [...this.props.todos].filter(todo => todo.day === this.state.date.toISOString().slice(0, 10));
        let sectionsProps = [...this.props.sections].filter(section => section.day === this.state.date.toISOString().slice(0, 10));
        let sectionsList = sectionsProps.map(section => { return { ...section, data: [] } });
        let sectionsMap = {};
        sectionsList.forEach(section => sectionsMap[section.key] = section);
        todos.forEach(todo => {
            if (sectionsMap[todo.section]) {
                sectionsMap[todo.section].data.push(todo);
            }
        });
        return sectionsList;
    }

    render() {
        return (
            <SafeAreaView
                style={styles.container}
            >
                <StatusBar backgroundColor={colors.white} barStyle='dark-content'></StatusBar>
                <DatePicker
                    date={this.state.date}
                    setDate={(date) => this.setState({ date })}
                ></DatePicker>
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
                            onSubmitHeader={(textInput) => this.submitSection(key, textInput)}
                            requestEdit={() => this.requestEditSection(key)}
                            onPressAdd={() => this.insertItemToSection(key)}
                            onPressRemove={() => this.deleteSection(key)}
                        ></SectionHeader>
                    )}
                    renderSectionFooter={() => (
                        <View style={styles.sectionFooter}></View>
                    )}
                />
                {!this.state.showingKeyboard && <FloatingButton onPress={this.insertSection}></FloatingButton>}
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return { todos: state.todos, sections: state.sections };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // SECTIONs
        insertItemToSection: bindActionCreators(actions.insertItem, dispatch),
        insertSection: bindActionCreators(actions.insertSection, dispatch),
        submitSection: bindActionCreators(actions.submitSection, dispatch),
        toggleEditSection: bindActionCreators(actions.toggleEditSection, dispatch),
        deleteSection: bindActionCreators(actions.deleteSection, dispatch),
        // TODOs
        insertTodo: bindActionCreators(actions.insertItem, dispatch),
        updateTodo: bindActionCreators(actions.updateItem, dispatch),
        deleteTodo: bindActionCreators(actions.deleteItem, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

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