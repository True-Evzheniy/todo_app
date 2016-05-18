import React from 'react';

let ToDoEditor = React.createClass({
  getInitialState: function() {
    return ({
      text: '',
      hiddenBtn: true
    });
  },
  handleTextChange: function(event) {
    if(!event.target.value) {
      this.setState({
        text: event.target.value,
        hiddenBtn: true
      });
    }  else {
      this.setState({
        text: event.target.value,
        hiddenBtn: false
      });
    }
  },
  handleInputFocus: function(){
    if(this.state.text) {
      this.setState({
        hiddenBtn: false
      });
    }
  },
  handleInputBlur: function() {
    if(!this.state.text) {
      this.setState({
        hiddenBtn: true
      })
    }
  },
  handleAddTask: function() {
    let newTask = {
      id: Date.now(),
      text: this.state.text,
      checked: false
    };
    this.props.addNewTask(newTask);
    this.setState({
      text: '',
      hiddenBtn: true
    });
  },
  render: function() {
    return (
      <div>
        <input
          type='text'
          value={this.state.text}
          onChange={this.handleTextChange}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
        />
        <button hidden={this.state.hiddenBtn} onClick={this.handleAddTask}>add</button>
      </div>
    );
  }
});

export default ToDoEditor;