import React, { FC, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getItems } from '../../API/getItems/getItems';
import { CardContainer, Loader, Pagination } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHooks';
import { setPersonArr } from '../../store/searchReducer/searchSlice';

const Main: FC = () => {
  const nav = useNavigate();
  const { savedValue, limit } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
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
    if (page) {
      console.log(savedValue);

      getItems(savedValue, +page, limit).then((data) => {
        if (data.detail) {
          nav('/not-found', { replace: true });
        }

        dispatch(setPersonArr(data.items));

        setTotal(data.total);
        setIsPending(false);
      });
    }
  }, [savedValue, page, nav, limit, dispatch]);
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
