import React, { memo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setShowUserModal, setUserModalMode } from '@/store/modules/user.store'
import { HeaderWrapper } from './style'
import LoginModal from './c-cpns/loginModal';
import InformationModal from './c-cpns/informationModal';
const Header = memo(() => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector(state => ({
    userInfo: state.user.userInfo,
  }), shallowEqual)

  const handleLogin = () => {
    dispatch(setUserModalMode(2))
    dispatch(setShowUserModal(true))
  }

  const handleSignin = () => {
    dispatch(setUserModalMode(1))
    dispatch(setShowUserModal(true))
  }

  const informationModalRef = useRef()
  return (
    <HeaderWrapper>
      <div className='content'>
        <h1 onClick={() => navigate('/')}>DLink</h1>
        <div>
          {
            !userInfo
              ?
              <>
                <Button type="primary" onClick={handleSignin}>注册</Button>
                <Button onClick={handleLogin}>登录</Button>
              </>
              : <Button type="primary" onClick={() => informationModalRef.current.setVisible(true)}>个人中心</Button>
          }
        </div>
      </div>
      <LoginModal />
      <InformationModal ref={informationModalRef} />
    </HeaderWrapper>
  )
})

export default Header