import React from 'react';

let ToDoEditor = React.createClass({
  getInitialState: function() {
    return ({
      text: '',
      hiddenBtn: true
    });
  },
  handleTextChange: function(event) {
    this.setState({
      text: event.target.value
    });
  },
  handleAddTask: function() {
    const newTask = {
      id: Date.now(),
      text: this.state.text,
      checked: false,
      categories: []
    };
    this.props.addNewTask(newTask);
    this.setState({
      text: ''
    });
  },
  render: function() {
    return (
      <div className="ToDoEditor">
        <input
          type='text'
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <button disabled={!this.state.text} onClick={this.handleAddTask}>add</button>
      </div>
    );
  }
});

export default ToDoEditor;