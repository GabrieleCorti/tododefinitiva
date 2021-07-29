import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'
import todoLogo from '../../img/Microsoft_To-Do_icon.png'
import axios from 'axios'
import { Page, RegisterBox, Input, Logo, Title, Label } from './Style'

interface User {
    name:string,
    email:string,
    password:string,
    confirm:string
}

interface Error {
    isActive:boolean,
    error:string
}

const Register = () => {
    const [userInfo, setUserInfo] = useState<User>({
        name: '',
        email: '',
        password: '',
        confirm: ''
    });

    const [error, setError] = useState<Error>({
        isActive: false,
        error: ''
    });

    /* hystory */
    let history = useHistory();

    const Submit = () => {
        if (userInfo.name && userInfo.email && userInfo.password && userInfo.password === userInfo.confirm ) {
            try {
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/login/addUser',
                    data: {
                        name: userInfo.name,
                        password: userInfo.password,
                        email: userInfo.email
                    }
                }).then((res)=> {
                    if (res.data.isRegistered) {
                        history.push('/todo');
                    } else {
                        setError({
                            isActive: true,
                            error: res.data.err
                        })
                    }
                })  
            } catch (error) {

               console.log(error);
                
            }
        }
    }

    return (
        <Page>
            <RegisterBox>
                <Logo src={todoLogo} alt={todoLogo} />
                <hr />
                <Title>Register</Title>
                <Label htmlFor="name">Name:</Label>
                <Input type="text" name="name" id="name" onChange={e => setUserInfo({...userInfo, name: e.target.value })} />

                <Label htmlFor="email">Email:</Label>
                <Input type="email" name="email" id="email" onChange={e => setUserInfo({...userInfo, email: e.target.value })} />

                <Label htmlFor="password">Password:</Label>
                <Input type="password" name="password" id="password" onChange={e => setUserInfo({...userInfo, password: e.target.value })} />

                <Label htmlFor="controlPword">Conferm password:</Label>
                <Input type="password" name="controlPword" id="controlPword" onChange={e => setUserInfo({...userInfo, confirm: e.target.value })} />
                <button onClick={Submit}>submit</button>
            </RegisterBox>
        </Page>
    )
}

export default Register
