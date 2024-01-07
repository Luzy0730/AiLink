import React, { memo, useState } from 'react'
import { Card, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { ProtectedWrapper } from './style'
import { useLocation, useNavigate } from 'react-router-dom';
const Protected = memo(() => {
  const location = useLocation()
  const navigate = useNavigate()

  const [pwd, setPwd] = useState()

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const queryParams = { pwd }
      const targetUrl = `${location.pathname}?${new URLSearchParams(queryParams).toString()}`
      navigate(targetUrl)
    }
  };

  return (
    <ProtectedWrapper>
      <Card title={<div><LockOutlined /> 受保护的链接
      </div>}>
        <div className='content'>
          <Input value={pwd} onChange={event => setPwd(event.target.value)} onKeyDown={handleKeyDown} placeholder="请输入密码" addonAfter={<LockOutlined />} />
          <p>由
            <a href="/" target="_blank" rel="noreferrer">「AiLink」</a>
            提供网址跳转及数据统计服务</p>
        </div>
      </Card>
    </ProtectedWrapper>
  )
})

export default Protected