import React, { useState } from 'react';
import styles from './detailedWindow.module.scss';
import Loader from '../loader/loader';
import { DetailedWindowProps } from './detailedWindow.interface';

const DetailedWindow: React.FC<DetailedWindowProps> = ({
  person,
  handleClose,
}) => {
  const [pendingPhoto, setPendingPhoto] = useState<boolean>(true);

  const handleLoad = () => {
    setPendingPhoto(false);
  };

  return (
    <>
      <button
        className={styles.closeButton}
        onClick={handleClose}
        name="close button"
      >
        X
      </button>
      <h2>{person.name}</h2>
      <div className={styles.description}>
        <Loader showLoader={pendingPhoto} />
        <img src={person.imageURL} alt="image of person" onLoad={handleLoad} />
        <div>birth year: {person.birth_year}</div>
        <div>hair color: {person.hair_color}</div>
        <div>gender: {person.gender}</div>
        <div>mass: {person.mass}</div>
        <div>skin color: {person.skin_color}</div>
      </div>
    </>
  );
};

export default DetailedWindow;
