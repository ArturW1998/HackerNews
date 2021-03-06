import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PAGES } from '../../constants/constants';

import './pagination.css';

const renderPaginationBtns = (onClick, page, lastPage) => {
  const startBtns = [page, page + 1, page + 2];
  const gapBtns = [page - 2, page - 1, page];
  const middleBtn = ['...'];
  const lastBtns = [lastPage - 3, lastPage - 2, lastPage - 1];

  let btnsArr = [];

  if (page < lastPage - 5) {
    btnsArr = [...startBtns, ...middleBtn, ...lastBtns];
  } else if (lastPage < 7) {
    btnsArr = Array.from({ length: lastPage }, (_, page) => ++page);
  } else if (page < lastPage - 4) {
    btnsArr = [...gapBtns, ...middleBtn, ...lastBtns];
  } else if (page < lastPage - 3) {
    btnsArr = [...gapBtns, ...lastBtns]; // last 6 pages
  } else {
    btnsArr = [...middleBtn, ...lastBtns]; // last 3 pages
  }

  return btnsArr.map(num => {
    const classes = classNames({ active: num === page });

    return num === '...' ? (
      num
    ) : (
      <button key={num} className={classes} data-name={num} onClick={onClick}>
        {num}
      </button>
    );
  });
};

const Pagination = ({ onClick, page, lastPage }) => (
  <div className="paginationWrapper">
    {page !== 0 && (
      <button data-name={PAGES.PREV} onClick={onClick}>
        {'<<'}
      </button>
    )}
    {renderPaginationBtns(onClick, page, lastPage)}
    {page < lastPage - 1 && (
      <button data-name={PAGES.NEXT} onClick={onClick}>
        {'>>'}
      </button>
    )}
  </div>
);

Pagination.propTypes = {
  onClick: PropTypes.func,
  page: PropTypes.number,
  lastPage: PropTypes.number,
};

Pagination.defaultProps = {
  onClick: () => {},
  page: 0,
  lastPage: 0,
};

export default Pagination;
