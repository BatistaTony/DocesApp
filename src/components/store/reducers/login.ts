interface actionType {
  type: string;
  payload: {
    user: string;
    password: string;
  };
}

const initialState = {
  user: "",
  password: "",
};

export default function login(state = initialState, action: actionType) {
 
  switch (action.type) {
    case "LOGIN": {
      return action.payload;
    }

    case "LOGOUT": {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
