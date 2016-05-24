import React from 'react';

import ToDoEditor from './ToDoEditor';

import ToDoList from './ToDoList';

import ToDoFilter from './ToDoFilter';

const ToDoApp = React.createClass({
  handleCheckedCategory: function (category) {
    let newCategoriesFilter = this.state.categoriesFilter.slice();
    const filtersNumber = newCategoriesFilter.indexOf(category);
    if(filtersNumber === -1) {
      newCategoriesFilter.push(category);
    } else {
      newCategoriesFilter.splice(filtersNumber, 1);
    }
    this.setState({
      categoriesFilter: newCategoriesFilter
    });
  },
  getInitialState: function() {
    return ({
      filter: 'all',
      tasks: [
        {id: 1, text: 'купить хлеб', checked: true, categories: []},
        {id: 2, text: 'покрасить небо', checked: false, categories: []},
        {id: 3, text: 'съесть французских булок', checked: true, categories: []}
      ],
      rootCategories: [],
      categoriesFilter: [],
      useANDFilter: false
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
    let newRootCategories = this.getCategories(newTasks);
    let newCategoriesFilter;
    if(this.state.rootCategories.length !== newRootCategories.length) {
      newCategoriesFilter = this.state.categoriesFilter.slice();
      for(let i = 0; i < newCategoriesFilter.length; i++) {
        if(!~ newRootCategories.indexOf(newCategoriesFilter[i])) {
          console.log(newCategoriesFilter.splice(i, 1));
          i--;
        }
      }
      this.setState({
        tasks: newTasks,
        rootCategories: newRootCategories,
        categoriesFilter: newCategoriesFilter
      });
    } else{
      this.setState({
        tasks: newTasks
      });
    }
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
        checked: item.checked,
        categories: item.categories
      };
    });
    this.setState({
      tasks: newTasks
    });
  },
  handleAddCategory: function (id, category) {
    let isAdd = false;
    const newTasks = this.state.tasks.map((item)=>{
      if(id === item.id) {
        if (!~item.categories.indexOf(category)){
          item.categories.push(category);
          isAdd = true;
        }
      }
      return {
        text: item.text,
        id: item.id,
        checked: item.checked,
        categories: item.categories
      };
    });
    let newRootCategories = this.getCategories(newTasks);
    this.setState({
      tasks: newTasks,
      rootCategories: newRootCategories
    });
  },
  getCategories: function(newTasks){
    let newCategories = [];
    newTasks.forEach((item)=>{
      item.categories.forEach((subitem)=>{
        if(!~newCategories.indexOf(subitem)) {
          newCategories.push(subitem);
        }
      });
    });
    return newCategories;
  },
  handleChangeTypeCategoriesFilter: function () {
    let newUseANDFilter = !this.state.useANDFilter;
    this.setState({
      useANDFilter: newUseANDFilter
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
          handleAddCategory={this.handleAddCategory}
          useANDFilter={this.state.useANDFilter}
          categoriesFilter={this.state.categoriesFilter}
        />
        <ToDoFilter
          categoriesFilter={this.state.categoriesFilter}
          onFilterChecked={this.onFilterChecked}
          filter={this.state.filter}
          categories={this.state.rootCategories}
          handleCheckedCategory={this.handleCheckedCategory}
          handleChangeTypeCategoriesFilter={this.handleChangeTypeCategoriesFilter}
          useANDFilter={this.state.useANDFilter}
        />
      </div>
    );
  },
  componentDidMount: function() {
    let localTasks = JSON.parse(localStorage.getItem('tasks'));
    let localFilter = localStorage.getItem('filter');
    let localRootCategories = JSON.parse(localStorage.getItem('rootCategories'));
    let localCategoriesFilter = JSON.parse(localStorage.getItem('categoriesFilter'));
    let localUseANDFilter = localStorage.getItem('useANDFilter');
    if(localTasks) {
      this.setState({
        tasks: localTasks,
        filter: localFilter,
        rootCategories: localRootCategories,
        categoriesFilter: localCategoriesFilter,
        useANDFilter: localUseANDFilter
      });
    }
  },
  _updateLocalStorage: function() {
    let localTasks = JSON.stringify(this.state.tasks);
    let localFilter = this.state.filter;
    let localRootCategories = JSON.stringify(this.state.rootCategories);
    let localCategoriesFilter = JSON.stringify(this.state.categoriesFilter);
    let localUseANDFilter = this.state.useANDFilter;
    localStorage.setItem('tasks', localTasks);
    localStorage.setItem('filter', localFilter);
    localStorage.setItem('rootCategories', localRootCategories);
    localStorage.setItem('categoriesFilter', localCategoriesFilter);
    localStorage.setItem('useANDFilter', localUseANDFilter);
  },
  componentDidUpdate: function() {
    this._updateLocalStorage();
  }
});

export default ToDoApp;