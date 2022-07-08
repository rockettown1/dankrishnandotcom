import styled from "styled-components";
const Contents = ({ children }) => {
  return <Index>{children}</Index>;
};
export default Contents;

const Index = styled.section`
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.secondary_background};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;

  p {
    border-bottom: ${({ theme }) => `1px solid ${theme.highlight}`};
    font-size: 17px !important;
  }

  h1 {
    font-size: 6vw;
    margin: 20px 0;
    &:hover {
      cursor: pointer;
      user-select: none;
      color: ${({ theme }) => theme.highlight};
    }
  }
  h6 {
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;
