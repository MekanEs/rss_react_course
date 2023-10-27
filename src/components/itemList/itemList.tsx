import React, { FC } from 'react';
import { itemsArrtype, itemtype } from '../../App';

type ItemListPropstype = {
  items: itemsArrtype | Error;
  setBackground: (url: string) => void;
};

const ItemList: FC<ItemListPropstype> = ({ items, setBackground }) => {
  return (
    <>
      {!(items instanceof Error) &&
        items.map((el: itemtype) => {
          return (
            <div className="item" key={el.id}>
              <div className="bg-blur"></div>
              <h2>{el.name}</h2>
              <div className="contenBlock">
                <img
                  onMouseOver={() => {
                    console.log('background');
                    setBackground(el.poster?.previewUrl || el.poster.url);
                  }}
                  className="poster"
                  src={el.poster?.previewUrl || el.poster.url}
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
