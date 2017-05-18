import { SEARCH, SEARCH_COMPLETE, searchComplete, searchRejected} from '../actions';
import { Observable } from 'rxjs';

const API_PATH = 'https://www.googleapis.com/books/v1/volumes';
const { ajax } = Observable;

const search = action$ =>
  action$
    .ofType(SEARCH)
    .debounceTime(300)
    .map(action => action.query)
    .distinctUntilChanged()
    .do(query => console.log('Query:', query))
    .distinctUntilChanged()
    .mergeMap(query =>
      ajax.getJSON(`${API_PATH}?q=${query}`)
        .map(response => searchComplete(response.items || []))
    ).catch(error => Observable.of(
      searchRejected(error.xhr.response)
    ));

/*search$: Observable<Action> = this.actions$
    .ofType(book.SEARCH)
    .debounceTime(300)
    .map(toPayload)
    .switchMap(query => {
      if (query === '') {
        return empty();
      }

      const nextSearch$ = this.actions$.ofType(book.SEARCH).skip(1);

      return this.googleBooks.searchBooks(query)
        .takeUntil(nextSearch$)
        .map(books => new book.SearchCompleteAction(books))
        .catch(() => of(new book.SearchCompleteAction([])));
    });*/



export default search;