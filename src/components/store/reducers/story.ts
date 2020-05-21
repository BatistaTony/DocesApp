import { storyType } from "../../types";

interface actionType {
  type: string;
  payload: storyType;
}

const initialState: storyType = {
  url: "",
  text: {
    valueText: "",
    styleText: {
      color: "",
      background: "",
    },
  },
};

export default function story(state = initialState, action: actionType) {
  switch (action.type) {
    case "SEE_STORY": {
      return action.payload;
    }
      
    case "CLOSE_STORY": {
      return initialState;
    }

    default:
      return state;
  }
}
