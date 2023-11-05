import React, { useState } from 'react';
import styles from './card.module.scss';
import { person } from '../../API/getItems/getItems';
import Loader from '../loader/loader';

interface CardProps {
  person: person;
  setCurPerson: React.Dispatch<React.SetStateAction<string | null>>;
}

const Card: React.FC<CardProps> = ({ person, setCurPerson }) => {
  const [pendingPhoto, setPendingPhoto] = useState<boolean>(true);
  const [imgClassName, setClassName] = useState<string>(styles.invisible);
  const onLoad = () => {
    setClassName('');
    setPendingPhoto(false);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setCurPerson(person.url);
      }}
      className={styles.card}
    >
      <h2>{person.name}</h2>
      <div>
        <Loader showLoader={pendingPhoto} />
        <img
          className={imgClassName}
          src={person.imageURL}
          alt="image of person"
          onLoad={onLoad}
        />
      </div>
    </div>
  );
};

export default Card;
