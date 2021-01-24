import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Icon } from 'react-native-elements';
import colors from './utils/colors';

export default ({ text, done, onToggleCheck, onDeleteTask, showCheckbox, isEditing, onSubmitTodo, requestEdit }) => {
    const [textInput, setTextInput] = useState(text);

    return (
        <View style={styles.container}>
            {showCheckbox && <View style={styles.checkBoxWrapper}>
                <CheckBox
                    value={done}
                    onValueChange={onToggleCheck}
                    style={styles.checkBox}
                />
            </View>}
            <View style={styles.wrapper}>
                {isEditing &&
                    <View style={styles.textBox}>
                        <View style={styles.textBoxWrapper}>
                            <TextInput
                                placeholder="O que você quer fazer?"
                                onChangeText={textInput => setTextInput(textInput)}
                                onSubmitEditing={() => onSubmitTodo(textInput)}
                                value={textInput}
                                style={styles.textBoxInput}
                                autoFocus={true}
                                multiline={true}
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                                style={styles.textBoxIconWrapper}
                                onPress={() => onSubmitTodo(textInput)}
                            >
                                <Icon
                                    name="done"
                                    iconStyle={styles.textBoxIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                {!isEditing && 
                    <Text
                        style={styles.text}
                        onPress={() => {
                            requestEdit();
                        }
                    }>
                            {text}
                    </Text>
                }
            </View>
            <View style={styles.iconWrapper}>
                <Icon
                    name="clear"
                    onPress={onDeleteTask}
                    iconStyle={styles.icon}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.primary1,
        borderRadius: 5,
        marginTop: 10,
        marginHorizontal: 10,
        padding: 8,
    },
    checkBoxWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkBox: {
        alignSelf: "center",
    },
    text: {
        padding: 8,
    },
    icon: {
    },
    iconWrapper: {
        padding: 8,
        justifyContent: 'center',
    },
    wrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    textBox: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.primary2,
        backgroundColor: 'white',
        borderRadius: 4,
        alignItems: 'center',
    },
    textBoxInput: {
        flexGrow: 1,
        marginHorizontal: 7,
    },
    textBoxIcon: {
        color: 'white',
    },
    textBoxIconWrapper: {
        padding: 7,
        backgroundColor: '#3caea3',
        borderRadius: 4,
    },
    textBoxWrapper: {
        flex: 1,
    },
});