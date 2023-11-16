import React, { FC, useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getItems } from '../../API/getItems/getItems';
import { QueryContext } from '../../providers';
import { CardContainer, Loader, Pagination } from '../../components';

const Main: FC = () => {
  const nav = useNavigate();
  const {
    searchValue,
    limit,

    setPersonArr,
  } = useContext(QueryContext);

  const [total, setTotal] = useState<number | null | undefined>(null);
  const { page, id } = useParams();

  const [isPending, setIsPending] = useState<boolean>(false);
  useEffect(() => {
    if (page && total) {
      if (+page > Math.ceil(total / limit) || +page < 0) {
        nav('/not-found');
      }
      if ((id && +id > total) || (id && +id < 0)) {
        nav('/not-found');
      }
    }
  }, [total, limit, nav, page, id]);

  useEffect(() => {
    setIsPending(true);
    if (page)
      getItems(searchValue, +page, limit).then((data) => {
        if (data.detail) {
          nav('/not-found', { replace: true });
        }
        if (setPersonArr) {
          setPersonArr(data.items);
        }
        setTotal(data.total);
        setIsPending(false);
      });
  }, [searchValue, page, nav, limit, setPersonArr]);
  if (!page || !+page) {
    return <Navigate to={'/page/1'} />;
  }

  return (
    <Loader showLoader={isPending}>
      <CardContainer />
      <Pagination total={total} page={+page} />
    </Loader>
  );
};

export default Main;
