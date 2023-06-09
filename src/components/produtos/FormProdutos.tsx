/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import ProdutoRequest from '@/functions/requests/produto/produtoRequest';
import convertImageToBase64 from '@/functions/conversorBase64';

const requestProduto = new ProdutoRequest(`/api/produtos`)

export default function FormProdutos() {
  const [imagem, setImagem] = React.useState<{base64: string, fileData:FileData}>();
  const [categoria, setCategoria] = React.useState<string | null>(null);
  const [marca, setMarca] = React.useState<string | null>(null);
  const [modelo, setModelo] = React.useState<string | null>(null)
  const [ano, setAno] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);


  // Função para exibir a imagem selecionada
  async function exibirImagem({target}: React.ChangeEvent<HTMLInputElement>) {
    if (target instanceof HTMLInputElement) {
      if (target.files && target.files[0]) {        
        const files = target.files
        if (files) {
          const image = files[0]          
          const base64Imagem = await convertImageToBase64(image)
          if (typeof base64Imagem === 'string') {
            setImagem({base64:base64Imagem, fileData:{
              name:image.name,              
              type:image.type,            
            }})
          }
        }
      }
    }    
  }

  async function handleSubmit(event:React.FormEvent) {
    event.preventDefault()
    if (imagem && categoria && marca && modelo && ano) {
      setIsLoading(true);
      const formData:DataGridCarFormData = {        
        image: imagem,
        categoria: categoria,
        modelo: modelo,
        marca: marca,
        ano: ano
      }
      requestProduto.postRequest(formData).then( res => {
        alert(res)
      })
      setIsLoading(false)
    } else {
      alert('Preencha os campos corretamente')
    }
  }

  return (<>
     
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoria as string}
          label="Categoria"
          onChange={(event:SelectChangeEvent) => setCategoria(event.target.value)}
        >
          <MenuItem value={'sedan'}>Sedan</MenuItem>
          <MenuItem value={'hatch'}>Hatch</MenuItem>
          <MenuItem value={'suv'}>SUV</MenuItem>
          <MenuItem value={'pick-up'}>Pick-up</MenuItem>
          <MenuItem value={'minivan'}>Minivan</MenuItem>
          <MenuItem value={'esportivo'}>Esportivo</MenuItem>   
        </Select>
      </FormControl>
    </Box>
        

      <TextField id="marca" label="Marca" variant="outlined" onChange={({target}) => setMarca(target.value)}/>
      <TextField id="modelo" label="Modelo" variant="outlined" onChange={({target}) => setModelo(target.value)}/>
      <TextField id="ano" label="Ano" variant="outlined" type="number" onChange={({target}) => setAno(target.value)} />
      
      <label htmlFor="imagem" className="upload">
        Selecionar imagem
      </label>
      <input
        type="file"
        id="imagem"
        name="imagem"
        onChange={exibirImagem}        
      />
      

      <label htmlFor="exibicao">Exibição:</label>
      <br />
      {imagem && <img id="exibicao" src={imagem.base64 as string} alt="Imagem do carro" />}
      <br />

      {(isLoading)? <input type="submit" disabled value="Enviar" /> : <input type="submit" value="Enviar" />}      
    </Box>
  </>
  );
}