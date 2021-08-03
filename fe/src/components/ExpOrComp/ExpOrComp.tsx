import React from "react";
import { Page, RegisterBox, Title } from "../Register/Style";
import { RootStateOrAny, useSelector } from "react-redux";
import { GoToRegister, StyledLink } from "../Login/Style";

const ExpOrComp: React.FC = ({ children }) => {
  const Token = localStorage.getItem("token");
  const Name = useSelector((state: RootStateOrAny) => state.loginReducer.name);

  return (
    <>
      {Token && Name ? (
        children
      ) : (
        <Page>
          <RegisterBox>
            <Title>Spiacente ma non ti è permesso entrare qui</Title>
            <GoToRegister>
              procedi con il <StyledLink to="/login">Login</StyledLink> o{" "}
              <StyledLink to="/register">Registrati</StyledLink>
            </GoToRegister>
          </RegisterBox>
        </Page>
      )}
    </>
  );
};

export default ExpOrComp;
