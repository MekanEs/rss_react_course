import React, { useState } from 'react';
import styles from './card.module.scss';
import Loader from '../loader/loader';
import { useNavigate, useParams } from 'react-router-dom';
import { getIdFromURL, pathGen } from '../../utils';
import { HandleClickType } from '../types/common';
import { CardProps } from './card.inteface';

const Card: React.FC<CardProps> = ({ person }) => {
  const { page } = useParams();
  const [pendingPhoto, setPendingPhoto] = useState<boolean>(true);
  const [imgClassName, setClassName] = useState<string>(styles.invisible);
  const nav = useNavigate();
  const id = getIdFromURL(person.url);

  const handleClick: HandleClickType = (e) => {
    e.stopPropagation();
    nav(pathGen(page, id));
  };

  const handleLoad = (): void => {
    setClassName('');
    setPendingPhoto(false);
  };

  return (
    <div onClick={handleClick} className={styles.card}>
      <h2>{person.name}</h2>
      <div>
        {pendingPhoto && <Loader showLoader={pendingPhoto} />}
        <img
          className={imgClassName}
          src={person.imageURL}
          alt="image of person"
          onLoad={handleLoad}
        />
      </div>
    </div>
  );
};

export default Card;
