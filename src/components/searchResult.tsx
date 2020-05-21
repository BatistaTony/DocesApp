import React, { useState } from "react";
import "./styles/resultsearch.scss";
import ItemCake from "./item_cake";
import { useSelector } from "react-redux";

export default function ResultSearch() {
  const search = useSelector((state: any) => state.Search);

  const [prods, setProds] = useState([
    {
      img: "/images/cake.jpg",
      name: "Ony cake",
      price: 100,
      type: "aNIVERSARY",
      isLoved: false,
      lovers: 40,
      key: "654645",
    },
    {
      img: "/images/shot-cropped-1558159069082.png",
      name: "Ony cake",
      price: 100,
      type: "aNIVERSARY",
      isLoved: false,
      lovers: 40,
      key: "654646",
    },
    {
      img: "/images/cake_colors.jpg",
      name: "Ony cake",
      price: 100,
      type: "aNIVERSARY",
      isLoved: false,
      lovers: 40,
      key: "654641",
    },
    {
      img: "/images/luxuryCake.jpg",
      name: "joao cake",
      price: 100,
      type: "aNIVERSARY",
      isLoved: false,
      lovers: 40,
      key: "654642",
    },
    {
      img: "/images/transferir.jpg",
      name: "JOny cake",
      price: 100,
      type: "aNIVERSARY",
      isLoved: false,
      lovers: 40,
      key: "654648",
    },
    {
      img: "/images/HAMURGUER.jpg",
      name: "TOny cake",
      price: 100,
      type: "aNIVERSARY",
      isLoved: false,
      lovers: 40,
      key: "654649",
    },
  ]);

  let matches = prods.filter((state) => {
    let regExp = new RegExp(`${search.name}`, "gi");
    if (search.name === "") {
      return state;
    } else if (search.name) {
      console.log(state.name.match(regExp));
             return state.name.match(regExp) || state.type.match(regExp);
           }
  });

  return (
    <div className="resultSearch">
      <h1 className="titl_news">Results</h1>
      <ul className="list_of_cakes">
        {matches.map((item, key) => (
          <ItemCake item={item} key={key} />
        ))}
      </ul>
    </div>
  );
}
