import { LOAD_BOOK, SELECT_BOOK } from '../actions';
import { Observable } from 'rxjs';
import { LOCATION_CHANGE } from 'react-router-redux';
import { selectBook } from '../actions/books';

const API_PATH = 'https://www.googleapis.com/books/v1/volumes';
const { ajax } = Observable;

const routing = actions$ =>
  actions$
    .ofType(LOCATION_CHANGE)
    .debounceTime(300)
    .map(action => action.payload.pathname)
    .do(pathname => console.log('Routing:', pathname))
    .distinctUntilChanged()
    .switchMap(path => {
      const segments = path.split('/');
      console.log('Segments', segments);
      if (segments.length !== 3 || segments[1] !== 'book') {
        return Observable.empty();
      }
      const bookId = segments[2];
      console.log('BookId:', bookId);
      return Observable.of(selectBook(bookId));
    });

export default routing;
