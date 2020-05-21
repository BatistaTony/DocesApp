interface action_type {
  type: string;
  payload: {
    number: number,
    status: string,
    OutOf: number
  };
}

const initialState = {
  number: 0,
  status: 'none',
  OutOf: 0
};

const Menu = (state = initialState, action: action_type) => {
  if (action.type === "MENU") {
    return action.payload;
  } else {
    return state;
  }
};

export default Menu;
