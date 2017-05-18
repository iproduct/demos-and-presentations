export const SEARCH =           'SEARCH';
export const SEARCH_COMPLETE =  'SEARCH_COMPLETE';
export const SEARCH_REJECTED =  'SEARCH_REJECTED';
export const LOAD_BOOK =        'LOAD_BOOK';
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

export const loadBook = (book) => ({
  type: LOAD_BOOK,
  book
});

export const selectBook = (bookId) => ({
  type: SELECT_BOOK,
  bookId
});
