import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import {Page, RegisterBox, Title, Label, Input} from '../Register/Style'
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import {startLogin, logIn} from '../../actions/loginAction'

interface LogInfo {
    email:string,
    password:string
}

const Login = () => {
    const [logInfo, setLogInfo] = useState<LogInfo>({
        email: '',
        password: ''
    })

    const useStyles = makeStyles({
        root: {
          backgroundColor: '#3495EA',
          "&hover": {
            backgroundColor: '#154a79',
          }
          
        }
      });
    /* style sovreascritto */
    const classes = useStyles();
    /* dispatch */
    const dispatch = useDispatch()

    const Log = () => {
        if (logInfo.email && logInfo.password) {
            startLogin();
            dispatch(logIn(logInfo));
        }
    }

    return (
        <Page>
            <RegisterBox>
                <Title>Login</Title>
                <Label htmlFor='email'>Email:</Label>
                <Input id='email' onChange={e => setLogInfo({...logInfo, email: e.target.value})}/>
                <Label htmlFor='password'>Password:</Label>
                <Input id='password' onChange={e => setLogInfo({...logInfo, password: e.target.value})}/>
                <Button variant="contained" color="primary" size="large" disableElevation classes={{root: classes.root}} onClick={() => {Log()}}>
                    Login
                </Button>
            </RegisterBox>    
        </Page>
    )
}

export default Login
