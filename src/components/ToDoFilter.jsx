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
  handleChangeTypeCategoriesFilter: function () {
    this.props.handleChangeTypeCategoriesFilter();
  },
  render: function() {
    return (
      <div className="ToDoFilter">
        <div>
          <label>
            <input type="checkbox"
                   name="typeFilteringCategory"
                   checked={this.props.useANDFilter}
                   onChange={this.handleChangeTypeCategoriesFilter}
                   hidden
            />
            {this.props.useANDFilter ? "Отображаются таски со ВСЕМИ выбранными категориями" : "Отображаются таски с Любой выбранной категорией" }
          </label>
        </div>
        <div>
          {
            this.props.categories.map((item, i)=>{
              let isChecked = !!~this.props.categoriesFilter.indexOf(item);
              return (
                <ToDoCategory
                  category={item}
                  key={i}
                  checked = {isChecked}
                  handleCheckedCategory={this.props.handleCheckedCategory}
                />
              );
            })
          }
        </div>
        <div onChange={this.handleFilterChecked}>
          <label><input type='radio' name='todo-filter' value='all' />Все</label>
          <label><input type='radio' name='todo-filter' value='active' />Активные</label>
          <label><input type='radio' name='todo-filter' value='complete' />Выполненные</label>
        </div>
      </div>
    );
  }
});

export default ToDoFilter;