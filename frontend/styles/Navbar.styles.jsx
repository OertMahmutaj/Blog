import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledNavLink = styled(Link)`
  color: #BF4F74;
  font-weight: bold;
  text-decoration: none;
  margin-right: 12px;

  &:hover {
    text-decoration: underline;
  }
`;
export const Wrapper = styled.section`
  padding: 1em;
  background: #d9db62;
  box-sizing: border-box;
`;