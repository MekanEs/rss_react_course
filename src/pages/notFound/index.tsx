import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div>
      Page is not found
      <Link to={'/'}>Home</Link>
    </div>
  );
};

export default NotFound;
