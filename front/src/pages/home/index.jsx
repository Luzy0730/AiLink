import React, { memo, useRef, useState } from 'react'
import { HomeWrapper } from './style'
import { LockOutlined } from '@ant-design/icons';
import { createShort } from '@/apis/short'
import Result from './c-cpns/result/index';
import { Input, Button } from 'antd';
const Home = memo(() => {

  const [dlInfo, setDlInfo] = useState({
    isShow: false,
    hasExpire: true,
    short: '',
    url: '',
    visitCount: 0,
    password: undefined
  })

  const [shortParams, setShortParams] = useState({
    short: '', url: '', password: ''
  })
  const [loadings, setLoadings] = useState([false]);
  const enterLoading = (index, state = true) => {
    setLoadings(preLoadings => {
      const newLoadings = [...preLoadings]
      newLoadings[index] = state
      return newLoadings
    })
  }

  const generateShort = () => {
    enterLoading(0)
    createShort(shortParams).then(res => {
      setDlInfo(preDlInfo => ({
        ...preDlInfo,
        ...res.data,
        password: res.data.password ? res.data.password : undefined,
        isShow: true,
      }))
      console.log(dlInfo)
    }).catch(err => { }).finally(() => {
      enterLoading(0, false)
    })
  }

  const closeResult = () => {
    setDlInfo({ ...dlInfo, isShow: false })
  }

  return (
    <HomeWrapper>
      <div className='main'>
        <h1>简单易用的渠道短链接</h1>
        <div className='search'>
          <Input className='search_input' value={shortParams.url} onChange={(event) => setShortParams({ ...shortParams, url: event.target.value })} placeholder="请输入 http:// 或 https:// 开头的网址" />
          <Button type="primary" onClick={generateShort} loading={loadings[0]}>生成短链接</Button>
          {dlInfo.isShow && <Result dlInfo={dlInfo} closeResult={closeResult} />}
        </div>
        <div className='extra'>
          <Input value={shortParams.short} onChange={(event) => setShortParams({ ...shortParams, short: event.target.value })} addonBefore="http://dl.guaiguaizhanhao.cn/" placeholder="自定义链接（可选）" />
          <Input value={shortParams.password} onChange={(event) => setShortParams({ ...shortParams, password: event.target.value })} addonBefore={<LockOutlined />} placeholder="密码（可选）" />
        </div>
      </div>
      <div className='ad'>
        <div>
          <h1>提示</h1>
          <div className='flex-center'>禁止缩短有关病毒、赌博、反动、暴力、邪教、儿童色情等非法链接</div>
        </div>
        <div>
          <h1>功能特性</h1>
          <div className='flex-center'>四大基础功能特性，让链接管理、测试更方便</div>
          <div className='func-list'>
            <div className='display-item'>
              <img src={require('assets/img/1.png')} alt='链接缩短' />
              <div className='item-right'>
                <h4 className='item-right_title'>链接缩短</h4>
                <p className='item-right_content'>将原始网页链接快速生成短链接，美
                  化链接，减少链接所占字数，便于短
                  信营销、分渠道传播。</p>
              </div>
            </div>
            <div className='display-item'>
              <img src={require('assets/img/2.png')} alt='永久有效' />
              <div className='item-right'>
                <h4 className='item-right_title'>永久有效</h4>
                <p className='item-right_content'>无需担心过期失效，生成的短链接永
                  久有效。</p>
              </div>
            </div>
            <div className='display-item'>
              <img src={require('assets/img/3.png')} alt='随时修改' />
              <div className='item-right'>
                <h4 className='item-right_title'>随时修改</h4>
                <p className='item-right_content'>短链接跳转的原始链接随时可修改，
                  投放工作不再受到约束。</p>
              </div>
            </div>
            <div className='display-item'>
              <img src={require('assets/img/4.png')} alt='随机跳转' />
              <div className='item-right'>
                <h4 className='item-right_title'>随机跳转</h4>
                <p className='item-right_content'>多个原始链接转为一条短链，访问者随
                  机跳转不同的网址，随机、记忆两种跳
                  转模式让AB测试、广告投放更容易。</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1>更多特色</h1>
          <div className='flex-center'>
            <ol>
              <li>支持账户查询历史所有短链。</li>
              <li>支持<b>月限额定数量</b>及<b>无限期额定数量</b>计费方式</li>
              <li>支持<b>加密短链</b>，提高安全性。</li>
              <li><b>自定义短链后缀</b>，更具个性化。</li>
            </ol>
          </div>
        </div>
      </div>
    </HomeWrapper>
  )
})

export default Home