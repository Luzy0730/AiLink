import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { LayoutWrapper } from './style'
import Header from './c-cpns/header'
import Footer from './c-cpns/footer'

const Layout = memo(() => {
  return (
    <LayoutWrapper>
      <Header />
      <Outlet />
      <Footer />
    </LayoutWrapper>
  )
})

export default Layout