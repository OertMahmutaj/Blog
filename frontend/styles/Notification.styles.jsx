import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -10px); }
  to { opacity: 1; transform: translate(-50%, 0); }
`;


export const NotificationWrapper = styled.div`
  position: fixed;      
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #344e31;  
  color: white;
  padding: 1em 2em;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 999;
  font-weight: bold;
  animation: ${fadeIn} 0.3s ease;

  background-color: ${(props) =>
    props.type === "error" ? "#641111" : "#45630e"};
`;
