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
      position: relative;
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
      .result {
        position: absolute;
        left: 0;
        top: 120%;
        border: 1px solid #dce3f2;
        padding: 20px 32px 16px;
        width: 780px;
        background-color: #fff;
        z-index: 199;
        &_top {
          display: flex;
          align-items: center;
          .ant-qrcode {
            padding: 0 !important;
            border-radius: 0 !important;
            margin-right: 20px;
            flex-shrink: 0;
          }
          .linkinfo {
            display: flex;
            flex-direction: column;

            .top-link {
              display: flex;
              align-items: center;
              a {
                color: #3464e0;
                font-size: 12px;
              }
              .copy_icon {
                margin-left: 12px;
                color: #666;
                cursor: pointer;
                &:hover {
                  color: #3464e0;
                }
                &:active {
                  filter: brightness(0.5);
                }
              }
              .linkborder {
                width: 1px;
                height: 20px;
                background-color: #ebecf3;
                margin: 0 24px;
              }
              .linkicon {

              }
              .linkitem {
                font-size: 12px;
                margin-left: 8px;
              }
            }
            .origin-link {
              margin-top: 10px;
              width: 240px;
              color: #c5c7ce;
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        &_bottom {
          margin-top: 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          color: #303659;
        }
      }
    }
    .extra {
      width: 780px;
      margin: 40px auto 0;
      display: flex;
      gap: 24px;
      input {
        box-shadow: none;
      }
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
          width: 50%;
          margin-top: 60px;
          display: flex;
          justify-content: center;
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
