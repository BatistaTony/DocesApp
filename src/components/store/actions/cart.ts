import { ItemType, userType } from "./../../types";

export const createCart = (payload: userType) => {
  return {
    type: "CREATE_CART",
    cart: {user: payload, prods: []},
  };
};

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
