import '@/styles/globals.css'
import '@/styles/index.css'
import '@/styles/about.css'
import '@/styles/services.css'
import '@/styles/catalog.css'
import type { AppProps } from 'next/app'
import Layout from '@/layout/Layout'


import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Layout>          
          <Component {...pageProps} />          
        </Layout>
      </SessionProvider>    
    </>
  )
  
}
