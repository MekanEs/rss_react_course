import React, { useCallback, useEffect, useState } from 'react';
import styles from './detailedWindow.module.scss';
import { person } from '../../API/getItems/getItems';

import Loader from '../loader/loader';
import { useNavigate, useParams } from 'react-router-dom';
import getPerson from '../../API/getItems/getPerson';
import DetailedWindowContent from './detailedWindowContent';

const DetailedWindow: React.FC = () => {
  const [person, setPerson] = useState<person | null>(null);
  const [pending, setPending] = useState<boolean>(false);

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

  const handleClose = useCallback(() => nav(`/page/${page}`), [page, nav]);
  if (!id || !person) {
    return <></>;
  }
  return (
    <div className={styles.detailedWindow}>
      <Loader showLoader={pending}>
        <DetailedWindowContent person={person} handleClose={handleClose} />
      </Loader>
    </div>
  );
};

export default DetailedWindow;
