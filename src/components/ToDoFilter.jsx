import React from 'react';
import ToDoCategory from './ToDoCategory';

const ToDoFilter = React.createClass({
  setCurrentFilter: function() {
    let filters = document.querySelectorAll('[name=todo-filter]');
    Array.prototype.forEach.call(filters, (item) => {
      if(item.value === this.props.filter) {
        item.checked = true;
      }
    });
  },
  componentDidMount: function() {
    this.setCurrentFilter();
  },
  componentDidUpdate: function() {
    this.setCurrentFilter();
  },
  handleFilterChecked: function(event) {
    this.props.onFilterChecked(event.target.value);
  },
  render: function() {
    return (
      <div>
        <div>
          {
            this.props.categories.map((item, i)=>{
              return (
                <ToDoCategory
                  category={item}
                  key={i}
                />
              );
            })
          }
        </div>
        <div onChange={this.handleFilterChecked}>
          <label><input type='radio' name='todo-filter' value='all' />Все</label>
          <label><input type='radio' name='todo-filter' value='active' />Активные</label>
          <label><input type='radio' name='todo-filter' value='compleate' />Выполненные</label>
        </div>
      </div>
    );
  }
});

export default ToDoFilter;