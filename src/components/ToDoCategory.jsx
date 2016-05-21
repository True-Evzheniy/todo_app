import React from 'react';

const ToDoCategory = React.createClass({
  render: function(){
    return (
      <div>
        <label><input type="checkbox" value={this.props.category}/>{this.props.category}</label>
      </div>
    );
  }
});

export default ToDoCategory;