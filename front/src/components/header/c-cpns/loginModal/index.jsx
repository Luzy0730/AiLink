import React, { memo, useState, useEffect, useRef } from 'react'
import { Modal, Button, Form, Input } from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { LoginModalWrapper } from './style';
import { setShowLoginModal, setIsLoginMode } from '@/store/modules/user.store'
const LoginModal = memo(() => {
  const dispatch = useDispatch()
  const { showLoginModal, isLoginMode } = useSelector(state => ({
    showLoginModal: state.user.showLoginModal,
    isLoginMode: state.user.isLoginMode,
  }), shallowEqual)

  // 倒计时
  const [countdown, setCountdown] = useState(0);
  const handleCode = () => {
    if (countdown > 0) return
    setCountdown(20);
  }
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const formRef = useRef()
  const [formInfo, setFormInfo] = useState({
    username: '',
    password: '',
    code: ''
  })
  const [loadings, setLoadings] = useState([false, false])

  const handleCancel = () => {
    dispatch(setShowLoginModal(false))
  };

  const handleSignin = async () => {
    try {
      const ret = await formRef.current.validateFields()
      console.log(ret)
    } catch (error) {
    }
    // handleCancel()
  };

  const handleLogin = async () => {
    try {
      const ret = await formRef.current.validateFields()
      console.log(ret)
    } catch (error) {
    }
    // handleCancel()
  };

  return (
    <Modal title={isLoginMode ? '用户登录' : '用户注册'} preserve={false} width={360} destroyOnClose footer={false} open={showLoginModal} onCancel={handleCancel}>
      <LoginModalWrapper>
        <Form
          ref={formRef}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            {
              isLoginMode ?
                <Input prefix="账号" value={formInfo.username} onChange={e => setFormInfo(Object.assign(formInfo, { username: e.target.value }))} />
                :
                <Input.Search prefix="账号" className={countdown > 0 ? 'disabled' : ''} onSearch={handleCode} enterButton={countdown > 0 ? `重新发送(${countdown})` : '发送验证码'} value={formInfo.username} onChange={e => setFormInfo(Object.assign(formInfo, { username: e.target.value }))} />
            }
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input prefix="密码" value={formInfo.password} onChange={e => setFormInfo(Object.assign(formInfo, { password: e.target.value }))} />
          </Form.Item>
          {
            !isLoginMode && <Form.Item
              name="code"
              rules={[{ required: true, message: '请输入验证码!' }]}
            >
              <Input prefix="验证码" value={formInfo.code} onChange={e => setFormInfo(Object.assign(formInfo, { password: e.target.value }))} />
            </Form.Item>
          }

        </Form>
        <div className='action'>
          {
            isLoginMode ? <>
              <Button type="link">忘记密码？</Button>
              <Button type="primary" loading={loadings[0]} onClick={handleLogin}>登录</Button>
              <Button type="link" onClick={() => dispatch(setIsLoginMode(false))}>没有账号？去注册</Button>
            </> : <>
              <Button type="link" onClick={() => dispatch(setIsLoginMode(true))}>已有账号？去登录</Button>
              <Button type="primary" loading={loadings[1]} onClick={handleSignin}>注册</Button>
            </>
          }
        </div>
      </LoginModalWrapper>
    </Modal>
  )
})

export default LoginModal