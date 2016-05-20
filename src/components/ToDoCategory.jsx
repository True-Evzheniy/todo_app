import React from 'react';

const ToDoCategory = React.createClass({
  render: function(){
    return (
      <div>
        {this.props.category}
      </div>
    );
  }
});

export default ToDoCategory;