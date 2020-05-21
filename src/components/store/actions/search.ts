interface searchType {
    name: string
}

const search = (payload: searchType) => {
    return {
        type: "SEARCHING",
        payload
    }
}

export {search}