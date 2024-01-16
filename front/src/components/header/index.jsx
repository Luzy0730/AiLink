import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { setShowLoginModal, setIsLoginMode } from '@/store/modules/user.store'
import { HeaderWrapper } from './style'
import LoginModal from './c-cpns/loginModal';
const Header = memo(() => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = () => {
    dispatch(setIsLoginMode(true))
    dispatch(setShowLoginModal(true))
  }

  const handleSignin = () => {
    dispatch(setIsLoginMode(false))
    dispatch(setShowLoginModal(true))
  }

  const handleCharge = () => {
    dispatch(setIsLoginMode(true))
    dispatch(setShowLoginModal(true))
  }

  return (
    <HeaderWrapper>
      <div className='content'>
        <h1 onClick={() => navigate('/')}>AiLink</h1>
        <div>
          <Button type="primary" onClick={handleCharge}>充值</Button>
          <Button type="primary" onClick={handleSignin}>注册</Button>
          <Button onClick={handleLogin}>登录</Button>
        </div>
      </div>
      <LoginModal />
    </HeaderWrapper>
  )
})

export default Header