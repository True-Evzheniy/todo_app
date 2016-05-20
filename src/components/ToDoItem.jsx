import React from 'react';

require('./ToDoItem.scss');

const ToDoItem = React.createClass({
  getInitialState: ()=>{
    return {
     inputCategory: ''
    };
  },
  handleTextEdit: function(event){
    this.props.handleEditText(this.props.id, event.target.value);
  },
  handleInputCategory: function(event){
    this.setState({
      inputCategory: event.target.value
    });
  },
  handleAddCategory: function(){
    this.props.handleAddCategory(this.props.id, this.state.inputCategory);
    this.setState({
      inputCategory: ''
    });
  },
  render: function() {
    return (
      <div>
        <input onChange={this.props.handleTaskChecked} type='checkbox' checked={this.props.checked} />
        <input onChange={this.handleTextEdit} type='text' value={this.props.text}/>
        <span className='ToDoItem__delete' onClick={this.props.handleTaskDelete}> x </span>
        <br/>
        <input onChange={this.handleInputCategory} type="text" className="ToDoItem__category" value={this.state.inputCategory} />
        <button onClick={this.handleAddCategory} className="ToDoItem__category-add">add</button>
      </div>
    );
  }
});

export default ToDoItem;