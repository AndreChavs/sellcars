import React from 'react'
import { NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Sidebar from '@/layout/Sidebar'
import Content from '@/layout/Content'
import Container from '@/layout/Container'
import DataGrid from '@/components/DataGrid'
import { Grid12 } from '@/layout/Grid'
import { useStore } from '@/global/store'
import {getSlides} from '../../functions/requests/slide/slideRequests'

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
      props: { 
        session         
      }
    } 
}


export default function Admin() {
  const { data }  = useSession()

  const dataSlide = useStore((state) => state.dataSlide)
  const setDataSlide = useStore((state) => state.setDataSlide)
  
  React.useEffect(() => {    
    if (dataSlide.length === 0) {
      getSlides(setDataSlide)     
    }
  },[])
  
  if(data){    
    return (
      <>
        <Sidebar user={data.user} />
        <Content>
          <Container className="wrap">
            <Grid12>
              <h1>Slider Configuration</h1>
            </Grid12>
            <Grid12>
              <DataGrid /> 
            </Grid12>
          </Container>    
        </Content>
        
      </>
    )
  } else {
    return null
  }
  
}

