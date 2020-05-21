import { storyType } from "../../types";



interface actionType {
    type: string,
    payload: Array<storyType>
}


const initialState: Array<storyType> = []


export default function stories(state = initialState, action: actionType) {
    if (action.type === "ADD_STORIES") {
        return action.payload
    } else {
        return state
    }
}