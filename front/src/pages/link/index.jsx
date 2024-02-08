import React, { memo, useLayoutEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import NotFound from './c-cpns/notfound/index'
import Protected from './c-cpns/protected/index'
import { LinkWrapper } from './style'
import { analysisShort } from '@/apis/short.js'

const Link = memo(() => {
  const params = useParams()
  const location = useLocation()
  const [linkState, setLinkState] = useState(0)
  useLayoutEffect(() => {
    const { short } = params
    const pwd = (new URLSearchParams(location.search)).get('pwd')
    analysisShort({ short, pwd }).then(res => {
      window.location.replace(res.data)
    }).catch(error => {
      switch (error.data?.code) {
        case '10004':
          setLinkState(1);
          break;
        case '10001':
          setLinkState(2)
          break;
        default:
          break;
      }
    })
  }, [params, location.search])

  return (
    <LinkWrapper>
      {linkState === 1 ? <NotFound /> : linkState === 2 ? <Protected /> : ''}
    </LinkWrapper>
  )
})

export default Link