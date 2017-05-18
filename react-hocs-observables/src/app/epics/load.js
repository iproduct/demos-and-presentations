import { LOAD_BOOK, SELECT_BOOK } from '../actions';

const load = action$ =>
  action$
    .ofType(LOAD_BOOK)
    .do(val => console.log('BEFORE MAP:',val))
    .delay(1000) // Asynchronously wait 1000ms then continue
    .map(book => ({ type: SELECT_BOOK, bookId: book.id }) );

export default load;