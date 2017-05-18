import { SEARCH, SEARCH_COMPLETE, SEARCH_REJECTED } from '../actions';
import { getBookEntities } from './books';
import { createSelector } from 'reselect';

const initialState = {
  ids: [],
  query: '',
  loading: false,
  error: false
};

export const search = (state = initialState, action) => {
  switch (action.type) {
  case SEARCH: {
    const query = action.query;

    if (query === '') {
      return {
        ids: [],
        query,
        loading: false,
        error: false
      };
    }

    return Object.assign({}, state, {
      query,
      loading: true,
      error: false
    });
  }

  case SEARCH_COMPLETE: {
    const books = action.books;

    return {
      ids: books.map(book => book.id),
      query: state.query,
      loading: false,
      error: false
    };
  }

  case SEARCH_REJECTED: {
    const books = action.books;

    return Object.assign({}, state, {
      loading: false,
      error: true
    });
  }

  default: {
    return state;
  }}
};

export const getSearchBookIds = (state) => state.search.ids;
export const getQuery = (state) => state.search.query;
export const isLoading = (state) => state.search.loading;

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of books in the store.
 */
export const getSearchResults = createSelector(getBookEntities, getSearchBookIds, (books, searchIds) => {
  return searchIds.map(id => books[id]);
});