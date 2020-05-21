import React from "react";
import "./styles/listofcake.scss";
import ItemCake from "./item_cake";
import { ItemType } from "./types"; 



interface Props {
  title: string,
  itens: Array<ItemType>
}

export const ListOfitens: React.FC<Props> = ({ title, itens }) => {

  const styleList = {
    gridTemplateColumns: `repeat(${itens.length}, auto)`,
    paddingRight: "4%"
  };

  return (
    <div className="news">
      <h1 className="titl_news">{title}</h1>

      <ul className="list_news" style={styleList}>
        {itens.map((i, key) => (
          <ItemCake item={i} key={key} />
        ))}
      </ul>
    </div>
  );
};
