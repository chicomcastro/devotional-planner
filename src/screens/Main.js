import React from 'react';
import { StyleSheet, TextInput, View, FlatList, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Todo from '../Todo.js';
import { DatePicker } from '../DatePicker.js';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { key: Math.random().toString(), done: false, text: 'Leitura bíblica' },
        { key: Math.random().toString(), done: false, text: 'Gratidão' },
        { key: Math.random().toString(), done: false, text: 'Oração' },
        { key: Math.random().toString(), done: false, text: 'Decisão' },
        { key: Math.random().toString(), done: false, text: 'Jejum' },
      ],
      textInput: '',
      date: new Date(1598051730000),
      mode: 'date',
      show: false,
    };
  };

  submitTodo = () => {
    if (!this.state.textInput) {
      return;
    }
    this.setState(({todos, textInput}) => ({
      todos: [...todos, { key: Math.random().toString(), done: false, text: textInput }],
      textInput: '',
    }))
  }
  toggleCheck = key => {
    this.setState(({todos}) => ({
      todos: todos.map(todo => {
        if (todo.key === key) {
          todo.done = !todo.done;
        }
        return todo;
      }),
    }));
  }
  deleteTask = key => {
    this.setState(({todos}) => ({
      todos: todos.filter(todo => todo.key !== key),
    }));
  }
  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
      >
        <DatePicker></DatePicker>
        <FlatList
          data={this.state.todos}
          renderItem={({item}) =>
            <Todo
              text={item.text}
              done={item.done}
              onToggleCheck={() => this.toggleCheck(item.key)}
              onDeleteTask={() => this.deleteTask(item.key)}
            />}
        />
        <View style={styles.textBox}>
          <View style={styles.wrapper}>
            <TextInput
              placeholder="O que você quer fazer?"
              onChangeText={textInput => this.setState({textInput})}
              onSubmitEditing={this.submitTodo}
              value={this.state.textInput}
              style={styles.textInput}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.iconWrapper}
              onPress={this.submitTodo}
            >
              <Icon
                name="add"
                iconStyle={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textBox: {
    flexDirection: 'row',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  textInput: {
    flexGrow: 1,
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
    flex: 1
  },
});