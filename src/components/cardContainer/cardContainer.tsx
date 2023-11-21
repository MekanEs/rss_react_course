import React from 'react';
import styles from './cardContainer.module.scss';
import Card from '../card/card';
import { useNavigate, useParams } from 'react-router-dom';
import NothingFound from '../nothingFound/nothingFound';
import { useAppSelector } from '../../store/hooks/reduxHooks';
import { SearchSelectors } from '../../store/searchReducer/selectors';
import { pathGen } from '../../utils';
import DetailedWindowContainer from '../detaliedWindow/container/detailedWindowContainer';

const CardContainer: React.FC = () => {
  const personArray = useAppSelector(SearchSelectors.personArray);

  const { page, id } = useParams();

  const nav = useNavigate();

  const handleClick = () => {
    nav(pathGen(page));
  };

  if (personArray.length === 0) {
    return <NothingFound />;
  }

  return (
    <div className={styles.content}>
      <div onClick={handleClick} className={styles.cardContainer}>
        {personArray.map((person) => (
          <Card key={person.name} person={person} />
        ))}
      </div>
      {id && <DetailedWindowContainer />}
    </div>
  );
};

export default CardContainer;
