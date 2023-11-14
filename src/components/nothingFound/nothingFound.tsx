import React from 'react';
import { useAppDispatch } from '../../store/hooks/reduxHooks';
import {
  setSaveValue,
  setSearchValue,
} from '../../store/searchReducer/searchSlice';

const NothingFound: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      nothing is found
      <button
        onClick={() => {
          dispatch(setSearchValue(''));
          dispatch(setSaveValue(''));
        }}
      >
        clear
      </button>
    </div>
  );
};

export default NothingFound;
