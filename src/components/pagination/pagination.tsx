import React, { useContext, FC } from 'react';
import styles from './pagination.module.scss';
import { QueryContext } from '../../providers';
import { useNavigate } from 'react-router-dom';

interface PaginationProps {
  page: number;
  total: number | null | undefined;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: FC<PaginationProps> = ({ page, total, setPage }) => {
  const { limit } = useContext(QueryContext);
  const nav = useNavigate();
  return (
    <div className={styles.pagination}>
      <div>
        <span
          onClick={() => {
            setPage(1);
            nav('/');
          }}
        >
          &lt;&lt;
        </span>
        <span
          onClick={() => {
            setPage(page - 1);
            nav(`/page/${page - 1}`);
          }}
        >
          &lt;
        </span>

        {total && (
          <span>
            {page} / {Math.ceil(total / limit)}
          </span>
        )}

        <span
          onClick={() => {
            setPage(page + 1);
            nav(`/page/${page + 1}`);
          }}
        >
          &gt;
        </span>
        <span
          onClick={() => {
            if (total) {
              setPage(Math.ceil(total / limit));
              nav(`/page/${Math.ceil(total / limit)}`);
            }
          }}
        >
          &gt;&gt;
        </span>
      </div>
    </div>
  );
};

export default Pagination;
