import React, { FC, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getItems, person } from '../../API/getItems/getItems';
import { QueryContext } from '../../providers';
import { Pagination } from '../../components';
import CardContainer from '../../components/cardContainer/cardContainer';
import Loader from '../../components/loader/loader';

export type personArr = person[];

const Main: FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { searchValue, limit, saveSearchValue, setInputValue, setLimit } =
    useContext(QueryContext);
  const [personArr, setPersonArr] = useState<personArr>([]);
  const [total, setTotal] = useState<number | null | undefined>(null);
  const page = +location.pathname.slice(6) || 1;

  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    if ((total && page > Math.ceil(total / limit)) || page < 0) {
      nav('/not-found');
    }
  }, [total, limit, nav, page]);

  useEffect(() => {
    setIsPending(true);

    getItems(searchValue, page, limit).then((data) => {
      if (data.detail) {
        nav('/not-found', { replace: true });
      }
      setPersonArr(data.items);
      setTotal(data.total);
      setIsPending(false);
    });
  }, [searchValue, page, nav, limit]);

  if (isPending) {
    return <Loader />;
  }
  if (personArr.length === 0) {
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
    <>
      <CardContainer personArr={personArr} />
      <Pagination total={total} page={page} setLimit={setLimit} />
    </>
  );
};

export default Main;
