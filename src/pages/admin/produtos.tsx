import React from 'react'
import { InferGetStaticPropsType, NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Sidebar from '@/layout/Sidebar'
import Content from '@/layout/Content'
import BasicTabs from '@/components/produtos/BasicTabs'

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

export default function Produtos() {
  const { data }  = useSession()
  
  if(data){    
    return (
      <>
        <Sidebar user={data.user} />
        <Content>
          <BasicTabs />
        </Content>
        
      </>
    )
  } else {
    return null
  }
  
}