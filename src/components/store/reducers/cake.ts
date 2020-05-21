import { ItemType } from "./../../types";

interface actionType {
  type: string;
  payload: ItemType;
}

const initialState = {
  img: "",
  name: "",
  price: 0,
  isLoved: false,
  lovers: 0,
  type: "",
  key: "",
};

export default function Cake(state = initialState, action: actionType) {
  if (action.type === "SET_CAKE") {
    return action.payload;
  } else {
    return state;
  }
}
