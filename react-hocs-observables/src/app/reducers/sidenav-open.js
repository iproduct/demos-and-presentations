import { OPEN_SIDENAV, CLOSE_SIDENAV } from '../actions';

export const sidenavOpen = (state = false, action) => {
  switch (action.type) {
  case OPEN_SIDENAV:
    return true;
  case CLOSE_SIDENAV:
    return false;
  default:
    return state;
  }
};

export const isSidenavOpen = (state) => (state) => state.sidenavOpen;

// const sideNavOpen = (state) => state.sidenavOpen;
// export const isSidenavOpen = (state) => createSelector(sideNavOpen, sideNavOpen => sidenavOpen);

