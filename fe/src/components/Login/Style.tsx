import styled from "styled-components";
import { Link } from "react-router-dom";

export const ErrorMsg = styled.p`
    color: #f5805c;
    margin-bottom: 12px;
    text-align: center;
    font-size: 18px;
`;

export const GoToRegister = styled.p`
    margin-top: 25px;
    text-align: center;
    font-size: 18px;
`;

export const StyledLink = styled(Link)`
        color: #3495EA;
        font-weight: bold;
        &:hover {
            color: #0066c0;
        }
`;