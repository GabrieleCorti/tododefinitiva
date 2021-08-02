import { GET_NAME, START_FETCHING, HAS_ERROR } from "../actionTypes";
import axios from "axios";
interface IObj {

        name: string;
        password: string;
        email: string;
   
}
/* export const getName = (obj:IObj ) => {

    axios({
      method: "post",
      url: "http://localhost:5000/login/addUser",
      data: {
        name: obj.name.trim(),
        password: obj.password,
        email: obj.email.trim(),
      },
    }).then((res) => {
      if (res.data.isRegistered) {
        localStorage.setItem("token", res.data.data.token);
        console.log(obj);
        const l = {
            type: GET_NAME,
            payload: obj.name,
          }
        return l;
      } else {
        return {
          type: HAS_ERROR,
          payload: res.data.err,
        };
      }
    });
  
}; */

export const getName = (obj:IObj) => {
    /* return function (dispatch:any) {
        return axios({
            method: "post",
            url: "http://localhost:5000/login/addUser",
            data: {
              name: obj.name.trim(),
              password: obj.password,
              email: obj.email.trim(),
            },
          }).then( _ => {
              dispatch({
                type: GET_NAME,
                payload: obj.name,
              })
          })
    } */
    const name = axios({
        method: "post",
        url: "http://localhost:5000/login/addUser",
        data: {
          name: obj.name.trim(),
          password: obj.password,
          email: obj.email.trim(),
        },
      })
      .then( (res:any) => res)
      .then(data => data)
        console.log(name);
        return {
            
            type: GET_NAME,
            payload: name  
        }

}

export const startFetching = () => {
  return {
    type: START_FETCHING,
  };
};
