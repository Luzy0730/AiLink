import styled from 'styled-components';
export const ResultWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 120%;
    border: 1px solid #dce3f2;
    padding: 20px 32px 16px;
    width: 780px;
    background-color: #fff;
    z-index: 199;
    .result_top {
      display: flex;
      align-items: center;
      .anticon-close {
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 20px;
      }
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
    .result_bottom {
      margin-top: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      color: #303659;
    }
`;
