import React from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    FlatList,
    KeyboardAvoidingView,
    TouchableOpacity,
    SectionList,
    Text,
    Modal,
    TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-elements';
import Todo from '../Todo.js';
import { DatePicker } from '../DatePicker.js';
import colors from '../utils/colors.js';
import { Button } from 'react-native';

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
            modalVisible: false,
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

    openSectionModal = () => {
        this.setModalVisible(true);
    }

    setModalVisible = (modalVisible) => {
        this.setState({ modalVisible });
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
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
                            onToggleCheck={() => this.toggleCheck(item.key, section)}
                            onDeleteTask={() => this.deleteTask(item.key, section)}
                        />
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionHeaderTitle}>{title}</Text>
                            <TouchableOpacity style={styles.sectionHeaderButton} onPress={this.openSectionModal}>
                                <Text style={{ color: 'white', fontSize: 24, marginBottom: 3 }}>+</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    renderSectionFooter={() => (
                        <View style={styles.sectionFooter}></View>
                    )}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Criar novo item</Text>

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
                                        onPress={() => {
                                            this.submitTodo();
                                            this.setModalVisible(false);
                                        }}
                                    >
                                        <Icon
                                            name="add"
                                            iconStyle={styles.icon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
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
    textBox: {
        flexDirection: 'row',
        // position: 'absolute', //Here is the trick
        // bottom: 0, //Here is the trick
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
    sectionHeaderTitle: {
        marginVertical: 15,
        fontSize: 18,
    },
    sectionHeader: {
        paddingHorizontal: 15,
        backgroundColor: colors.primary2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectionFooter: {
        marginBottom: 20,
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
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
});