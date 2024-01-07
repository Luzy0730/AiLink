import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  font-family: 'GeosansLight';
  height: 0.8rem;
  width: 100%;
  box-shadow: 0 0px 20px 0 #ccc;
  position: absolute;
  top: 0;
  left: 0;
  .content {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      cursor: pointer;
    }
    button {
      margin-left: 0.16rem;
    }
  }
`;
