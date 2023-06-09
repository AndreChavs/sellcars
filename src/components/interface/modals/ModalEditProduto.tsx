import convertImageToBase64 from '@/functions/conversorBase64';
import Container from '@/layout/Container';
import Image from 'next/image';
import React from 'react'
import styles from '../../../styles/modules/Modal.module.css'
import stylesForm from '../../../styles/modules/Form.module.css'
import ProdutoRequest from '@/functions/requests/produto/produtoRequest';
import { useCar } from '@/global/store';

interface ModalProps{
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  editData: DataGridCar;
}

const requestProduto = new ProdutoRequest(`/api/produtos`)

const ModalEditProduto = ({setModal, editData}: ModalProps) => {  
  const [imagem, setImagem] = React.useState<{base64:string, fileData:FileData}>();
  const [modelo, setModelo] = React.useState<string>(editData.modelo)
  const [categoria, setCategoria] = React.useState<string>(editData.categoria)
  const [marca, setMarca] = React.useState<string>(editData.marca)
  const [ano, setAno] = React.useState<string>(editData.ano)
  
  const setDataCar = useCar((state) => state.setDataCar)

  const handleImage1Change = async ({target}:React.ChangeEvent) => {   
    if (target instanceof HTMLInputElement) {
      const files = target.files
      if (files) {
        const image = files[0]
        const base64Image = await convertImageToBase64(image)
        if (typeof base64Image === 'string') {              
          setImagem({base64: base64Image, fileData:{
            name:image.name,            
            type:image.type,            
          }})
        }
      }
    } 
  };

  function handleModelo({target}:React.ChangeEvent<HTMLInputElement>) {
    setModelo(target.value)
  }
  function handleMarca({target}:React.ChangeEvent<HTMLInputElement>) {
    setMarca(target.value)
  }
  function handleAno({target}:React.ChangeEvent<HTMLInputElement>) {
    setAno(target.value)
  }
  function handleSelect({target}:React.ChangeEvent<HTMLSelectElement>) {
    setCategoria(target.value)
  }
  function handleClose() {
    setModal((modal) => !modal);
  }

  async function handleSubmit(event:React.FormEvent) {
    event.preventDefault()
    if(imagem && categoria && marca && modelo && ano){
      const formData:DataGridCar = {
        id: editData.id as string,
        image: imagem,
        categoria: categoria,
        marca: marca,
        modelo: modelo,
        ano: ano
      }
      
      await requestProduto.updateRequest(formData, setDataCar)
      handleClose()
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={handleClose}>&times;</span>
        <Container>
          <form onSubmit={handleSubmit}>
            <div className={styles.form__divImg}>
              <label htmlFor="image" className={stylesForm.form__fileLabel}>Imagem</label>
              <input type="file" id="image1" onChange={handleImage1Change} className={styles.form__fileInput} />
              {imagem && typeof imagem !== 'string' && <Image src={imagem.base64} alt="Imagem 1" width={30} height={30} />}
            </div>
            <br />
            <div>
              <label htmlFor="categoria" className={styles.form__label}>Categoria</label>
              <select value={categoria} onChange={handleSelect}>
                <option value="sedan">Sedan</option>
                <option value="hatch">Hatch</option>
                <option value="suv">SUV</option>
                <option value="pick-up">Pickup</option>
                <option value="minivan">Minivan</option>
                <option value="esportivo">Esportivo</option>
              </select>
            </div>
            <br />
            <div>
              <label htmlFor="modelo" className={styles.form__label}>Modelo</label>
              <input type="text" id="modelo" value={modelo} onChange={handleModelo} />
            </div>
            <br />
            <div>
              <label htmlFor="marca" className={styles.form__label}>Marca</label>
              <input type="text" id="marca" value={marca} onChange={handleMarca} />
            </div>
            <br />
            <div>
              <label htmlFor="ano" className={styles.form__label}>Ano</label>
              <input type="number" id="ano" value={ano} onChange={handleAno} />
            </div>
            <br />
            <input type={"submit"} value={"Atualizar"} /> 
          </form>
        </Container>
      </div>
    </div>
  )
}

export default ModalEditProduto