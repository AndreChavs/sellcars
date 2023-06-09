import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { FireStorage } from "@/functions/FireStorage";

const prisma = new PrismaClient()
const produtoStorage = new FireStorage('carros')

export default class Controller{
  constructor(){}

  public async GetData(req:NextApiRequest, res:NextApiResponse){
    try {
      const result = await prisma.carros.findMany();      
      if (result) {
        return res.status(200).json(result)                 
      } else {
        return res.status(404).json({error:"Erro na realização de busca de dados"})        
      }
    } catch (error) {
      return res.status(404).json({error:`Erro ao buscar Dados: ${error}`})
    }
  }
  
  public async PostData(req:NextApiRequest, res:NextApiResponse){
    try {
      const {
        image,
        categoria,
        ano,
        modelo,
        marca
      }:DataGridCar = req.body

      if(typeof image !== 'string'){
        if(image.base64 && image.fileData){
                    
          const urlImage = await produtoStorage.UploadFile(image.base64, image.fileData)
  
          const result = await prisma.carros.create({
            data:{
              image: urlImage,
              categoria,
              marca,
              modelo,
              ano
            }
          })
          if (result) {
            return res.status(200).json({message: 'Dados enviados com sucesso'})
          }
        } 
      }
    } catch (error) {
      return res.status(404).json({error:`Erro ao Enviar dados: ${error}`})
    }
  }

  public async UpdateData(req:NextApiRequest, res:NextApiResponse){
    try {
      const {
        id, 
        categoria,
        marca,
        modelo,
        image,
        ano
      }:DataGridCar = req.body

      const recuperacao = await prisma.carros.findUnique({
        where:{id}          
      })
      if(typeof image !== 'string' && image.base64 && image.fileData && recuperacao?.image && typeof recuperacao.image === 'string' ){

        const urlImage = await produtoStorage.UpdateFile(recuperacao.image, image.fileData, image.base64)  

        const result = await prisma.carros.update({
          where:{id},
          data:{
            image: urlImage, 
            categoria, 
            ano, 
            marca, 
            modelo
          }
        })
        if (result) {
          return res.status(200).json({message: "Dados Alterados com Sucesso !"})
        }
        
      }
      
    } catch (error) {
      return res.status(404).json({error:`Erro ao Enviar dados: ${error}`})
    }
  }

  public async DeleteData(req:NextApiRequest, res:NextApiResponse){
    try {
      const {id} = req.body
      const result = await prisma.carros.delete({
        where:{id}
      })      
      if (result) {
        await produtoStorage.DeleteFile(result.image)
        return res.status(200).json({message:"Arquivo deletado com sucesso"})
      }
    } catch (error) {
      return res.status(404).json({error:`Erro ao Enviar dados: ${error}`})
     }
  }

}