import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import todoLogo from "../../img/Microsoft_To-Do_icon.png";
/* import axios from "axios"; */
import { Page, RegisterBox, Input, Logo, Title, Label } from "./Style";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { getName, startFetching } from "../../actions/registerActions";
/* import PasswordStrengthBar from 'react-password-strength-bar'; */
import Button from "@material-ui/core/Button";

interface User {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

interface Error {
  isActive: boolean;
  error: string;
}

const useStyles = makeStyles({
    root: {
      backgroundColor: '#3495EA',
      "&hover": {
        backgroundColor: '#154a79',
      }
      
    }
  });

const Register = () => {
  const [userInfo, setUserInfo] = useState<User>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });


  const [error, setError] = useState<Error>({
    isActive: false,
    error: "",
  });

  const apiError = useSelector((state: RootStateOrAny) => state.registerReducer.error);
  const UserName:string = useSelector((state: RootStateOrAny) => state.registerReducer.user);
  
  

  /* hystory */
  let history = useHistory();
  /* style sovrescritto */
  const classes = useStyles();
  /* inizializzo useDispatch */
  const dispatch = useDispatch()

  const isComplete = () => {
    return userInfo.name &&
          userInfo.email &&
          userInfo.password &&
          userInfo.password === userInfo.confirm
  }

  const GetUserName = async (nameFromRedux:string) => {
    const Name:string = await nameFromRedux
    console.log(Name);
    
    if (Name !== '') {
      history.push('/todo')
    }
  }

  useEffect(()=>{
    if (apiError) {
      setError({isActive: true, error: apiError})
    }
    GetUserName(UserName)
  })

  const Submit = () => {
    if (
      isComplete()
    ) {
     /*  try {
        axios({
          method: "post",
          url: "http://localhost:5000/login/addUser",
          data: {
            name: userInfo.name.trim(),
            password: userInfo.password,
            email: userInfo.email.trim(),
          },
        }).then((res) => {
          if (res.data.isRegistered) {
            localStorage.setItem("token", res.data.data.token);
            /* dispatch(getName(userInfo.name.trim())); 
            history.push("/todo");
          } else {
            setError({
              isActive: true,
              error: res.data.err,
            });
          }
        });
      } catch (error) {
        console.log(error);
      } */
      dispatch(startFetching());
      dispatch(getName(userInfo));
    }
  };

  return (
    <Page>
      <RegisterBox>
        <Logo src={todoLogo} alt={todoLogo} />
        <hr />
        <Title>Register</Title>
        {error.isActive && <p>{error.error}, riprova più tardi</p>}
        <Label htmlFor="name">First name:</Label>
        <Input
          type="text"
          name="name"
          id="name"
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
        />

        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />

        <Label htmlFor="password">Password:</Label>
        <Input
          type="password"
          name="password"
          id="password"
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />

        <Label htmlFor="controlPword">Conferm password:</Label>
        <Input
          type="password"
          name="controlPword"
          id="controlPword"
          onChange={(e) =>
            setUserInfo({ ...userInfo, confirm: e.target.value })
          }
        />
        {/* <button onClick={Submit}>submit</button> */}
        <Button variant="contained" color="primary" size="large" disableElevation classes={{root: classes.root}} onClick={() => {Submit()}}>
          Submit
        </Button>
      </RegisterBox>
    </Page>
  );
};

export default Register;
