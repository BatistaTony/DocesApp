import { userType } from './../../types'

interface typeLogin {
  user: string;
  password: string;
}

export const login = (payload: typeLogin) => {
    return {
        type: "LOGIN",
        payload
    }
};

export const logout = () => {
  return {
    type: "LOGOUT"
  }
}


export const getUser = (payload: userType) => {
  return {
    type: "GOT_USER",
    payload
  }
}
