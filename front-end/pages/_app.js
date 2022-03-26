import React from 'react'
import Head from 'next/head'
import { providers } from 'ethers'
import ResponsiveAppBar from './navbar'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>PrETHnup</title>
      </Head>
      <ResponsiveAppBar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
