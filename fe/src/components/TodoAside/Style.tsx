import styled from "styled-components";
import bgImg from '../../img/todobg.jpg'
import SettingsIcon from '@material-ui/icons/Settings';

export const Aside = styled.aside`
    width: 300px;
    height: 100vh;
    /* border-right: 2px solid #3495EA; */
    background-color: #F4F4F4;
`;

export const MenuHeader = styled.div`
    background-color: #3495EA;
    height: 100px;
    padding: 10px 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    background-image: url(${bgImg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    .menu {
        position: relative;
    }
`;

export const UserName = styled.h2`
    color: white;
    font-size: 20px;
`;

export const MenuIcon = styled(SettingsIcon)`
    color: white;
    cursor: pointer;
`;