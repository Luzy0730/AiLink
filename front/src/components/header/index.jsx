import React, { memo } from 'react'
import { HeaderWrapper } from './style'
import { Button } from 'antd';
const Header = memo(() => {
  return (
    <HeaderWrapper>
      <div className='content'>
        <h1>AiLink</h1>
        <div>
          <Button type="primary">充值</Button>
          <Button type="primary">注册</Button>
          <Button>登录</Button>
        </div>
      </div>
    </HeaderWrapper>
  )
})

export default Header