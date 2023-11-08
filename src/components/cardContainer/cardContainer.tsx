import React, { useContext } from 'react';
import styles from './cardContainer.module.scss';
import Card from '../card/card';
import DetailedWindow from '../detaliedWindow/detailedWindow';
import { QueryContext } from '../../providers';
import { useNavigate, useParams } from 'react-router-dom';
import NothingFound from '../nothingFound/nothingFound';

const CardContainer: React.FC = () => {
  const { personArr } = useContext(QueryContext);
  const { page } = useParams();
  const nav = useNavigate();

  if (personArr.length === 0) {
    return <NothingFound />;
  }

  return (
    <div className={styles.content}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          nav(`/page/${page}`);
        }}
        className={styles.cardContainer}
      >
        {personArr.map((person) => (
          <Card key={person.name} person={person} />
        ))}
      </div>
      <DetailedWindow />
    </div>
  );
};

export default CardContainer;
