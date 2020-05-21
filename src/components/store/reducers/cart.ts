import { cartType, ItemType } from "./../../types";

interface actionType {
  type: string;
  cart?: any;
  payload?: any;
}

const initialState = {
  user: {
    img: "",
    username: "",
    phonenumber: "",
    address: "",
  },
  prods: [],
};

export default function cart(
  state: cartType = initialState,
  action: actionType
) {
  switch (action.type) {

    case "CREATE_CART": {
      return action.cart;
    }

    case "ADD_TO_CART": {

      if (state.prods) {
        state.prods.push(action.payload);
      }

      return state;
    }

    case "DELETE_OF_CART": {
      if (state.prods) {
        var indexToDel: number = -1;

        state.prods.map((item, index) => {
          if (item.key === action.payload) {
            indexToDel = index;
          }
        });

        if (state.prods && indexToDel >= 0) {
          state.prods.splice(indexToDel, 1);
        }
      }

      return state;
    }

    default: {
      return state;
    }
  }
}
