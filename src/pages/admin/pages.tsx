import { NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Sidebar from '@/layout/Sidebar'
import Content from '@/layout/Content'
import Container from '@/layout/Container'

export async function getServerSideProps(context: NextPageContext) {  
  const session = await getSession(context)    
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  return {
    props: { session }
  }
}

export default function Pages() {
  const { data }  = useSession()
  if(data){    
    return (
      <>
        <Sidebar user={data.user} />
        <Content>
          <Container className="just-center">
            <h1>Principal</h1>
          </Container>
        </Content>
        
      </>
    )
  } else {
    return null
  }
  
}