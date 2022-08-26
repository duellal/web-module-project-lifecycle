import React from 'react'

//This will render the todo + allow the user to either check or uncheck the todo on the list
export default class Todo extends React.Component {
  handleClick = () => {
      this.props.toggleTodo(this.props.todo.id)
    }

  render() {
    return (
      //ClassName allows to toggle the line-through on and off depending on the state of 'completed'
      <div 
      className={`${this.props.todo.completed ? 'toggle' : ''}`} 
      onClick={this.handleClick}>
        <p>
          {this.props.todo.name}
        </p>
      </div>
    )
  }
}
