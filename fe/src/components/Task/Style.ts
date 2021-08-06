import styled from "styled-components";
import MoreVertIcon from '@material-ui/icons/MoreVert';

export const TaskContainer = styled.div`
    height: calc(100vh - 150px);
    padding: 3% 10% 0;
    overflow-y: auto;
    background-size: cover;
    ul {
        list-style: none;
    }
`;

export const Date = styled.span`
    color: #ADB1E6;
    display: inline-block;
    font-size: 18px;
    margin-top: 12px;
`;

export const Todo = styled.li`
    position: relative;
    width: 100%;
    margin-bottom: 4%;
    background-color: white;
    -webkit-box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.21); 
    box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.21);
    padding: 20px 15px;
    border: 2px solid transparent;
    transition: all 0.2s ease;
    hr {
        border: 0;
        height: 1px;
        background-color: #3495EA;
    }
    &:hover {
        border: 2px solid #3495EA;
        transition: all 0.2s ease;
        transform: scale(1.005);
        -webkit-box-shadow: 5px 11px 15px 5px rgba(0,0,0,0.21); 
        box-shadow: 5px 11px 15px 5px rgba(0,0,0,0.21); 
    }
    &:hover ${Date} {
        color: #3495EA;
    }
    .menu {
        position: absolute;
        right: 10px;
        top: 10px;
    }
`;

export const TaskTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 10px;
    text-transform: capitalize;
`;

export const TaskBody = styled.p`
    margin-bottom: 20px;
    font-size: 20px;
`;

export const TaskMenuIcon = styled(MoreVertIcon)`
    transition: color 0.2s ease;
    cursor: pointer;
    &:hover {
        color: #3495EA;
        transition: color 0.2s ease;
    }
`;
export const Menu = styled.div`
    position: absolute;
    top: 0;
    ul {
        list-style: none;
    }
    /* li {
        color: #3495EA;
        cursor: pointer;
        padding: 12px;
        -webkit-box-shadow: 5px 7px 5px -2px rgba(0,0,0,0.11); 
        box-shadow: 5px 7px 5px -2px rgba(0,0,0,0.11);
    }
    li:hover {
        color: #FF7F50;
        transition: color 0.2 ease;
    } */
    background-color: white;
`;

export const MenuVoice = styled.li`
    color: #3495EA;
    cursor: pointer;
    padding: 12px;
    -webkit-box-shadow: 5px 7px 5px -2px rgba(0,0,0,0.11); 
    box-shadow: 5px 7px 5px -2px rgba(0,0,0,0.11);
    &:hover {
        color: #FF7F50;
        transition: color 0.2 ease;
    }
`;