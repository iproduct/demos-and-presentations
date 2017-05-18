import { SEARCH, SEARCH_COMPLETE, searchComplete, searchRejected } from '../actions';
import { Observable } from 'rxjs';

const API_PATH = 'https://www.googleapis.com/books/v1/volumes';
const { ajax } = Observable;

const search = actions$ =>
  actions$
    .ofType(SEARCH)
    .debounceTime(300)
    .map(action => action.query)
    .distinctUntilChanged()
    .do(query => console.log('Query:', query))
    .distinctUntilChanged()
    .mergeMap(query => {
      if (query === '') {
        return Observable.empty();
      }
      console.log('Query to complete:', query);

      const nextSearch$ = actions$.ofType(SEARCH).skip(1);

      return ajax.getJSON(`${API_PATH}?q=${query}`)
        .takeUntil(nextSearch$)
        .map(response => searchComplete(response.items || []));
    }).catch(error => Observable.of(
      searchRejected(error.xhr.response)
    ));

export default search;