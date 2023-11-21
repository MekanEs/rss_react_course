import React from 'react';
import { useAppDispatch } from '../../store/hooks/reduxHooks';
import {
  setSaveValue,
  setSearchValue,
} from '../../store/searchReducer/searchSlice';
import styles from './nothingFound.module.scss';

const NothingFound: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setSearchValue(''));
    dispatch(setSaveValue(''));
  };
  return (
    <div className={styles.container}>
      nothing is found
      <button className={styles.clear} onClick={handleClick}>
        clear
      </button>
    </div>
  );
};

export default NothingFound;
