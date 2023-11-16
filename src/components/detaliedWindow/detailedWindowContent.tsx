import React, { useState } from 'react';
import styles from './detailedWindow.module.scss';
import { person } from '../../API/getItems/getItems';
import Loader from '../loader/loader';
interface DetailedWindowContentProps {
  person: person;
  handleClose: () => void;
}
const DetailedWindowContent: React.FC<DetailedWindowContentProps> = ({
  person,
  handleClose,
}) => {
  const [pendingPhoto, setPendingPhoto] = useState<boolean>(true);

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
        <img
          role="img"
          src={person.imageURL}
          alt="image of person"
          onLoad={() => {
            setPendingPhoto(false);
          }}
        />

        <div>birth year: {person.birth_year}</div>
        <div>hair color: {person.hair_color}</div>
        <div>gender: {person.gender}</div>
        <div>mass: {person.mass}</div>
        <div>skin color: {person.skin_color}</div>
      </div>
    </>
  );
};

export default DetailedWindowContent;
