import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from 'next/router'
import StaticGenerate from "@/functions/requests/StaticGenerate";
import { ParsedUrlQuery } from "querystring";

const requestGenerate = new StaticGenerate('/api/produtos', '/api/categoria/')

export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async () => { 
  const carros = await requestGenerate.GetPaths<DataGridCar[] | null>()    
  const paths = carros?.map( carro => {
    console.log(carro)    
    return {
      params: { id: carro.id }
    }
  })
  if(!paths) throw new Error()
  return { paths: paths, fallback:'blocking' }   
}

export const getStaticProps: GetStaticProps<{carro:DataGridCar}> = async (context) => {  
  const carro = await requestGenerate.GetProps<DataGridCar>(context)
  if(!carro) throw new Error()   
  return {
    props:{carro: carro}
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