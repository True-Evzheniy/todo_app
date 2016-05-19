import React from 'react';

require('./ToDoItem.scss');

const ToDoItem = React.createClass({
  // getInitialState: ()=> {
  //   return ({
  //     text: this.props.text
  //   });
  // },
  handleTextEdit: function(event){
    this.props.handleEditText(this.props.id, event.target.value);
  },
  render: function() {
    return (
      <div>
        <input onChange={this.props.handleTaskChecked} type='checkbox' checked={this.props.checked} />
        <input onChange={this.handleTextEdit} type='text' value={this.props.text}/>
        <span className='ToDoItem__delete' onClick={this.props.handleTaskDelete}> x </span>
      </div>
    );
  }
});

export default ToDoItem;