import { userType } from "./../../types";


interface actionType {
  type: string;
  payload:userType;
}

const initalState = {
 phonenumber: "",
  location: {
    coords: {
      latitude: 0,
      longitude: 0,
    }
  }
}

export default function User(state = initalState, action: actionType) {


  switch (action.type) {
    case "GOT_USER": {
      return action.payload;
    }

    

    default: {
      return state;
    }
  }

}
