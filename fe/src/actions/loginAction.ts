import { LOGIN, START_LOGING, NOT_FOUND_USER } from "../actionTypes";
import axios from "axios";

interface Obj {
  email: string;
  password: string;
}

export const startLogin = () => {
  return {
    type: START_LOGING,
  };
};

const notFound = () => {
  return {
    type: NOT_FOUND_USER,
  };
};

const getUserData = (obj: Obj) => {
  return {
    type: LOGIN,
    payload: obj,
  };
};
/* .get('http://localhost:5000/login') */
export const logIn = (obj: Obj) => {
  /* console.log(obj.email, obj.password); */
  
  return (dispatch: any) => {
    return axios.post('http://localhost:5000/login', {
      email: obj.email,
      password: obj.password
    })
      .then((res) => {
        /* console.log(res); */
        
        if (res.data.isFound) {
          localStorage.setItem("token", res.data.data.token);
          dispatch(getUserData(res.data.data));
        } else {
          dispatch(notFound());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
