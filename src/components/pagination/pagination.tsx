import React, { FC } from 'react';
import styles from './pagination.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import PaginationButton from './paginationButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHooks';
import { saveLimit } from '../../store/searchReducer/searchSlice';

interface PaginationProps {
  page: number;
  total: number | null | undefined;
}

const Pagination: FC<PaginationProps> = ({ page, total }) => {
  const limit = useAppSelector((state) => state.search.limit);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { id } = useParams();
  const details = id ? `/details/${id}` : '';
  return (
    <div className={styles.pagination}>
      <PaginationButton
        text="&lt;&lt;"
        callback={() => nav(`/page/1${details}`)}
        condition={page === 1}
      />
      <PaginationButton
        text="&lt;"
        callback={() => nav(`/page/${page - 1}${details}`)}
        condition={page === 1}
      />

      {total && (
        <span className={styles.pages}>
          {page} / {Math.ceil(total / limit)}
        </span>
      )}
      <PaginationButton
        text="&gt;"
        callback={() => nav(`/page/${page + 1}${details}`)}
        condition={!!total && page === Math.ceil(total / limit)}
      />
      <PaginationButton
        text="&gt;&gt;"
        callback={() => {
          if (total) {
            nav(`/page/${Math.ceil(total / limit)}${details}`);
          }
        }}
        condition={!!total && page === Math.ceil(total / limit)}
      />

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
