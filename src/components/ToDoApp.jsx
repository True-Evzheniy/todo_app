import React from 'react';

import ToDoEditor from './ToDoEditor';

import ToDoList from './ToDoList';

import ToDoFilter from './ToDoFilter';

const ToDoApp = React.createClass({
  getInitialState: function() {
    return ({
      filter: 'all',
      tasks: [
        {id: 1, text: 'купить хлеб', checked: true},
        {id: 2, text: 'покрасить небо', checked: false},
        {id: 3, text: 'съесть французских булок', checked: true}
      ]
    });
  },
  onFilterChecked: function(filterName) {
    this.setState({filter: filterName});
  },
  addNewTask: function(newTask) {
    let newTasks = this.state.tasks.slice();
    newTasks.unshift(newTask);
    this.setState({
      tasks: newTasks
    });
  },
  handleTaskDelete: function(task) {
    let taskId = task.id;
    let newTasks = this.state.tasks.filter(function(item) {
      return item.id !== taskId;
    });
    this.setState({
      tasks: newTasks
    });
  },
  handleTaskChecked: function(task) {
    let taskId = task.id;
    let newTasks = this.state.tasks.slice();
    newTasks.map(function(item) {
      if(taskId === item.id) {
        item.checked = !item.checked;
      }
    });
    this.setState({
      tasks: newTasks
    });
  },
  handleEditText: function(id, text){
    const newTasks = this.state.tasks.map((item)=>{
      if(id === item.id) {
        item.text = text;
      }
      return {
        text: item.text,
        id: item.id,
        checked: item.checked
      };
    });
    this.setState({
      tasks: newTasks
    });
  },
  render: function() {
    return (
      <div>
        <ToDoEditor addNewTask={this.addNewTask} />
        <ToDoList
          tasks={this.state.tasks}
          filter={this.state.filter}
          handleTaskDelete={this.handleTaskDelete}
          handleTaskChecked={this.handleTaskChecked}
          handleEditText={this.handleEditText}
        />
        <ToDoFilter onFilterChecked={this.onFilterChecked} filter={this.state.filter} />
      </div>
    );
  },
  componentDidMount: function() {
    let localTasks = JSON.parse(localStorage.getItem('tasks'));
    let localFilter = localStorage.getItem('filter');
    if(localTasks) {
      this.setState({
        tasks: localTasks,
        filter: localFilter
      });
    }
  },
  _updateLocalStorage: function() {
    let localTasks = JSON.stringify(this.state.tasks);
    let localFilter = this.state.filter;
    localStorage.setItem('tasks', localTasks);
    localStorage.setItem('filter', localFilter);
  },
  componentDidUpdate: function() {
    this._updateLocalStorage();
  }
});

export default ToDoApp;