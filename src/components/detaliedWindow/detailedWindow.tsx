import React, { useEffect, useState } from 'react';
import styles from './detailedWindow.module.scss';
import { person } from '../../API/getItems/getItems';
import { getPerson } from '../../API/getItems/getPerson';
import Loader from '../loader/loader';
import { useNavigate, useParams } from 'react-router-dom';

const DetailedWindow: React.FC = () => {
  const [person, setPerson] = useState<person | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [pendingPhoto, setPendingPhoto] = useState<boolean>(true);
  const { id, page } = useParams();
  const nav = useNavigate();
  useEffect(() => {
    if (id) {
      setPending(true);
      getPerson(`https://swapi.dev/api/people/${id}`).then((pers) => {
        if (pers) {
          setPerson(pers);
          setPending(false);
        }
      });
    } else {
      setPerson(null);
    }
  }, [id]);

  if (!id || !person) {
    return <></>;
  }
  return (
    <div className={styles.detailedWindow}>
      <Loader showLoader={pending}>
        <button
          className={styles.closeButton}
          onClick={() => nav(`/page/${page}`)}
        >
          X
        </button>
        <h2>{person.name}</h2>
        <div className={styles.description}>
          <Loader showLoader={pendingPhoto} />
          <img
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
      </Loader>
    </div>
  );
};

export default DetailedWindow;
