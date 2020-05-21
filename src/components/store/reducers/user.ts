import { userType } from "./../../types";


interface actionType {
  type: string;
  payload:userType;
}

const initalState = {
  img: "",
  username: "",
  address: "",
  phonenumber: ""
};

export default function User(state = initalState, action: actionType) {


  switch (action.type) {
    case "GOT_USER": {
      return action.payload;
    }

    case "LOGOUT": {
      return initalState;
    }

    default: {
      return state;
    }
  }

}
