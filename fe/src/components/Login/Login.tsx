import React from 'react'
import { useState } from 'react'
import {Page, RegisterBox, Title, Label, Input} from '../Register/Style'

interface LogInfo {
    email:string,
    password:string
}

const Login = () => {
    const [logInfo, setLogInfo] = useState<LogInfo>({
        email: '',
        password: ''
    })

    return (
        <Page>
            <RegisterBox>
                <Title>Login</Title>
                <Label htmlFor='email'>Email:</Label>
                <Input id='email' onChange={e => setLogInfo({...logInfo, email: e.target.value})}/>
                <Label htmlFor='password'>Password:</Label>
                <Input id='password' onChange={e => setLogInfo({...logInfo, password: e.target.value})}/>
            </RegisterBox>    
        </Page>
    )
}

export default Login
