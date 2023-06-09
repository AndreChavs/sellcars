import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from 'next/router'


export const getStaticPaths: GetStaticPaths = async () => {
  const url = (process.env.NEXT_API_URL)? process.env.NEXT_API_URL : window.location.origin; 
  const response = await fetch(`${url}/api/produtos`);
  if(!response.ok) throw new Error('Error request')
  const carros:DataGridCar[] = await response.json();  
  const paths = carros.map( carro => {    
    return {
      params: {
        id: carro.id
      }
    }
  });
  return { paths, fallback:true}
}

export const getStaticProps: GetStaticProps<{carro:DataGridCar}> = async ({params}) => {
  // espelhamento - api/[id].js
  // console.log(context)
  const id = params?.id
  function verifyID(id:string | string[] | undefined):string {
    return (id && typeof id === 'string')? id : ''  
  }  
  const url = (process.env.NEXT_API_URL)? process.env.NEXT_API_URL : window.location.origin  
  const response = await fetch(`${url}/api/categoria/${verifyID(id)}`) 
  const carro:DataGridCar = await response.json() 
  return {
    props:{carro}
  }   
}

export default function Carro(props:InferGetStaticPropsType<typeof getStaticProps>) {
  
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  function render() {
    if (props.carro) { 
      return (
      <div>
        <div>
          <Image src={props.carro.image as string} alt={'wdaywhdawd'} width={380} height={300}/>
        </div>
        <h1 style={{color:'red'}}>{props.carro.marca} {props.carro.modelo}</h1>
        <h2>categoria: {props.carro.categoria}</h2>
        <h2>Marca: {props.carro.marca}</h2>
        <span>ID: {props.carro.id}</span>
      </div>)
    }
  }

  return <div style={{margin:"200px"}}>
    {render()}
    <div style={{margin:"20px", color:"blue"}}>
      <Link href='/' legacyBehavior><a>Voltar</a></Link>
    </div>
  </div>
}