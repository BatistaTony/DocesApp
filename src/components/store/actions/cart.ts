import { ItemType } from "./../../types";



export const addToCart = (payload: ItemType) => {
  return {
    type: "ADD_TO_CART",
    payload,
  };
};

export const deleteOfCart = (key: string) => {
  return {
    type: "DELETE_OF_CART",
    payload:key
  }
}
