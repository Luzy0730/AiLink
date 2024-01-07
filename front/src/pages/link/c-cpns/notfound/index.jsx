import React, { memo } from 'react'
import { NotFoundWrapper } from './style'

const NotFound = memo(() => {
  return (
    <NotFoundWrapper>
      <img src={require('assets/img/404.png')} alt="" />
      <p>由
        <a href="/" target="_blank" rel="noreferrer">「AiLink」</a>
        提供网址跳转及数据统计服务</p>
    </NotFoundWrapper>
  )
})

export default NotFound