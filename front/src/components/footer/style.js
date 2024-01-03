import styled from 'styled-components';

export const FooterWrapper = styled.div`
  width: 100%;
  box-shadow: 0 0px 20px 0 #ccc;
  background: #f2f3f5;
  .content {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .concate {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 90px;
      color: rgb(32, 33, 37);
      margin-left: 20px;
    }
    .hr {
      width: 100%;
      border-top: 1px solid rgba(34,36,38,.15);
      border-bottom: 1px solid rgba(255,255,255,.1);
    }
    .copy {
      margin: 12px 0;
      color: #303659;
    }
  }
`;
