import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet,  View, SectionList } from 'react-native';

import SectionHeader from '../SectionHeader';
import Todo from '../Todo';
import colors from '../utils/colors';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../redux/actions';

class GeneralScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textInput: '',
        };
    };

    // ---
    // Todos (items)
    // ---

    submitTodo = (key, textInput) => {
        if (!textInput) {
            this.props.deleteTodo(key);
        }
        this.props.updateTodo(key, { isEditing: false, title: textInput });
    };

    requestEditTodo = (key) => this.props.updateTodo(key, { isEditing: true });

    toggleCheck = (key) => {
        let todo = this.props.todos.find(todo => todo.key === key);
        this.props.updateTodo(key, { done: !todo.done });
    }

    deleteTodo = this.props.deleteTodo;

    renderItem = ({ item, index, section }) => (
        <Todo
            text={item.title}
            done={item.done}
            showCheckbox={section.checkable}
            onSubmit={(textInput) => this.submitTodo(item.key, textInput)}
            onToggleCheck={() => this.toggleCheck(item.key, section)}
            onDeleteTask={() => this.deleteTodo(item.key, section)}
        />
    );

    getSections = () => {
        let todos = [...this.props.todos];
        let sectionsMap = {};
        todos.forEach(todo => {
            if (!sectionsMap[todo.day]) {
                let section = {
                    key: Math.random().toString(),
                    title: new Date(todo.day).toGMTString().slice(0,11),
                    checkable: true,
                    data: [],
                };
                sectionsMap[todo.day] = section;
            }
            sectionsMap[todo.day].data.push(todo);
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
                    renderItem={this.renderItem}
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

const mapStateToProps = (state) => {
    return { todos: state.todos, sections: state.sections };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // SECTIONs
        insertSection: bindActionCreators(actions.insertSection, dispatch),
        submitSection: bindActionCreators(actions.submitSection, dispatch),
        toggleEditSection: bindActionCreators(actions.toggleEditSection, dispatch),
        deleteSection: bindActionCreators(actions.deleteSection, dispatch),
        // TODOs
        insertItemToSection: bindActionCreators(actions.insertItem, dispatch),
        updateTodo: bindActionCreators(actions.updateItem, dispatch),
        deleteTodo: bindActionCreators(actions.deleteItem, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralScreen);

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