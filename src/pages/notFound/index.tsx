import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div>
      <h3>Page is not found</h3>
      <Link to={'/'}>Home</Link>
    </div>
  );
};

export default NotFound;
