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
