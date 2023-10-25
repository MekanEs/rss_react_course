import React, { FC } from 'react';
import { itemsArrtype, itemtype } from '../../App';

type ItemListPropstype = { items: itemsArrtype };

const ItemList: FC<ItemListPropstype> = ({ items }) => {
  return (
    <section className="main-section">
      {items.map((el: itemtype) => {
        return (
          <div className="item" key={el.id}>
            <div className="bg-blur"></div>
            <h2>{el.name}</h2>
            <div className="contenBlock">
              <img
                onMouseOver={() => {
                  console.log('over');
                  const app = document.querySelector('.app') as HTMLElement;
                  app.style['background'] = `url(${
                    el.poster?.previewUrl || el.poster.url
                  })`;
                  app.style['animation'] = `none`;
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
    </section>
  );
};

export default ItemList;
