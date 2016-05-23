import React from 'react';

const ToDoCategory = React.createClass({
  handleCheckedCategory: function(event) {
    this.props.handleCheckedCategory(event.target.value);
  },
  render: function(){
    return (
      <div>
        <label>
          <input
            type="checkbox"
            value={this.props.category}
            checked={this.props.checked}
            onChange={this.handleCheckedCategory}
          />
          {this.props.category}
        </label>
      </div>
    );
  }
});

export default ToDoCategory;