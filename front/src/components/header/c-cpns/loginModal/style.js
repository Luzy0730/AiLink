import styled from "styled-components";

export const LoginModalWrapper = styled.div`
.ant-form {
  margin-top: 30px;
  .ant-input-search.disabled button {
    cursor: not-allowed;
    border-color: #d9d9d9;
    color: rgba(0, 0, 0, 0.25);
    background: rgba(0, 0, 0, 0.04);
    box-shadow: none;
    & >div {
      display: none;
    }
  }
}
  .ant-input-affix-wrapper {
    padding: 10px;
    box-shadow: none;
  }
  .ant-input-wrapper {
    font-family: 'GeosansLight';
    button {
      width: 100px;
      padding: 4px 8px;
      height: 44px;
    }
  }
  .action {
    display: flex;
    flex-direction: column;
    button {
      padding: 0;
    }
    button:first-child {
      display: none;
      align-self: flex-start;
    }
    button:nth-child(2) {
      margin: 15px 0 10px;
      height: 42px;
    }
    button:nth-child(3),
    button:nth-child(4) {
      display: none;
    }
    &.sign {
      button:first-child {
        display: block;
      }
      button:nth-child(4) {
        display:block ;
      }
    }
    &.login {
      button:nth-child(3) {
        display:block ;
      }
    }
    &.reset {
      button:nth-child(3) {
        display:block ;
      }
    }
  }
`