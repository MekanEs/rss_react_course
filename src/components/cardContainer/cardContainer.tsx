import React, { useState } from 'react';
import styles from './cardContainer.module.scss';
import { personArr } from '../../pages/main';
import Card from '../card/card';
import DetailedWindow from '../detaliedWindow/detailedWindow';

interface cardContainerProps {
  personArr: personArr;
}

const CardContainer: React.FC<cardContainerProps> = ({ personArr }) => {
  const [curPerson, setCurPerson] = useState<string | null>(null);
  return (
    <div className={styles.content}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setCurPerson(null);
        }}
        className={styles.cardContainer}
      >
        {personArr.map((person) => (
          <Card setCurPerson={setCurPerson} key={person.name} person={person} />
        ))}
      </div>
      <DetailedWindow setCurPerson={setCurPerson} personURL={curPerson} />
    </div>
  );
};

export default CardContainer;
