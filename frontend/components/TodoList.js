import React from 'react'

import Todo from './Todo'

//Renders the complete todo list
export default class TodoList extends React.Component {
  render() {
    return (
      <div>
        {this.props.allTodos.map(item => {
          return(
          <Todo 
            key={item.id} 
            todo={item} 
            toggleTodo={this.props.toggleTodo}
            handleTodoClick={this.props.handleTodoClick}
            />)
        })
        }
      </div>
    )
  }
}
