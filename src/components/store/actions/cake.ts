import { ItemType } from "./../../types"; 


export const setCake = (payload: ItemType) => {
    return {
        type: "SET_CAKE",
        payload
    }
}; 