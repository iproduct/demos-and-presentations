import React from 'react';
import { connect } from 'react-redux';
import { openSidenav, closeSidenav, searchForBook } from '../actions';
import { isSidenavOpen } from '../reducers/sidenav-open';
import { isLoading, getBookIds, getSearchResults, getQuery } from '../reducers/search';
import { getSelectedBook } from '../reducers/books';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { NavLink } from 'react-router-dom';
import LibraryBooksIcon from 'material-ui/svg-icons/av/library-books';
import SearchIcon from 'material-ui/svg-icons/action/search';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import BookSearch from '../components/book-search';
import BookPreviewList from '../components/book-preview-list';
import {selectBook} from '../actions/books';

const mapStateToProps = (state) => ({
  isLoading: isLoading(state),
  books: getSearchResults(state),
  selectedBook: getSelectedBook(state),
  query: getQuery(state)
});

const mapDispatchToProps = (dispatch) => ({
  onSearch: (query) => {
    dispatch(searchForBook(query));
  },
  onSelectBook: (bookId) => {
    dispatch(selectBook(bookId));
  }
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class FindBookPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <BookSearch { ...this.props } />
        <BookPreviewList { ... this.props } />
      </div>
    );
  }
}
