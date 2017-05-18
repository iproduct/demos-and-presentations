import './book-preview-list.css';
import React from 'react';
import Todo from './todo';
import TodoDetails from './todo-details';
import { CSSTransitionGroup } from 'react-transition-group';
import AnimationOnPropsChange from './animation-on-props-change';
import BookPreview from './book-preview';

export default class BookPreviewList extends React.Component {
  constructor(props) {
    super(props);
    this.prevSelectedBook = null;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedBook !== nextProps.selectedBook) {
      this.prevSelectedBook = this.props.selectedBook;
    }
  }

  render() {
    let { selectedBook, books, ...rest } = this.props;
    return (
      <div>
        <CSSTransitionGroup transitionName="books" transitionEnterTimeout={1000} transitionLeaveTimeout={1000} className="book-list">
          {books.map(todo =>
            (<BookPreview key={todo.id} className="list-group-item" book={todo} {...rest} />)
          )}
        </CSSTransitionGroup>
        {/*<AnimationOnPropsChange shouldFadeOut={this.prevSelectedBook !== null} shouldFadeIn={selectedBook !== null} todo={selectedBook} {...rest}>
          <TodoDetails />
        </AnimationOnPropsChange>*/}
      </div>
    );
  }
}
