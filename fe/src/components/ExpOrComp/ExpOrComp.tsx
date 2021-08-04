import React, { useEffect } from "react";
import { Page, RegisterBox, Title } from "../Register/Style";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { GoToRegister, StyledLink } from "../Login/Style";
import { verifyToken } from "../../actions/verifyAction";

const ExpOrComp:React.FC = ({ children }) => {
  const Token = localStorage.getItem("token");
  const User = useSelector((state:RootStateOrAny) => state.loginReducer.name);
  const Name = useSelector((state:RootStateOrAny) => state.registerReducer.user);
  const hasName = User || Name
  const IsAutorised = useSelector((state:RootStateOrAny) => state.verifyReducer.isAuthorised);
  
  //dispatch
  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(verifyToken(Token))
    }, [])

  return (
    <>
      {IsAutorised && hasName ? (
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
