import React from 'react';

let ToDoItem = React.createClass({
  render: function() {
    return (
      <div>
        <input onClick={this.props.handleTaskChecked} type='checkbox' checked={this.props.checked} />
        <input type='text' value={this.props.text}/>
        <span className='ToDoItem__delete' onClick={this.props.handleTaskDelete}> x </span>
      </div>
    );
  }
});

export default ToDoItem;