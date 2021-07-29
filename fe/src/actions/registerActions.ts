import { GET_NAME, START_FETCHING, HAS_ERROR } from "../actionTypes";
import axios from "axios";

export const getName = (obj: {
  name: string;
  password: string;
  email: string;
}) => {
  try {
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
        return {
          type: GET_NAME,
          payload: obj.name,
        };
      } else {
        return {
          type: HAS_ERROR,
          payload: res.data.err,
        };
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const startFetching = () => {
  return {
    type: START_FETCHING,
  };
};
