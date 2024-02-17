import React, { memo, useState, useEffect, useRef } from 'react'
import { Modal, Button, Form, Input, App } from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { LoginModalWrapper } from './style';
import { setShowUserModal, setUserModalMode, setToken, setUserInfo } from '@/store/modules/user.store'
import { getCode, register, login } from '@/apis/user'

const LoginModal = memo(() => {
  const { message } = App.useApp();
  const dispatch = useDispatch()
  const { showUserModal, userModalMode } = useSelector(state => ({
    showUserModal: state.user.showUserModal,
    userModalMode: state.user.userModalMode,
  }), shallowEqual)
  const [loadings, setLoadings] = useState([false, false])

  // 发送校验码
  const [countdown, setCountdown] = useState(0);
  const handleCode = async () => {
    try {
      await formRef.current.validateFields(['username']);
      setLoadings([...loadings.slice(0, 1), true])
      await getCode({ username: formInfo.username, mode: userModalMode === 3 ? 1 : 0 })
      message.success('验证码已发送')
      if (countdown > 0) return
      setCountdown(60);
    } catch (error) {
    } finally {
      setLoadings([...loadings.slice(0, 1), false])
    }
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
  useEffect(() => {
    formRef.current?.resetFields()
  }, [userModalMode])
  const handleCancel = () => {
    setCountdown(0)
    dispatch(setShowUserModal(false))
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      switch (userModalMode) {
        case 1:
        case 3:
          handleSignin()
          break;
        case 2:
          handleLogin()
          break;
        default:
          break;
      }
    }
  }
  const handleSignin = async () => {
    try {
      setLoadings(preLoadings => {
        const newLoadings = [...preLoadings]
        newLoadings[1] = true
        return newLoadings
      })
      await formRef.current.validateFields()
      await register({ ...formInfo, reset: userModalMode === 3 })
      handleCancel()
      if (userModalMode === 3) {
        message.success('密码已重置')
      } else {
        handleLogin()
      }
    } catch (error) { } finally {
      setLoadings(preLoadings => {
        const newLoadings = [...preLoadings]
        newLoadings[1] = false
        return newLoadings
      })
    }
  };
  const handleLogin = async () => {
    try {
      setLoadings(preLoadings => {
        const newLoadings = [...preLoadings]
        newLoadings[0] = true
        return newLoadings
      })
      await formRef.current.validateFields()
      const { data } = await login({ username: formInfo.username, password: formInfo.password })
      const { token, userInfo } = data
      dispatch(setToken(token))
      dispatch(setUserInfo(userInfo))
      handleCancel()
    } catch (error) { }
    setLoadings(preLoadings => {
      const newLoadings = [...preLoadings]
      newLoadings[0] = false
      return newLoadings
    })
  };

  return (
    <Modal title={userModalMode === 1 ? '用户注册' : userModalMode === 2 ? '用户登录' : '重置密码'} preserve={false} width={360} destroyOnClose footer={false} open={showUserModal} onCancel={handleCancel}>
      <LoginModalWrapper>
        <Form
          ref={formRef}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            validateTrigger="onBlur"
            rules={[{ required: true, message: '请输入用户名!' }, { type: 'email', message: '请输入合法的邮箱地址！' }]}
          >
            {
              userModalMode === 2 ?
                <Input prefix="邮箱" value={formInfo.username} onChange={e => setFormInfo(Object.assign(formInfo, { username: e.target.value }))} onKeyPress={handleKeyPress} />
                :
                <Input.Search prefix="邮箱" className={countdown > 0 ? 'disabled' : ''} onSearch={handleCode} loading={loadings[1]} enterButton={countdown > 0 ? `重新发送(${countdown})` : loadings[1] ? '发送中' : '发送验证码'} value={formInfo.username} onChange={e => setFormInfo(Object.assign(formInfo, { username: e.target.value }))} onKeyPress={handleKeyPress} />
            }
          </Form.Item>
          <Form.Item
            name="password"
            validateTrigger="onBlur"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password prefix="密码" autoComplete='off' value={formInfo.password} onChange={e => setFormInfo(Object.assign(formInfo, { password: e.target.value }))} onKeyPress={handleKeyPress} />
          </Form.Item>
          {
            userModalMode !== 2 && <Form.Item
              name="code"
              validateTrigger="onBlur"
              rules={[{ required: true, message: '请输入验证码!' }]}
            >
              <Input prefix="验证码" value={formInfo.code} onChange={e => setFormInfo(Object.assign(formInfo, { code: e.target.value }))} onKeyPress={handleKeyPress} />
            </Form.Item>
          }

        </Form>
        <div className={`action ${userModalMode === 1 ? 'sign' : userModalMode === 2 ? 'login' : 'reset'}`}>
          <Button type="link" onClick={() => dispatch(setUserModalMode(3))}>忘记密码？</Button>
          <Button type="primary" loading={loadings[0]} onClick={[1, 3].includes(userModalMode) ? handleSignin : handleLogin}>{userModalMode === 1 ? '注册' : userModalMode === 2 ? '登录' : '重置'}</Button>
          <Button type="link" onClick={() => dispatch(setUserModalMode(1))}>没有账号？去注册</Button>
          <Button type="link" onClick={() => dispatch(setUserModalMode(2))}>已有账号？去登录</Button>
        </div>
      </LoginModalWrapper>
    </Modal>
  )
})

export default LoginModal