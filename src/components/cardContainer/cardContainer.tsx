import React from 'react';
import styles from './cardContainer.module.scss';
import { personArr } from '../../pages/main';
import Card from '../card/card';
import DetailedWindow from '../detaliedWindow/detailedWindow';

interface cardContainerProps {
  personArr: personArr;
  page: number;
}

const CardContainer: React.FC<cardContainerProps> = ({ personArr, page }) => {
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
