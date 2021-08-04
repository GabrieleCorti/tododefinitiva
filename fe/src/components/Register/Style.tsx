import styled from 'styled-components'
/* #eeaa3b */
export const Page = styled.div`
    height: 100vh;
    background-color: #3495EA;
    display: flex;
    align-items: center;
`;

export const RegisterBox = styled.div`
   width: 30%;
   margin: auto;
   background-color: white;
   padding: 40px 20px;
   display: flex;
   flex-direction: column;
   hr {      
    border: 0;
    height: 1px;
    background: #3495EA;
   }
   &.center {
       text-align: center;
   }
`;

export const Logo = styled.img`
    width: 20%;
    margin: 0 auto 40px;
`;

export const Title = styled.h1`
    text-align: center;
    margin: 15px 0;
    color: #3495EA;
`;

export const Label = styled.label`
    color: #3495EA;
    font-size: 18px;
`;


export const Input = styled.input`
   padding: 12px;
   font-size: 18px;
   margin: 8px 0 12px;
`;