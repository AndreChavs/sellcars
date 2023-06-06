import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const {id} = req.query
  if (typeof id !== 'string') throw new Error('ID type is not String')
  const result = await prisma.carros.findUnique({
    where:{id}
  })
  if (!result) throw new Error("Error to findUnique data fetching")
  // const produto = produtos.filter( item => item.id === Number(id))
  // console.log(produto) // espelhamento - getStaticProps
  if (req.method === 'GET') {
    res.status(200).json(result)
  }
}