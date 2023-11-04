import React, { useEffect, useState } from 'react';
import styles from './detailedWindow.module.scss';
import { person } from '../../API/getItems/getItems';
import { getPerson } from '../../API/getItems/getPerson';
import Loader from '../loader/loader';

interface DetailedWindowProps {
  personURL: string | null;
  setCurPerson: React.Dispatch<React.SetStateAction<string | null>>;
}

const DetailedWindow: React.FC<DetailedWindowProps> = ({
  personURL,
  setCurPerson,
}) => {
  const [person, setPerson] = useState<person | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [pendingPhoto, setPendingPhoto] = useState<boolean>(true);
  useEffect(() => {
    if (personURL !== null) {
      setPending(true);
      getPerson(personURL).then((pers) => {
        if (pers) {
          setPerson(pers);
          setPending(false);
        }
      });
    } else {
      setPerson(null);
    }
  }, [personURL]);
  return (
    person && (
      <div className={styles.detailedWindow}>
        {pending ? (
          <Loader />
        ) : (
          <>
            <button
              className={styles.closeButton}
              onClick={() => setCurPerson(null)}
            >
              X
            </button>
            <h2>{person.name}</h2>
            <div>
              <img
                src={person.imageURL}
                alt="image of person"
                onLoad={() => {
                  setPendingPhoto(false);
                }}
              />
              {pendingPhoto && <Loader />}
              <div>birth year: {person.birth_year}</div>
              <div>hair color: {person.hair_color}</div>
              <div>gender: {person.gender}</div>
              <div>mass: {person.mass}</div>
              <div>skin color: {person.skin_color}</div>
            </div>
          </>
        )}
      </div>
    )
  );
};

export default DetailedWindow;
