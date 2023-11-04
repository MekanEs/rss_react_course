import React, { useContext, FC } from 'react';
import styles from './pagination.module.scss';
import { QueryContext } from '../../providers';
import { useNavigate } from 'react-router-dom';

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
      <div>
        <button
          disabled={page === 1}
          onClick={() => {
            nav('/');
          }}
        >
          &lt;&lt;
        </button>
        <button
          disabled={page === 1}
          onClick={() => {
            nav(`/page/${page - 1}`);
          }}
        >
          &lt;
        </button>
        {total && (
          <span>
            {page} / {Math.ceil(total / limit)}
          </span>
        )}
        <button
          disabled={!!total && page === Math.ceil(total / limit)}
          onClick={() => {
            nav(`/page/${page + 1}`);
          }}
        >
          &gt;
        </button>
        <button
          disabled={!!total && page === Math.ceil(total / limit)}
          onClick={() => {
            if (total) {
              nav(`/page/${Math.ceil(total / limit)}`);
            }
          }}
        >
          &gt;&gt;
        </button>
        <div className={styles.limit}>
          <span>limit:</span>
          <input
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
    </div>
  );
};

export default Pagination;
