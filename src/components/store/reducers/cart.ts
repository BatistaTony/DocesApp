import { cartType } from "./../../types";

interface actionType {
  type: string;
  payload: any;
}

const initialState:cartType = {
  prods: [],
};

export default function cart(state = initialState, action: actionType) {
  switch (action.type) {
    case "ADD_TO_CART": {
      if (state.prods) {
        state.prods.push(action.payload);
      }

      var stateC = state;

      return stateC;
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

      var stateC = state;

      return stateC;
    }

    default: {
      return state;
    }
  }
}
