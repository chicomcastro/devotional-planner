import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Icon } from 'react-native-elements';
import colors from './utils/colors';

export default ({ text, done, onToggleCheck, onDeleteTask, showCheckbox }) => (
    <View style={styles.container}>
        {showCheckbox && <View style={styles.checkBoxWrapper}>
            <CheckBox
                value={done}
                onValueChange={onToggleCheck}
                style={styles.checkBox}
            />
        </View>}
        <View style={styles.wrapper}>
            <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.iconWrapper}>
            <Icon
                name="clear"
                onPress={onDeleteTask}
                iconStyle={styles.icon}
            />
        </View>
    </View>
);

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
});