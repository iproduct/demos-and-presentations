import './main-navigation.css';
import React from 'react';
import { connect } from 'react-redux';
import { openSidenav, closeSidenav } from '../actions';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { NavLink } from 'react-router-dom';
import LibraryBooksIcon from 'material-ui/svg-icons/av/library-books';
import SearchIcon from 'material-ui/svg-icons/action/search';

const mapStateToProps = (state) => ({
  isSidenavOpen: state.sidenavOpen
});

const mapDispatchToProps = (dispatch) => ({
  onOpenSidenav: () => {
    dispatch(openSidenav());
  },
  onCloseSidenav: () => {
    dispatch(closeSidenav());
  }
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class MainNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedTodo !== nextProps.selectedTodo) {
      this.prevSelectedTodo = this.props.selectedTodo;
    }
  }

  render() {
    let { isSidenavOpen, onOpenSidenav, onCloseSidenav, ...rest } = this.props;
    return (
      <div>
        <AppBar title="My Favourite Books"
          onLeftIconButtonTouchTap={onOpenSidenav}
          iconClassNameRight="muidocs-icon-navigation-expand-more" />

        <Drawer open={isSidenavOpen} docked={false} className="app-drawer" onRequestChange={onCloseSidenav}>
          <NavLink to="/collection">
            <MenuItem leftIcon={<LibraryBooksIcon />} onTouchTap={onCloseSidenav}>My Collection</MenuItem>
          </NavLink>
          <NavLink to="/search">
            <MenuItem leftIcon={<SearchIcon />} onTouchTap={onCloseSidenav}>Find Google Books</MenuItem>
          </NavLink>
        </Drawer>
      </div>
    );
  }
}
