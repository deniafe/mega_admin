import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from "next/head";
import '../styles/globals.css'
// import { AppStateProvider } from '../contexts/AppStateContext'



export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <>
    {/* // <AppStateProvider> */}
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    {/* // </AppStateProvider> */}
    </>

  )
}
