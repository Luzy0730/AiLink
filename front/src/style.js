import styled from 'styled-components';

export const AppWrapper = styled.div`
  position: relative;
  .page {
    width: 100%;
    padding:${props => props.showlayout === 'true' ? '80px 0 0' : ''} ;
    min-height: ${props => props.showlayout === 'true' ? 'calc(100vh - 215px)' : '100vh'};
    &.center {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
