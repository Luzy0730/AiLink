import React, { memo, useEffect, useState } from 'react'
import { EyeOutlined, LockOutlined, CopyOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Button, QRCode, App } from 'antd';
import { setShowUserModal, setUserModalMode } from '@/store/modules/user.store'
import { ResultWrapper } from './style';

const Result = memo((props) => {
  const dispatch = useDispatch()
  const { token } = useSelector(state => ({
    token: state.user.token,
  }), shallowEqual)
  const { message } = App.useApp()
  const { dlInfo, closeResult } = props
  const [short, setShort] = useState()
  const handleCopy = () => {
    const sl = `短链接：${short}`
    const pw = dlInfo.password ? `\n密码：${dlInfo.password}` : ''
    const bz = '\n来自DLink的分享'
    const textToCopy = `${sl}${pw}${bz}`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          message.success('已复制到粘贴板');
        })
        .catch((error) => {
          message.error('复制功能出错');
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("Copy");
      textArea.remove();
      message.success('已复制到粘贴板');
    }
  }

  const handleLogin = () => {
    dispatch(setUserModalMode(2))
    dispatch(setShowUserModal(true))
  }

  useEffect(() => {
    setShort(`${window.location.origin}/${dlInfo.short}`)
  }, [dlInfo])

  return (
    <ResultWrapper>
      <div className='result_top'>
        <CloseOutlined onClick={closeResult} />
        <QRCode value={short || '-'} size={70} />
        <div className='linkinfo'>
          <div className='top-link'>
            <span>短链接：</span>
            <a href={short} target="_blank" rel="noreferrer">{short}</a>
            <CopyOutlined className='copy_icon' onClick={() => handleCopy()} />
            <div className='linkborder'></div>
            <EyeOutlined />
            <span className="linkitem">访问次数：{dlInfo.visitCount}</span>
            <LockOutlined style={{ marginLeft: '32px' }} />
            <span className="linkitem">密码：{dlInfo.password ? dlInfo.password : '无'}</span>
          </div>
          <p className="origin-link" title={dlInfo.url}>原始链接：{dlInfo.url}</p>
        </div>
      </div>
      <div className='result_bottom'>
        <p>注意：此短链接有效期 <b>30分钟</b>，{!token ? '登录后' : '个人中心'}可设置永久有效并可查看完整访问数据。</p>
        {!token && <Button type="primary" onClick={handleLogin}>免费使用</Button>}
      </div>
    </ResultWrapper>
  )
})

export default Result