import React, { useState } from 'react';
import { View, Text, Platform } from 'react-native';
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

    const backgroundColor = colors.purple;

    return (
        <View style={{ backgroundColor: backgroundColor, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => addToDate(-1)} style={{ backgroundColor, paddingVertical: 10, paddingHorizontal: 24 }}>
                    <Text style={{ color: 'white' }}>{'<'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showDatepicker} style={{ backgroundColor, paddingVertical: 10, paddingHorizontal: 16 }}>
                    <Text style={{ color: 'white' }}>{date.toLocaleDateString()}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addToDate(1)} style={{ backgroundColor, paddingVertical: 10, paddingHorizontal: 24 }}>
                    <Text style={{ color: 'white' }}>{'>'}</Text>
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