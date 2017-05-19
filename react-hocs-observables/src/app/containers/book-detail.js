import './book-detail.pcss';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import { getSelectedBook, isLoading, getError } from '../reducers/books';
import Authors from '../components/authors';
import getMarkdown from '../common/utils/get-markdown';
import RaisedButton from 'material-ui/RaisedButton';
import { goBack } from 'react-router-redux';

const mapStateToProps = (state, props) => ({
  book: getSelectedBook(state),
  loading: isLoading(state),
  error: getError(state)
});

const mapDispatchToProps = (dispatch, props) => ({
  goBack: () => {
   props.history.goBack();
  }
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class BookDetail extends React.Component {
  render() {
    const { book, loading, error, goBack } = this.props;

    return !loading && !error && (
      <Card className='book-detail'>
        <CardHeader
          title={book.volumeInfo.title}
          subtitle={book.volumeInfo.subtitle}
          avatar={book.volumeInfo.imageLinks &&
            <Avatar src={book.volumeInfo.imageLinks.smallThumbnail} className='thumbnail' style={{
              'borderRadius': '2px',
              'width': '60px',
              'height': 'auto',
            }} />
          }
          titleStyle={{
            fontSize: '22px',
            paddingBottom: '12px',
            lineHeight: '24px'
          }}
          subtitleStyle={{
            fontSize: '12pt'
          }}
          style={{
            paddingBottom: '0px'
          }}
        />
        {book.volumeInfo.description &&
          <CardText className="book-detail-content" style={{ paddingTop: '0', textDecoration: 'none' }}>
            <span dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }} />
          </CardText>
        }
        {book.volumeInfo.authors &&
          <CardText className="book-detail-authors" style={{ paddingTop: '0', textDecoration: 'none' }}>
            <Authors book={book} />
          </CardText>
        }
        <CardActions>
          <RaisedButton label="Bookmark" primary={true} />
          <RaisedButton label="Back" secondary={true} onClick={ goBack }/>
        </CardActions>
      </Card>
    )
  }
}
