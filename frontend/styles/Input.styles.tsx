import styled from "styled-components";

export const StyledInput = styled.input<{ $inputColor?: string; }>`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.$inputColor || "#BF4F74"};
  background: papayawhip;
  border: solid;
  border-radius: 3px;
`;