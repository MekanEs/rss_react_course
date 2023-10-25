import React, { FC } from 'react';
import { SetSearchQuerytype } from '../../App';

type HeaderPropstype = {
  searchQuery: string;
  setSearchQuery: SetSearchQuerytype;
  search: () => void;
  error: () => void;
};

const Header: FC<HeaderPropstype> = ({
  search,
  searchQuery,
  setSearchQuery,
  error,
}) => {
  return (
    <div className="header_container">
      <input
        className="input"
        type="text"
        value={searchQuery}
        onChange={setSearchQuery}
      />
      <button onClick={search}>Search</button>
      <button onClick={error}>Error</button>
    </div>
  );
};

export default Header;
