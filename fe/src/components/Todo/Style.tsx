import styled from "styled-components";
import AddCircleIcon from '@material-ui/icons/AddCircle';

export const AppVew = styled.div`
    display: flex;
`;

export const TodoSection = styled.div`
    height: 100vh;
    width: calc(100% - 300px);
    
`;

export const AddTodo = styled(AddCircleIcon)`
    color: #3495EA;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
        transform: scale(1.09);
        transition: all 0.2s ease;
    }
    &.large {
        height: 60px;
        width: 60px;
    }
    position: fixed;
    right: 20px;
    bottom: 40px;
`;