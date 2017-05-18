import { combineReducers } from 'redux';
import { sidenavOpen } from './sidenav-open';
import { books } from './books';
import { search } from './search';
import todos from './todos';
import visibilityFilter from './visibility-filter';
import selectedTodo from './selected-todo';

const reducers = {
  sidenavOpen,
  books,
  search,
  todos,
  visibilityFilter,
  selectedTodo
};

export default reducers;