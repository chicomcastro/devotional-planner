import React, { useState } from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from './utils/colors';
import { TouchableOpacity } from 'react-native';

export const DatePicker = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const addToDate = (valueToAdd) => {
        let milisInADay = 1000 * 60 * 60 * 24;
        const currentDate = date - valueToAdd * milisInADay * -1;
        setDate(new Date(currentDate));
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonsWrapper}>
                <TouchableOpacity onPress={() => addToDate(-1)} style={styles.secondaryButton}>
                    <Text style={styles.text}>{'<'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showDatepicker} style={styles.mainButton}>
                    <Text style={styles.text}>{date.toLocaleDateString()}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addToDate(1)} style={styles.secondaryButton}>
                    <Text style={styles.text}>{'>'}</Text>
                </TouchableOpacity>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary3,
        alignItems: 'center',
    },
    buttonsWrapper: {
        flexDirection: 'row',
    },
    secondaryButton: {
        backgroundColor: colors.primary3,
        paddingVertical: 15,
        paddingHorizontal: 24
    },
    mainButton: {
        backgroundColor: colors.primary3,
        paddingVertical: 15,
        paddingHorizontal: 16
    },
    text: {
        fontSize: 16,
        color: 'white',
    }
});