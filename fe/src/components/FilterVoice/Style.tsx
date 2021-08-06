import styled from "styled-components";

export const FilterText = styled.span`
    display: inline-block;
    margin-left: 10px;
    transition: all 0.2 ease;
`;

export const Filter = styled.div`
    padding: 4% 2%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #3495EA;
    transition: all 0.2 ease;
    cursor: pointer;
    &:hover{
        background-color: #3495EA;
        transition: all 0.2s ease;
    }
    &:hover ${FilterText} {
        color: white;
        transition: all 0.2 ease;
    }
`;

