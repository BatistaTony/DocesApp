import { userType } from './../../types'


export const getUser = (payload: userType) => {
  return {
    type: "GOT_USER",
    payload
  }
}
