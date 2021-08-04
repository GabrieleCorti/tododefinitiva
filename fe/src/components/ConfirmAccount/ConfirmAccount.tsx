import React from 'react'
import { Page, RegisterBox, Title } from '../Register/Style'
import { StyledLink } from '../Login/Style';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import axios from 'axios';

const ConfirmAccount = () => {

    const useStyles = makeStyles({
        root: {
          backgroundColor: '#3495EA',
          "&hover": {
            backgroundColor: '#154a79',
          }
          
        }
      });
    /* style sovrescritto */
    const classes = useStyles();
    const code = localStorage.getItem('code')
    console.log(code);
    
    useEffect(()=>{  
            console.log('starta');
            
            try {
                axios.put('http://localhost:5000/confirm-account', {
                    code: code
                }).then((res)=>{
                    console.log(res);
                })
            } catch (error) {
                console.log(error);   
            }
    }, [])

    return (
        <Page>
            <RegisterBox className='center'>
                <Title>Grazie per la registraione</Title>
                <StyledLink to='/todo'><Button variant="contained" color="primary" size="large" disableElevation classes={{root: classes.root}}>
                    Submit
                </Button></StyledLink>        
            </RegisterBox>
        </Page>
    )
}

export default ConfirmAccount
