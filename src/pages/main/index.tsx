import React, { FC, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getItems } from '../../API/getItems/getItems';
import { QueryContext } from '../../providers';

export type item = {
  name: string;
  description: string[];
  id: string;
  imageURL: string;
};
export type itemsArrtype = item[];

const Main: FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { searchValue, limit, saveSearchValue, setInputValue, setLimit } =
    useContext(QueryContext);
  const [items, setItems] = useState<itemsArrtype>([]);
  const [total, setTotal] = useState<number | null | undefined>(null);
  const [page, setPage] = useState<number>(+location.pathname.slice(6) || 1);
  const [isPending, setIsPending] = useState<boolean>(false);
  useEffect(() => {
    setIsPending(true);

    getItems(searchValue, page, limit).then((data) => {
      if (data.detail) {
        nav('/not-found', { replace: true });
      }
      setItems(data.items);
      setTotal(data.total);
      setIsPending(false);
    });
  }, [searchValue, page, nav, setPage, limit]);

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (items.length === 0) {
    return (
      <div>
        noting is found
        <button
          onClick={() => {
            setInputValue && setInputValue('');
            saveSearchValue && saveSearchValue('');
          }}
        >
          clear
        </button>
      </div>
    );
  }
  return (
    <div>
      {items.map((el) => (
        <div key={el.name}>{el.name}</div>
      ))}
      {total && Math.ceil(total / limit)}
      {total &&
        Array(Math.ceil(total / limit))
          .fill(0)
          .map((_, ind) => (
            <div
              onClick={() => {
                setPage(ind + 1);
                nav(`/page/${ind + 1}`);
              }}
              key={ind}
            >
              {ind + 1}
            </div>
          ))}
      <input
        type="number"
        value={limit}
        min={5}
        max={10}
        step={5}
        onChange={(e) => {
          setPage(1);
          setLimit && setLimit(+e.target.value);
        }}
      />
    </div>
  );
};

export default Main;
