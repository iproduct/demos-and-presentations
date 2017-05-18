import './authors.css';
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {book : PropTypes.object.isRequired};

const Authors = ({ book }) => (
  <div>
    <h5 className="authors-header">Written By:</h5>
    <span className="authors-text">
      { book.volumeInfo.authors.join(', ') }
    </span>
  </div>
);

Authors.propTypes = propTypes;

export default Authors;
