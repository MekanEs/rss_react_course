import React, { FC, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { CardContainer, Loader, Pagination } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHooks';
import { useGetPeopleQuery } from '../../API/apiSlice';
import {
  setGetItemsPending,
  setPersonArr,
} from '../../store/searchReducer/searchSlice';

const Main: FC = () => {
  const nav = useNavigate();
  const { savedValue, limit } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const { page, id } = useParams();
  const {
    data: data,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetPeopleQuery({ query: savedValue, limit, page: !!page ? +page : 1 });
  useEffect(() => {
    if (page) {
      // getItems('123', 1, 10);
      const ind =
        limit === 10 ? [0] : (limit * +page) % 10 === 0 ? [5] : [0, 5];
      if (data) {
        dispatch(setPersonArr(data.items.slice(...ind)));
      }
    }
  }, [dispatch, data, limit, page]);
  useEffect(() => {
    if (data && page && data.total) {
      if (+page > Math.ceil(data.total / limit) || +page < 0) {
        nav('/not-found');
      }
      if ((id && +id > data.total + 1) || (id && +id < 0)) {
        nav('/not-found');
      }
    }
  }, [data, limit, nav, page, id]);
  useEffect(() => {
    dispatch(setGetItemsPending(isFetching));
  }, [isFetching, dispatch]);
  if (!page || !+page) {
    return <Navigate to={'/page/1'} />;
  }

  let content;
  if (isFetching) {
    content = <Loader showLoader={isFetching} />;
  } else if (isSuccess) {
    content = (
      <>
        <CardContainer />
        <Pagination total={data.total} page={+page} />
      </>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }
  return <>{content}</>;
};

export default Main;
