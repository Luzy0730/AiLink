import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd';
import { HeaderWrapper } from './style'
const Header = memo(() => {
  const navigate = useNavigate()
  return (
    <HeaderWrapper>
      <div className='content'>
        <h1 onClick={() => navigate('/')}>AiLink</h1>
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