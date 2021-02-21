import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from './utils/colors';

export default ({ title, onSubmit, onPressAdd, onPressRemove, collapsed, onCollapse }) => {
    const [textInput, setTextInput] = useState(title);
    const [isEditing, setIsEditing] = useState(!textInput);

    return (
        <View style={styles.sectionHeader}>
            <View>
                <TouchableOpacity
                    style={styles.collapseIconWrapper}
                    onPress={() => {
                        onCollapse && onCollapse();
                    }}
                >
                    <Icon
                        name={collapsed ? "keyboard-arrow-right" : "keyboard-arrow-down"}
                        iconStyle={styles.collapseIcon}
                    ></Icon>
                </TouchableOpacity>
            </View>
            <View style={styles.wrapper}>
                {isEditing &&
                    <View style={styles.textBox}>
                        <View style={styles.textBoxWrapper}>
                            <TextInput
                                placeholder="O que você quer fazer?"
                                onChangeText={textInput => setTextInput(textInput)}
                                value={textInput}
                                style={styles.textBoxInput}
                                autoFocus={true}
                                multiline={true}
                                blurOnSubmit={true}
                                onBlur={() => {
                                    onSubmit && onSubmit(textInput);
                                    onSubmit && setIsEditing(false);
                                }}
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                                style={styles.textBoxIconWrapper}
                                onPress={() => {
                                    onSubmit && onSubmit(textInput);
                                    onSubmit && setIsEditing(false);
                                }}
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
                        onPress={() => onSubmit && setIsEditing(true)}
                    >
                        {title}
                    </Text>
                }
            </View>
            {!isEditing && <View style={{flexDirection: 'row', marginRight: 5}}>
                {onPressRemove &&
                    <TouchableOpacity
                        style={styles.sectionHeaderButton}
                        onPress={onPressRemove}
                    >
                        <Icon
                            name="delete"
                            iconStyle={styles.textBoxIcon}
                        />
                    </TouchableOpacity>
                }
                {onPressAdd && 
                    <TouchableOpacity
                        style={styles.sectionHeaderButton}
                        onPress={onPressAdd}
                    >
                        <Icon
                            name="add"
                            iconStyle={styles.textBoxIcon}
                        />
                    </TouchableOpacity>
                }
            </View>}
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
        paddingHorizontal: 8,
        fontSize: 18,
    },
    sectionHeaderButton: {
        backgroundColor: colors.essence1,
        marginRight: 10,
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
        marginRight: 7,
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
    collapseIconWrapper: {
        paddingLeft: 10,
        paddingRight: 3,
    },
    collapseIcon: {
        color: 'black',
    },
});