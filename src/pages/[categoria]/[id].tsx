import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";

type ParamsProps = {
  params:{
    id:string;
    categoria: string;
  }
}

export async function getStaticPaths() {
  const url = 'http://localhost:3000/api/produtos' //api all-data
  const response = await fetch(url)
  const carros:DataGridCar[] = await response.json()
  //Deve buscar todos os dados do banco de dados e retornar apenas os valores que serão usados no espelhamento.
  const paths = carros.map( carro => {    
    return {
      params: { //retorna 2 parametro
        id: carro.id?.toString(), 
        categoria: carro.categoria 
    }}
  })  
  return { paths, fallback:false}
}
export async function getStaticProps({params}:ParamsProps) {
  const {id} = params  
  const response = await fetch(`http://localhost:3000/api/categoria/${id}`) 
  const carro:DataGridCar = await response.json() 
    // espelhamento - api/[id].js
  return {
    props:{carro}
  }
}

export default function Carro({carro}:InferGetStaticPropsType<typeof getStaticProps>) {
  
  function render() {
    if (carro) { 
      return (
      <div>
        <div>
          <Image src={carro.image as string} alt={'wdaywhdawd'} width={380} height={300}/>
        </div>
        <h1 style={{color:'red'}}>{carro.marca} {carro.modelo}</h1>
        <h2>categoria: {carro.categoria}</h2>
        <h2>Marca: {carro.marca}</h2>
        <span>ID: {carro.id}</span>
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