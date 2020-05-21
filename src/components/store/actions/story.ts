import { storyType } from "../../types";

interface stType extends storyType {
  indexA: number
}

export const seeStory = (payload: stType) => {
  return {
    type: "SEE_STORY",
    payload,
  };
};

export const closeStory = () => {
  return {
    type: "CLOSE_STORY",
    
  };
};


export const addStories = (payload: Array<storyType>) => {
  return {
    type: "ADD_STORIES",
    payload
  }
}