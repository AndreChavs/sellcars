import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'


interface Props {
  children: ReactNode
}

const Layout = ({children}: Props) => {
  const router = useRouter()  
  if (router.asPath === '/login' || router.asPath === '/register') {
    return <main>      
      {children}
    </main>
  }

  if(router.asPath.includes('admin')){
    return (
      <>
        <main style={{display:'flex'}}>        
          {children}
        </main>
      </>
    )    
  }

  return (
    <>
      <Header />
      <main>        
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout