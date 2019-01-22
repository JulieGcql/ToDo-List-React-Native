import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default class ToDoList extends Component {
  state = {
    isCompleted: false
  };

  toggleItem = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      }
    })
  }
  


  render() {

    const { isCompleted } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={this.toggleItem}>
            <View style={[styles.circle, isCompleted ? styles.completeCircle : styles.incompleteCircle]}>
            </View>
          </TouchableOpacity>
          <Text style={[styles.text, isCompleted ? styles.strikeText : styles.unstrikeText]}>
            {this.props.newTodoItem.title}
          </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={this.props.deleteTodo}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>❌</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowContainer: {
    flexDirection: 'row',
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttons: {
    flexDirection: 'row',
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 20
  },
  strikeText: {
    color: '#2c3e50',
    textDecorationLine: 'line-through'
  },
  unstrikeText: {
    color: "#fd746c"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20
  },
  completeCircle: {
    borderColor: '#2c3e50'
  },
  incompleteCircle: {
    borderColor: '#fd746c'
  }
});

