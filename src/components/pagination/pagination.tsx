import React, { FC, useCallback } from 'react';
import styles from './pagination.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import PaginationButton from './paginationButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHooks';
import { saveLimit } from '../../store/searchReducer/searchSlice';
import { pathGen } from '../../utils';
import { SearchSelectors } from '../../store/searchReducer/selectors';
import { PaginationProps } from './pagination.interface';

const Pagination: FC<PaginationProps> = ({ page, total }) => {
  const limit = useAppSelector(SearchSelectors.limit);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { id } = useParams();

  const toFirst = useCallback(() => nav(pathGen(1, id)), [id, nav]);

  const toPrevious = useCallback(
    () => nav(pathGen(--page, id)),
    [id, nav, page]
  );

  const toNext = useCallback(() => nav(pathGen(++page, id)), [id, nav, page]);

  const toLast = useCallback(
    () => total && nav(pathGen(Math.ceil(total / limit), id)),
    [id, nav, limit, total]
  );

  const isFirstPage = page === 1;
  const isLastPage = !!total && page === Math.ceil(total / limit);

  return (
    <div className={styles.pagination}>
      <PaginationButton text="<<" callback={toFirst} condition={isFirstPage} />
      <PaginationButton
        text="<"
        callback={toPrevious}
        condition={isFirstPage}
      />

      {total && (
        <span className={styles.pages}>
          {page} / {Math.ceil(total / limit)}
        </span>
      )}
      <PaginationButton text=">" callback={toNext} condition={isLastPage} />
      <PaginationButton text=">>" callback={toLast} condition={isLastPage} />

      <div className={styles.limit}>
        <span>limit:</span>
        <input
          className={styles.limitInput}
          type="number"
          name="limit"
          value={limit}
          min={5}
          max={10}
          step={5}
          onChange={(e) => {
            nav('/');
            dispatch(saveLimit(Number(e.target.value)));
          }}
        />
      </div>
    </div>
  );
};

export default Pagination;
