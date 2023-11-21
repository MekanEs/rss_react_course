import React, { useCallback, useEffect } from 'react';
import styles from '../detailedWindow.module.scss';
import Loader from '../../loader/loader';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useGetPersonQuery } from '../../../API/apiSlice';
import { setGetPersonPending } from '../../../store/searchReducer/searchSlice';
import { useAppDispatch } from '../../../store/hooks/reduxHooks';
import { pathGen } from '../../../utils';
import { NOT_FOUND_PATH } from '../../../constants/constants';
import DetailedWindow from '../detailedWindow';

const DetailedWindowContainer: React.FC = () => {
  const { id, page } = useParams();
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const {
    data: data,
    isFetching,
    isSuccess,
    isError,
  } = useGetPersonQuery(!!id ? id : '');

  const handleClose = useCallback(() => nav(pathGen(page)), [page, nav]);

  useEffect(() => {
    dispatch(setGetPersonPending(isFetching));
  }, [isFetching, dispatch]);

  return (
    <div className={styles.detailedWindow}>
      {isFetching && <Loader showLoader={isFetching} />}
      {isSuccess && <DetailedWindow person={data} handleClose={handleClose} />}
      {isError && <Navigate to={NOT_FOUND_PATH} />}
    </div>
  );
};

export default DetailedWindowContainer;
