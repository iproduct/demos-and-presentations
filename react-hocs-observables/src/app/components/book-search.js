import React from 'react';
import { connect } from 'react-redux';
import { openSidenav, closeSidenav } from '../actions';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { NavLink } from 'react-router-dom';
import LibraryBooksIcon from 'material-ui/svg-icons/av/library-books';
import SearchIcon from 'material-ui/svg-icons/action/search';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {compose, withState, withHandlers} from 'recompose';

const enhance = compose(
  withState('localQuery', 'updateQuery', ({query}) => query),
  withHandlers({
    onQueryChange: props => event => {
      const queryStr = event.target.value;
      props.updateQuery(queryStr);
      props.onSearch(queryStr); //send query to owner component
    }
  })
);

const BookSearch = enhance(({ localQuery, onQueryChange }) =>
  <Card style={{  background: '#fafafa' }}>
    <CardHeader
      title="Find Books"
      subtitle="with Google Books Service"
      titleStyle={{
        'fontSize': '18pt',
        'paddingBottom': '12px'
      }}
      subtitleStyle={{
        'fontSize': '14pt'
      }}
      style={{
        'paddingBottom': '0px'
      }}
    />
    <CardText>
      <TextField
        value={localQuery}
        onChange={ onQueryChange }
        hintText="Type book title here ..."
        floatingLabelText="Book Title"
        style={{
          'width': '300px'
        }}
      />
    </CardText>
  </Card>
);

export default BookSearch;