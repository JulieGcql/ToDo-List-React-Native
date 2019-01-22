import React from 'react';
import { StatusBar, StyleSheet, Text, View , Dimensions, Platform, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import TodoList from './components/ToDoList'
import Axios from 'axios'

const { height, width } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    newTodoItem: '',
    todos: [],
  };

  componentDidMount() {
    this.getTodo()
  }

  handleChange = (e) => {
    this.setState({newTodoItem: e})
  }

  getTodo = () => {
    Axios.get('https://todo-list-julie.herokuapp.com/todos')
    .then((res) => {
      this.setState({todos: res.data})
    })
    .catch((err) => console.log(err))
  }

  deleteTodo = (id) => {
    Axios.delete(`https://todo-list-julie.herokuapp.com/todos/${id}`)
    .then((res) => {
      this.getTodo()
    })
    .catch((err) => console.log(err))
  }

  addTodo = (e) => {
    e.preventDefault()
    Axios.post('https://todo-list-julie.herokuapp.com/todos', {title: this.state.newTodoItem})
    .then((res) => {
      this.setState({newTodoItem:""})
      this.getTodo()
    })
    .catch((err) => console.log(err))
  }


  render() {
    return (
      <LinearGradient style={styles.container} colors={['#2c3e50', '#fd746c']}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.appTitle}>Ma Todo-List</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={'Ajouter une tâche!'}
            value={this.state.newTodoItem}
            onChangeText={this.handleChange}
            placeholderTextColor={'#2c3e50'}
            returnKeyType={'done'}
            autoCorrect={false}
            onSubmitEditing={(e) => this.addTodo(e)}
          />
          <ScrollView contentContainerStyle={styles.listContainer}>
            { this.state.todos.map((newTodoItem, key) => {
              return (
                <View key={key}>
                  <TodoList 
                    newTodoItem={newTodoItem}
                    deleteTodo={() => this.deleteTodo(newTodoItem.id)}
                  />
                </View>
              )
            })
          }
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  appTitle: {
    color: '#fff',
    fontSize: 36,
    marginTop: 60,
    marginBottom: 30,
    fontWeight: '300',
    ...Platform.select({
      android: {
        alignItems: 'center'
      }
    })
  },
  card: {
    backgroundColor: '#FFF',
    flex: 0,
    width: width - 25,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 5,
        flex:1
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: '#2c3e50',
    borderBottomWidth: 1,
    fontSize: 24,
    color: '#2c3e50'
  },
  listContainer: {
    alignItems: 'center'
  }
});