import styled from "styled-components";

interface TitleProps {
    readonly isActive: boolean;
  };

export const FilterText = styled.span`
    display: inline-block;
    margin-left: 10px;
    transition: all 0.2 ease;
`;

export const Filter = styled.div<TitleProps>`
    padding: 6% 4%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0, 0.05);
    transition: all 0.2 ease;
    cursor: pointer;
    background-color: ${props => props.isActive ? '#3495EA' : "transparent"};
    color: ${props => props.isActive ? 'white' : "black"};
    &:hover{
        background-color: #3495EA;
        transition: all 0.2s ease;
        color: white;
    }
    /* &:hover ${FilterText} {
        color: white;
        transition: all 0.2 ease;
    } */
`;

