import React from 'react';

import ToDoItem from './ToDoItem';

let ToDoList = React.createClass({
  render: function() {
    let tasksArrayToRender = this.props.tasks.slice();
    switch(this.props.filter) {
      case 'compleate':
        tasksArrayToRender = tasksArrayToRender.filter(function(item){
          return item.checked;
        });
        break;
      case 'active':
        tasksArrayToRender = tasksArrayToRender.filter(function(item){
          return !item.checked;
        });
        break;
    }
    let handleTaskDelete = this.props.handleTaskDelete;
    let handleTaskChecked = this.props.handleTaskChecked;
    return (
      <div>
        {
          tasksArrayToRender.map((task)=> {
            return (
              <ToDoItem
                text={task.text}
                key={task.id}
                id={task.id}
                checked={task.checked}
                handleTaskDelete={handleTaskDelete.bind(null, task)}
                handleTaskChecked={handleTaskChecked.bind(null, task)}
                handleEditText={this.props.handleEditText}
              />
            );
          })
        }
      </div>
    );
  },
  filtrationAnd: function(categories, filter){
    if (categories.length < filter.length) return false;
    let counter = 0;
    categories.forEach((item)=>{
      if (~filter.indexOf(item)) {
        counter++;
      }
    });
    return (counter === filter.length);
  },
  filtrationOr: function(categories, filter) {
    let counter = 0;
    categories.forEach((item)=>{
      if(~filter.indexOf(item)){
        counter++;
      }
    });
    return !!counter;
  }
});

export default ToDoList;