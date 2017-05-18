import { SEARCH, SEARCH_COMPLETE, LOAD_SUCCESS, SELECT_BOOK, BOOK_LOADED, BOOK_REJECTED } from '../actions';
import { createSelector } from 'reselect';
import { SEARCH_REJECTED } from '../../../../../../../../Demos_and_Presentations/git/demos-and-presentations/react-hocs-observables/src/app/actions/books';

const initialState = {
  ids: [],
  entities: {},
  selectedBookId: null,
  loading: true,
  error: false
};

export function books(state = initialState, action) {
  switch (action.type) {
  case SEARCH_COMPLETE:
  case LOAD_SUCCESS: {
    const books = action.books;
    const newBooks = books.filter(book => !state.entities[book.id]);

    const newBookIds = newBooks.map(book => book.id);
    const newBookEntities = newBooks.reduce((entities, book) => {
      return Object.assign(entities, {
        [book.id]: book
      });
    }, {});

    return {
      ids: [...state.ids, ...newBookIds],
      entities: Object.assign({}, state.entities, newBookEntities),
      selectedBookId: state.selectedBookId,
      loading: false,
      error: false
    };
  }

  case SELECT_BOOK: {
    return {
      ids: state.ids,
      entities: state.entities,
      selectedBookId: action.bookId,
      loading: !state.entities[action.bookId],
      error: false
    };
  }

  case BOOK_LOADED: {
    const book = action.book;

    if (state.ids.indexOf(book) > -1) {
      return state;
    }

    return {
      ids: [...state.ids, book.id],
      entities: Object.assign({}, state.entities, {
        [book.id]: book
      }),
      selectedBookId: state.selectedBookId,
      loading: false,
      error: false
    };
  }

  case BOOK_REJECTED: {
    const payload = action.payload;

    return Object.assign({}, state, {
      loading: false,
      error: payload
    });
  }

  default: {
    return state;
  }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getBookEntities = (state) => state.books.entities;

export const getIds = (state) => state.books.ids;

export const getSelectedId = (state) => state.books.selectedBookId;

export const isLoading = (state) => state.books.loading;

export const getError = (state) => state.books.error;

export const getSelectedBook = createSelector(getBookEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

export const getAll = createSelector(getBookEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});

// Helpers
export const isBookLoaged = (state, bookId) => state.books.ids.indexOf(bookId) > -1;
export const getBookById = (state, bookId) => state.books.entities[bookId];
