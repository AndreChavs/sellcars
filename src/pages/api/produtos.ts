import Controller from '@/functions/controllers/produto/ProdutoController';
import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  const controller = new Controller()

  switch (req.method) {
    case 'GET':
      controller.GetData(req, res)
      break;
    case 'POST':
      controller.PostData(req, res)      
      break;
    case 'PUT':
      controller.UpdateData(req, res)      
      break;
    case 'DELETE':
      controller.DeleteData(req, res)     
      break;
    default:
      res.status(405).json({error:"Requisição invalida"})
      break;
  } 
}