import React, { useContext } from 'react';
import { QueryContext } from '../../providers';

const NothingFound: React.FC = () => {
  const { setInputValue, saveSearchValue } = useContext(QueryContext);
  return (
    <div>
      nothing is found
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
};

export default NothingFound;
