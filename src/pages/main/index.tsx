import React, { FC, useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getItems, person } from '../../API/getItems/getItems';
import { QueryContext } from '../../providers';
import { Pagination } from '../../components';
import CardContainer from '../../components/cardContainer/cardContainer';
import Loader from '../../components/loader/loader';

export type personArr = person[];

const Main: FC = () => {
  const nav = useNavigate();
  const { searchValue, limit, saveSearchValue, setInputValue, setLimit } =
    useContext(QueryContext);
  const [personArr, setPersonArr] = useState<personArr>([]);
  const [total, setTotal] = useState<number | null | undefined>(null);
  const { page } = useParams();

  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    if (page)
      if ((total && +page > Math.ceil(total / limit)) || +page < 0) {
        nav('/not-found');
      }
  }, [total, limit, nav, page]);

  useEffect(() => {
    setIsPending(true);
    if (page)
      getItems(searchValue, +page, limit).then((data) => {
        if (data.detail) {
          nav('/not-found', { replace: true });
        }
        setPersonArr(data.items);
        setTotal(data.total);
        setIsPending(false);
      });
  }, [searchValue, page, nav, limit]);
  if (!page || !+page) {
    return <Navigate to={'/page/1'} />;
  }
  if (personArr.length === 0) {
    return (
      <Loader showLoader={isPending}>
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
      </Loader>
    );
  }

  return (
    <Loader showLoader={isPending}>
      <CardContainer personArr={personArr} page={+page} />
      <Pagination total={total} page={+page} setLimit={setLimit} />
    </Loader>
  );
};

export default Main;
