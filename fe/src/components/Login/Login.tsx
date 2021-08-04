import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import {Page, RegisterBox, Title, Label, Input, Logo} from '../Register/Style'
import todoLogo from "../../img/Microsoft_To-Do_icon.png";
import { ErrorMsg, GoToRegister, StyledLink } from './Style';
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
    //useHystory
    let history = useHistory();

    const isNotFound = useSelector((state:RootStateOrAny) => state.loginReducer.isNotFound);
    const Name = useSelector((state:RootStateOrAny) => state.loginReducer.name);
    /* console.log(Name); */
    
    useEffect(() => {
        /* const Token = localStorage.getItem('token'); */
        if (Name) {
            history.push('/todo')
        }
    }, [Name])

    const Log = () => {
        if (logInfo.email && logInfo.password) {
            startLogin();
            dispatch(logIn(logInfo));
        }
    }

    return (
        <Page>
            <RegisterBox>
                <Logo src={todoLogo} alt={todoLogo} />
                <hr />
                <Title>Login</Title>
                <Label htmlFor='email'>Email:</Label>
                <Input id='email' onChange={e => setLogInfo({...logInfo, email: e.target.value})}/>
                <Label htmlFor='password'>Password:</Label>
                <Input id='password' type='password' onChange={e => setLogInfo({...logInfo, password: e.target.value})}/>
                {isNotFound && <ErrorMsg>Email o password errati</ErrorMsg>}
                <Button variant="contained" color="primary" size="large" disableElevation classes={{root: classes.root}} onClick={() => {Log()}}>
                    Login
                </Button>
                <hr />
                <GoToRegister>Non hai un account? <StyledLink to='/register'>Registrati</StyledLink></GoToRegister>
            </RegisterBox>    
        </Page>
    )
}

export default Login
