import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { FireStorage } from "@/functions/FireStorage";

const prisma = new PrismaClient();
const slideStorage = new FireStorage('slides');

export async function getSlides(req:NextApiRequest, res:NextApiResponse) {
  try {
    const result = await prisma.sliders.findMany();
    if (result) {
      return res.status(200).json(result)
    }
  } catch (error) {
    return res.status(404).json({error:`Erro ao buscar dados: ${error}`})
  }
}

export async function postSlide(req:NextApiRequest, res:NextApiResponse) {
  try {
    const {       
      image, 
      imageMobile, 
      button, 
      textButton, 
      paragraph
    }:DataGridState = req.body;

    if(typeof image !== 'string' && typeof imageMobile !== 'string'){

      const urlImage = await slideStorage.UploadFile(image.base64, image.fileData);
      const urlImageMobile = await slideStorage.UploadFile(imageMobile.base64, imageMobile.fileData);
      
      const result = await prisma.sliders.create({
        data:{                
          image: urlImage,
          imageMobile: urlImageMobile,
          button,
          textButton,
          paragraph
        }
      });      
      if (result) {
        return res.status(200).json({message: 'Dados enviados com sucesso'})      
      }
    }
  } catch (error) {
    return res.status(404).json({error:`Erro ao Enviar dados: ${error}`})
  }
}

export async function updateSlide(req:NextApiRequest, res:NextApiResponse) {
  try {
    const {
      id,            
      image,
      imageMobile,
      button,
      textButton,
      paragraph
    }:DataGridState = req.body;
    const recuperacao = await prisma.sliders.findUnique({
      where:{id}
    })
    if(recuperacao?.image && typeof recuperacao.image === 'string' && recuperacao.imageMobile && typeof recuperacao.imageMobile === 'string' && typeof image !== 'string' && typeof imageMobile !== 'string'){

      const urlImage = await slideStorage.UpdateFile(recuperacao?.image, image.fileData, image.base64)
      const urlImageMobile = await slideStorage.UpdateFile(recuperacao?.imageMobile, imageMobile.fileData, imageMobile.base64)

      const result = await prisma.sliders.update({
        where:{
          id: id,
        },
        data:{        
          image: urlImage,
          imageMobile: urlImageMobile,
          button: button,
          textButton: textButton,
          paragraph: paragraph
        }
      })
      if (result) {
        return res.status(200).json({message: "Dados alterados com sucesso"})      
      }
    }
  } catch (error) {
    return res.status(404).json({error:`Erro ao atualizar dados: ${error}`})
  }
}

export async function deleteSlide(req:NextApiRequest, res:NextApiResponse) {
  try {
    const {id} = req.body
    const result = await prisma.sliders.delete({
      where: {
        id
      }
    })    
    await slideStorage.DeleteFile(result.image)
    await slideStorage.DeleteFile(result.imageMobile)
    if(result){
      return res.status(200).json({message: "Arquivo deletado com sucesso"})
    }
  } catch (error) {
    return res.status(404).json({error:`Erro ao deletar dados: ${error}`})
  }
}