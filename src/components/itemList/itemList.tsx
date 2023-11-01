import React, { FC } from 'react';
import { itemsArrtype, itemtype } from '../../App';
import movieIcon from '../../assets/movie.png';
type ItemListPropstype = {
  items: itemsArrtype | Error;
  setBackground: (url: string) => void;
};

const ItemList: FC<ItemListPropstype> = ({ items, setBackground }) => {
  console.log(items);

  return (
    <>
      {!(items instanceof Error) &&
        items.length &&
        items.map((el: itemtype) => {
          return (
            <div className="item" key={el.id}>
              <div className="bg-blur"></div>
              <h2>{el.name}</h2>
              <div className="contenBlock">
                <img
                  onMouseOver={() => {
                    setBackground(
                      el.poster?.previewUrl || el.poster?.url || movieIcon
                    );
                  }}
                  className="poster"
                  src={el.poster?.previewUrl || el.poster?.url || movieIcon}
                  alt="item poster"
                />
                <div className="description">{el.description}</div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ItemList;
