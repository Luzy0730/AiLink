import React, { memo } from 'react'
import { HeaderWrapper } from './style'
import { Button } from 'antd';
const Header = memo(() => {
  return (
    <HeaderWrapper>
      <Button type="primary">Hello Arco</Button>
    </HeaderWrapper>
  )
})

export default Header