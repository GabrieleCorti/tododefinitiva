import React from 'react'
import { Page, RegisterBox, Title } from '../Register/Style'
import {GoToRegister, StyledLink} from '../Login/Style'

const ExpOrComp = () => {
    return (
        <Page>
            <RegisterBox>
                <Title>Spiacente la tua sessione è scaduta</Title>
                <GoToRegister>Per poter proseguire procedi con un nuovo <StyledLink to='/login'>Login</StyledLink></GoToRegister>
            </RegisterBox>
            {/* child con il todo  */}
        </Page>
    )
}

export default ExpOrComp
