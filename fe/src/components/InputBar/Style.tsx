import styled from "styled-components";

export const InputSection = styled.div`
    width: 100%;
    padding-left: 100px;
    height: 150px;
    background-color: #3495EA;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const TitleInput = styled.input`
    padding: 8px;
    font-size: 16px;
    width: 15%;
    border: none;
    margin-bottom: 12px;
`;

export const TextInput = styled(TitleInput)`
    width: 40%;
    margin-right: 20px;
`;

export const BtnAdd = styled.button`
    margin-left: 20px;
    padding: 10px;
    font-size: 25px;
    color: white;
    width: 50px;
    height: 50px;
    background-color: f5805c;
`;