import styled from 'styled-components';
export const HomeWrapper = styled.div`
  .main {
    margin: 0 auto;
    width: 0;
    min-width: 1200px;
    padding: 40px 0 80px;
    h1 {
      color: #303659;
      font-weight: 400;
      line-height: 56px;
      margin-bottom: 32px;
      font-size: 40px;
      text-align: center;
    }
    .search {
      border: 1px solid #dce3f2;
      width: 790px;
      background-color: #fff;
      border-radius: 2px;
      padding: 16px 24px 16px 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 20px 40px rgba(52, 100, 224, 0.1);
      margin: 0 auto;
      .search_input {
        background: none;
        outline: none;
        border: 0;
        width: 576px;
        height: 100%;
        box-shadow: none;
      }
    }
    .extra {
      width: 844px;
      margin: 40px auto 0;
      display: flex;
      gap: 24px;
    }
  }
  .ad {
    > div {
      padding: 0.6rem 0;
      h1 {
        color: rgb(32, 33, 37);
        text-align: center;
        font-size: 200%;
        font-weight: 400;
      }
      ol li,
      ul li {
        line-height: 2;
      }
      .flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: wrap;
        color: #495a7c;
      }
      .func-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 100px;
        .display-item {
          margin-top: 60px;
          display: flex;
          img {
            width: 80px;
            height: 80px;
            margin-right: 40px;
          }
          .item-right_title {
            font-size: 16px;
            font-weight: 500;
            color: #303659;
            margin: 10px 0 12px;
          }
          .item-right_content {
            color: #495a7c;
            width: 320px;
            line-height: 20px;
          }
        }
      }
      &:nth-child(odd) {
        background: #f8f9fb;
      }
      &:nth-child(even) {
        background: #fff;
      }
    }
  }
`;
