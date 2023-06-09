import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from 'next/router'


export const getStaticPaths: GetStaticPaths = async () => {
  const url = (process.env.NEXT_API_URL)? process.env.NEXT_API_URL : window.location.origin; 
  const response = await fetch(`${url}/api/produtos`);
  const carros:DataGridCar[] = await response.json();  
  const paths = carros.map( carro => {
    if(carro?.id){
      return {
        params: {
          id: carro.id
        }
      }   
    }else{
      return { params: {} }
    }
  });
  return { paths, fallback:true}
}

export const getStaticProps: GetStaticProps<{carro:DataGridCar}> = async (context) => {
  // espelhamento - api/[id].js
  // console.log(context)
  const id = context.params?.id
  function verifyID(id:string | string[] | undefined):string {
    return (id && typeof id === 'string')? id : ''  
  }  
  const url = (process.env.NEXT_API_URL)? process.env.NEXT_API_URL : window.location.origin  
  const response = await fetch(`${url}/api/categoria/${verifyID(id)}`) 
  const carro:DataGridCar = await response.json() 
  return {
    props:{carro}, revalidate: 1,
  }   
}

export default function Carro(props:InferGetStaticPropsType<typeof getStaticProps>) {
  const [car, setCar] = React.useState(props.carro)
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  function render() {
    if (car) { 
      return (
      <div>
        <div>
          <Image src={car.image as string} alt={'wdaywhdawd'} width={380} height={300}/>
        </div>
        <h1 style={{color:'red'}}>{car.marca} {car.modelo}</h1>
        <h2>categoria: {car.categoria}</h2>
        <h2>Marca: {car.marca}</h2>
        <span>ID: {car.id}</span>
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