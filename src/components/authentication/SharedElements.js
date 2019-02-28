import styled from 'styled-components';
import {NavLink} from "react-router-dom";

export const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  background: ${props => props.background};
`;
export const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const RegisterLabel = styled.div`
  color: white;
  margin-bottom: 10px;
  padding: 10px;
  text-align: center;  
`;

export const StyledNavLink = styled(NavLink)`
  :hover{
    color: #ffffff;
  }
  color: #6B89AB;
  text-decoration: none;
`;
