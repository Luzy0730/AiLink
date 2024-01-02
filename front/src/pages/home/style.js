import styled from 'styled-components';
export const HomeWrapper = styled.div`
  .wave1 {
    background: url(${require('assets/img/wave1.png')}) repeat-x;
    height: 75px;
    width: 100%;
  }
  .wave2 {
    background: url(${require('assets/img/wave2.png')}) repeat-x;
    height: 90px;
    width: calc(100% + 100px);
    left: -100px;
  }
`;
