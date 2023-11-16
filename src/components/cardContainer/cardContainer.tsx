import React from 'react';
import styles from './cardContainer.module.scss';
import Card from '../card/card';
import DetailedWindow from '../detaliedWindow/detailedWindow';
import { useNavigate, useParams } from 'react-router-dom';
import NothingFound from '../nothingFound/nothingFound';
import { useAppSelector } from '../../store/hooks/reduxHooks';

const CardContainer: React.FC = () => {
  const personArr = useAppSelector((state) => state.search.personArr);
  const { page, id } = useParams();
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
      {id && <DetailedWindow />}
    </div>
  );
};

export default CardContainer;
