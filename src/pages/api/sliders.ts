import {getSlides, postSlide, updateSlide, deleteSlide} from '../../functions/controllers/slide/slideController'

import {NextApiRequest, NextApiResponse} from 'next'
export default async function handler(req:NextApiRequest, res:NextApiResponse) { 

  switch (req.method) {
    case 'GET':
      getSlides(req, res)
      break;
    case 'POST':
      postSlide(req, res)
      break;
    case 'PUT':
      updateSlide(req, res)
      break;
    case 'DELETE':
      deleteSlide(req, res)
      break;
    default:
      res.status(405).json({error:"Requisição invalida"})
      break;
  }
}

