import React, { useState } from 'react';
import styles from './card.module.scss';
import { person } from '../../API/getItems/getItems';
import Loader from '../loader/loader';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  person: person;
  // setCurPerson: React.Dispatch<React.SetStateAction<string | null>>;
  page: number;
}

const Card: React.FC<CardProps> = ({ person, page }) => {
  const [pendingPhoto, setPendingPhoto] = useState<boolean>(true);
  const [imgClassName, setClassName] = useState<string>(styles.invisible);
  const onLoad = () => {
    setClassName('');
    setPendingPhoto(false);
  };
  const nav = useNavigate();
  const id = person.url.split('/');
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();

        nav(`/page/${page}/details/${id[id.length - 2]}`);
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
