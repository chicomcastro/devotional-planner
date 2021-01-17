import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';

export default ({ text, done, onToggleCheck, onDeleteTask }) =>
  <View style={styles.container}>
    <View style={styles.checkBoxWrapper}>
      <CheckBox
        checked={done}
        onPress={onToggleCheck}
        containerStyle={styles.checkBox}
      />
    </View>
    <View style={styles.wrapper}>
      <Text>{text}</Text>
    </View>
    <View style={styles.iconWrapper}>
      <Icon
        name="clear"
        onPress={onDeleteTask}
        iconStyle={styles.icon}
      />
    </View>
  </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#dfdfdf',
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  icon: {
  },
  iconWrapper: {
    padding: 16,
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});