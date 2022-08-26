import React from 'react'

//this allows the user to add to the todo + hide completed items or show all of the todos
export default class Form extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleFormSubmit}>
      <div>
        <input 
        type = 'text'
        value={this.props.handleFormValue}
        onChange={this.props.handleFormChanges} 
        placeholder='Todo'/>
        <button> Submit </button>
      </div>
      <br/>
        <div>
          <button onClick={this.props.clearTodos}> 
            Clear Completed
          </button>
        </div>
      </form>
    )
  }
}
