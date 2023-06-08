import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";


// type ParamsProps = {
//   params:{
//     id:string;
//     categoria: string;
//   }
// }

export const getStaticPaths: GetStaticPaths = async () => {
  const url = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/produtos` //api all-data
  console.log(url)
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
export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id  
  const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/categoria/${id}`) 
  const carro:DataGridCar = await response.json() 
    // espelhamento - api/[id].js
  return {
    props:{carro}
  }
}

export default function Carro(props:InferGetStaticPropsType<typeof getStaticProps>) {
  
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