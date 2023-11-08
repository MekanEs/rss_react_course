import React, { useContext } from 'react';
import styles from './cardContainer.module.scss';
import Card from '../card/card';
import DetailedWindow from '../detaliedWindow/detailedWindow';
import { QueryContext } from '../../providers';

interface cardContainerProps {
  page: number;
}

const CardContainer: React.FC<cardContainerProps> = ({ page }) => {
  const { personArr } = useContext(QueryContext);
  return (
    <div className={styles.content}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.cardContainer}
      >
        {personArr.map((person) => (
          <Card key={person.name} person={person} page={page} />
        ))}
      </div>
      <DetailedWindow />
    </div>
  );
};

export default CardContainer;
