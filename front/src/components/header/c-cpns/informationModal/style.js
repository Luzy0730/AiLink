import styled from "styled-components";

export const InformationModalWrapper = styled.div`
  .user-info {
    display: flex;
    align-items: center;
    margin: 8px 0;
    .anticon.anticon-user{
      margin-right: 6px;
    }
  }
  .user-ctrl {
    .ant-btn {
      margin-right: 12px;
    }
  }
  .short-title {
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 12px;
  }
  ul {
    padding-left: 24px;
  }
`