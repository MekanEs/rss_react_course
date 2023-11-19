import React, { useCallback, useEffect } from 'react';
import styles from './detailedWindow.module.scss';
import Loader from '../loader/loader';
import { useNavigate, useParams } from 'react-router-dom';
import DetailedWindowContent from './detailedWindowContent';
import { useGetPersonQuery } from '../../API/apiSlice';
import { setGetPersonPending } from '../../store/searchReducer/searchSlice';
import { useAppDispatch } from '../../store/hooks/reduxHooks';

const DetailedWindow: React.FC = () => {
  const { id, page } = useParams();
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const {
    data: data,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetPersonQuery(!!id ? id : '');
  const handleClose = useCallback(() => nav(`/page/${page}`), [page, nav]);
  useEffect(() => {
    dispatch(setGetPersonPending(isFetching));
  }, [isFetching, dispatch]);
  let content;
  if (isFetching) {
    content = <Loader showLoader={isFetching} />;
  } else if (isSuccess) {
    content = <DetailedWindowContent person={data} handleClose={handleClose} />;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  if (!id || !data) {
    return <>Nothing Fetched</>;
  }
  return <div className={styles.detailedWindow}>{content}</div>;
};

export default DetailedWindow;
