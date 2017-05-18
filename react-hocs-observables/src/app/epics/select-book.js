import { SELECT_BOOK, loadComplete, loadRejected } from '../actions';
import { Observable } from 'rxjs';
import { isBookLoaged } from '../reducers/books';

const API_PATH = 'https://www.googleapis.com/books/v1/volumes';
const { ajax } = Observable;

const selectBook = (actions$, store) =>
  actions$
    .ofType(SELECT_BOOK)
    .map(action => action.bookId)
    .switchMap(bookId => {
      console.log('Is book loaded:', isBookLoaged(store.getState(), bookId));
      if (!bookId || bookId === '' || isBookLoaged(store.getState(), bookId)) {
        return Observable.empty();
      }

      return ajax.getJSON(`${API_PATH}/${bookId}`)
        .map(response => loadComplete(response || []));
    }).catch(error => Observable.of(
      loadRejected((error.xhr && error.xhr.response) || error)
    ));

export default selectBook;