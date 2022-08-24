import React from 'react'
import axios from 'axios'

import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      todos: [],
      input: ''
    }
  }

  componentDidMount(){
    axios
      .get(URL)
      .then(res => 
        this.setState({
          todos: res.data.data 
        })
        )
      .catch(err => console.log(err))
  }

  //TodoList Component Handlers:
  //Crossing out an item once clicked on
  toggleTodo = (id) => {
   const newTodoList = this.state.todos.map(item => {
    if(item.id === id){
      return {
        ...item, completed: !item.completed
      }
    }
    else{
      return(item)
    }
   })

   this.setState({
    todos: newTodoList
   })
  }

  //Form Component Handlers: 
  //Adding an item to the list:
  addTodo = (item) => {
    const newTodo = {
      name: item,
      completed: false
    }

    this.setState([...this.state.todos, newTodo])

    //NEED TO WORK ON TO GET THE TODO TO POST TO API W/O BREAKING:
    // axios
    //   .post(URL, newTodo)
    //   .then(res => this.setState({
    //     todos: res.data.data
    //   }))
    //   .catch(err => console.log(err))

  }

  //input changes:
  handleFormChanges = e => {
    this.setState({ input: e.target.value })
  }

  //submit changes:
  handleFormSubmit = e => {
    e.preventDefault()

    //prevents adding nothing as a todo
    if(this.state.input === ""){
      null
    }
    else(this.addTodo(this.state.input))

    //resets the input + placeholder text
    e.target.reset()
    this.setState({input: ''})
  }

  //Clearing completed todos:
  clearCompletedTodos = (e) => {
    e.preventDefault()

    const newTodos = this.state.todos.filter(item => {
      return(item.completed === false)
    })

    this.setState({
      todos: newTodos
    })

    //NEED TO WORK ON FOR DELETING TODOS IN API LIST:
    // axios
    //   .patch(`${URL}/9`, newTodos)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))

  }

  
  render() {
    console.log('App Todos:', this.state.todos)
    return (
      <div>
        <div>
          <h2>Todos:</h2>
          <TodoList 
          allTodos={this.state.todos}
          toggleTodo={this.toggleTodo}
          />
        </div>
        <div>
          <Form 
          addTodo={this.addTodo}
          allTodos={this.state.todos}
          handleFormValue={this.state.input}
          handleFormChanges={this.handleFormChanges}
          handleFormSubmit={this.handleFormSubmit}
          clearTodos={this.clearCompletedTodos}
          />
        </div>
      </div>
    )
  }
}

