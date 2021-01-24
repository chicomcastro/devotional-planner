import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from './utils/colors';

export default ({ title, isEditing, onSubmitHeader, requestEdit, onPress }) => {
    const [textInput, setTextInput] = useState(title);

    return (
        <View style={styles.sectionHeader}>
            <View style={styles.wrapper}>
                {isEditing &&
                    <View style={styles.textBox}>
                        <View style={styles.textBoxWrapper}>
                            <TextInput
                                placeholder="O que você quer fazer?"
                                onChangeText={textInput => setTextInput(textInput)}
                                onSubmitEditing={() => onSubmitHeader(textInput)}
                                value={textInput}
                                style={styles.textBoxInput}
                                autoFocus={true}
                                multiline={true}
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                                style={styles.textBoxIconWrapper}
                                onPress={() => onSubmitHeader(textInput)}
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
                        style={styles.sectionHeaderTitle}
                        onPress={requestEdit}
                    >
                            {title}
                    </Text>
                }
            </View>
            <TouchableOpacity
                style={styles.sectionHeaderButton}
                onPress={onPress}
            >
                <Text
                    style={{ color: 'white', fontSize: 24, marginBottom: 3 }}
                >
                    +
                </Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    sectionHeader: {
        backgroundColor: colors.primary2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectionHeaderTitle: {
        marginVertical: 15,
        paddingHorizontal: 15,
        fontSize: 18,
    },
    sectionHeaderButton: {
        backgroundColor: colors.essence1,
        marginRight: 15,
        color: 'white',
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    textBox: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.primary2,
        backgroundColor: 'white',
        borderRadius: 4,
        marginVertical: 5,
        marginHorizontal: 7,
        alignItems: 'center',
    },
    textBoxInput: {
        flexGrow: 1,
        marginHorizontal: 7,
        fontSize: 18
    },
    textBoxIcon: {
        color: 'white',
    },
    textBoxIconWrapper: {
        padding: 10,
        backgroundColor: '#3caea3',
        borderRadius: 4,
    },
    textBoxWrapper: {
        flex: 1,
    },
});