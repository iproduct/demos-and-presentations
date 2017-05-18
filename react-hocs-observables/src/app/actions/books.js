export const SEARCH =           'SEARCH';
export const SEARCH_COMPLETE =  'SEARCH_COMPLETE';
export const SEARCH_REJECTED =  'SEARCH_REJECTED';
export const BOOK_LOADED =      'BOOK_LOADED';
export const BOOK_REJECTED =    'BOOK_REJECTED';
export const SELECT_BOOK =      'SELECT_BOOK';

export const searchForBook = (query) => ({
  type: SEARCH,
  query
});

export const searchComplete = (books) => ({
  type: SEARCH_COMPLETE,
  books
});

export const searchRejected = (payload) => ({
  type: SEARCH_REJECTED,
  payload,
  error: true
});

export const loadComplete = (book) => ({
  type: BOOK_LOADED,
  book
});

export const loadRejected = (payload) => ({
  type: BOOK_REJECTED,
  payload,
  error: true
});

export const selectBook = (bookId) => ({
  type: SELECT_BOOK,
  bookId
});
