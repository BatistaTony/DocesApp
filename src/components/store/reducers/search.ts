
const initialState = {
    name: "" 
}

interface Actiontype {
    type: string,
    payload: {
        name: string
    }
}


export default function Search(state = initialState, action: Actiontype) {
    if (action.type === "SEARCHING") {
        return action.payload
    } else {
        return state
    }
}