import React, { useContext, FC } from 'react';
import styles from './pagination.module.scss';
import { QueryContext } from '../../providers';
import { useNavigate } from 'react-router-dom';
import PaginationButton from './paginationButton';

interface PaginationProps {
  page: number;
  total: number | null | undefined;
  setLimit: ((value: number) => void) | undefined;
}

const Pagination: FC<PaginationProps> = ({ page, total, setLimit }) => {
  const { limit } = useContext(QueryContext);
  const nav = useNavigate();

  return (
    <div className={styles.pagination}>
      <PaginationButton
        text="&lt;&lt;"
        callback={() => nav('/')}
        condition={page === 1}
      />
      <PaginationButton
        text="&lt;"
        callback={() => nav(`/page/${page - 1}`)}
        condition={page === 1}
      />

      {total && (
        <span className={styles.pages}>
          {page} / {Math.ceil(total / limit)}
        </span>
      )}
      <PaginationButton
        text="&gt;"
        callback={() => nav(`/page/${page + 1}`)}
        condition={!!total && page === Math.ceil(total / limit)}
      />
      <PaginationButton
        text="&gt;&gt;"
        callback={() => {
          if (total) {
            nav(`/page/${Math.ceil(total / limit)}`);
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
            setLimit && setLimit(+e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Pagination;
