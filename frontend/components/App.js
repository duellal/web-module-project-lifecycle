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
    axios
      .patch(`${URL}/${id}`)
      .catch(err => console.log(err))
  }

  //input changes:
  handleFormChanges = e => {
    this.setState({ input: e.target.value })
  }

  //submit changes - posting the request to the api:
  handleFormSubmit = e => {
    e.preventDefault()

    const newTodo = {
      name: this.state.input,
      completed: false
    }

    axios
      .post(URL, newTodo)
      .then(res => { 
        this.setState([...this.state.todos, res.data.data])
        return this.state.todos
      })
      .catch(err => console.log(err))

    //resets the input + placeholder text
    e.target.reset()
    this.setState({input: ''})
  }

//Making the Todo show in the DOM once the post request happens:
  componentDidUpdate(prevProps, prevState){
    if(this.state.todos !== prevState.todos){
      axios
      .get(URL)
      .then(res => 
        this.setState({
          todos: res.data.data
        })
        )
      .catch(err => console.log(err))
    }
  }

  //"Clearing" completed todos:
  clearCompletedTodos = (e) => {
    e.preventDefault()

    //This would work if the CDU (above) didn't get the whole url for the get request. I tried filtering the get request, which works, but I wan't to be able to decide when I want to see the completed todos, instead of them just "deleting" from the dom
    
    //I did try to use axios.delete() to delete the tasks that were completed, but it would not work - my guess for this is that the mock-server does not allow to use axios.delete()
    axios
      .get(URL)
      .then(res => {
        this.setState({
          todos: res.data.data.filter(item => {
            return (item.completed === false)
            })
          })
      })
  }

  
  render() {
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

