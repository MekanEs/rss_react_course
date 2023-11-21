import React, { FC, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { CardContainer, Loader, Pagination } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHooks';
import { useGetPeopleQuery } from '../../API/apiSlice';
import {
  setGetItemsPending,
  setPersonArray,
} from '../../store/searchReducer/searchSlice';
import { getDefinedItems, pathGen } from '../../utils';
import { NOT_FOUND_PATH } from '../../constants/constants';
import { SearchSelectors } from '../../store/searchReducer/selectors';

const Main: FC = () => {
  const { savedValue, limit } = useAppSelector(SearchSelectors.search);

  const dispatch = useAppDispatch();
  const { page } = useParams();
  const {
    data: data,
    isFetching,
    isSuccess,
    isError,
  } = useGetPeopleQuery({ query: savedValue, limit, page: !!page ? +page : 1 });

  useEffect(() => {
    if (page) {
      if (data) {
        dispatch(setPersonArray(getDefinedItems(data, limit, page)));
      }
    }
  }, [dispatch, data, limit, page]);

  useEffect(() => {
    dispatch(setGetItemsPending(isFetching));
  }, [isFetching, dispatch]);

  return (
    <>
      {(!page || !+page) && <Navigate to={pathGen(1)} />}
      {isFetching && <Loader showLoader={isFetching} />}
      {!isFetching && isSuccess && (
        <>
          <CardContainer />
          <Pagination total={data.total} page={Number(page)} />
        </>
      )}
      {isError && <Navigate to={NOT_FOUND_PATH} />}
    </>
  );
};

export default Main;
