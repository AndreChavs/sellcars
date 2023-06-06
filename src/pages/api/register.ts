import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";


import prisma from '@/libs/prismadb';

interface DataBody {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
}

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if(req.method === 'POST'){
    try {
      const {email, firstname, lastname, password}:DataBody = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prisma.user.create({
        data:{
          email: email,
          name:`${firstname} ${lastname}`,
          hashedPassword: hashedPassword
        }
      })
      if(user){
        return res.status(200).json({message: 'Cadastro realizado com sucesso!'})        
      } else {
        return res.status(403).json({ error : "Falha ao armazenar dados"})
      }
    } catch (error) {
      console.error(error)
      return res.status(400).end();
    }
  } else {
    res.status(405).json({ message: 'HTTP method not valid !' })
  }
}