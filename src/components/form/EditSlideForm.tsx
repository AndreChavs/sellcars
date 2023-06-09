import React from 'react'
import styles from '../../styles/modules/Form.module.css'
import Image from 'next/image'
import convertImageToBase64 from '@/functions/conversorBase64'
import { useStore } from '@/global/store';
import SlideRequests from '@/functions/requests/slide/slideRequests';


const requestSlide = new SlideRequests('/api/sliders')

interface EditSlideFormProps {
  setModal:React.Dispatch<React.SetStateAction<boolean>>;
  editData:DataGridState;  
}

const EditSlideForm = ({editData, setModal}:EditSlideFormProps) => {
  
  const setDataSlide = useStore((state) => state.setDataSlide)

  const [image1, setImage1] = React.useState<{base64: string, fileData:FileData}>();
  const [image2, setImage2] = React.useState<{base64: string, fileData:FileData}>();
  const [checkbox, setCheckbox] = React.useState<boolean>(editData.button);
  const [btnText, setBtnText] = React.useState<string>(editData.textButton);
  const [text, setText] = React.useState<string>(editData.paragraph);
  const [isLoading, setIsLoading] = React.useState(false);


  const handleImage1Change = async ({target}:React.ChangeEvent) => {   
      if (target instanceof HTMLInputElement) {
        const files = target.files
        if (files) {
          const image = files[0]
          const base64Image = await convertImageToBase64(image)
          if (typeof base64Image === 'string') {              
            setImage1({base64: base64Image, fileData:{
              name:image.name,              
              type:image.type,            
            }})   
          }
        }      
      } 
  };

  const handleImage2Change = async ({target}:React.ChangeEvent) => {
    if (target instanceof HTMLInputElement) {
      const files = target.files
      if (files) {
        const image = files[0]
        const base64Image = await convertImageToBase64(image)
        if (typeof base64Image === 'string') {               
          setImage2({base64: base64Image, fileData:{
            name:image.name,            
            type:image.type,            
          }})
        }
      }      
    }
  };
  const handleCheckboxChange = ({target}:React.ChangeEvent) => {
    if (target instanceof HTMLInputElement) {           
      setCheckbox(target.checked);
    }    
  };

  const handleBtnTextChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setBtnText(event.target.value);
  };

  const handleTextChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event:React.FormEvent) => {
    event.preventDefault();
    if (image1 && image2) {
      setIsLoading(true)
      const formData:DataGridState = {
        id: editData.id,      
        image:image1,
        imageMobile:image2,
        button:checkbox,
        textButton:btnText,
        paragraph: text
      }
      await requestSlide.updateRequest(formData, setDataSlide)
      setIsLoading(false)
      setModal((modal) => !modal)    
      
    } else {      
      alert("O campo das imagens não podem estar vazios")
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.form__divImg}>
        <label htmlFor="image1" className={styles.form__fileLabel}>Imagem 1:</label>
        <input type="file" id="image1" onChange={handleImage1Change} className={styles.form__fileInput} />
        {image1 && <Image src={image1.base64} alt="Imagem 1" width={30} height={30} />}
      </div>
      <hr />
      <div className={styles.form__divImg}>
        <label htmlFor="image2" className={styles.form__fileLabel}>Imagem 2:</label>
        <input type="file" id="image2" onChange={handleImage2Change} className={styles.form__fileInput} />
        {image2 && <Image src={image2.base64} alt="Imagem 2" width={30} height={30}/>}
      </div>
      <hr />
      <div>
        <label htmlFor="checkbox" className={styles.form__label}>Tem botão ?</label>
        <input type="checkbox" id="checkbox" checked={checkbox} onChange={handleCheckboxChange} className={styles.form__checkbox}/>
      </div>
      {checkbox ? <div>
        <label htmlFor="btntext" className={styles.form__label}>Texto do Botão</label>
        <input type="text" id="btntext" value={btnText} onChange={handleBtnTextChange} />
      </div> : null}
      <div>
        <label htmlFor="text" className={styles.form__label}>Texto do Slide</label>
        <input type="text" id="text" value={text} onChange={handleTextChange} />
      </div>

      {isLoading ? <button className={isLoading ? styles.loading : styles.form__submit} type="submit" disabled>
        {isLoading ? 'Carregando...' : 'Enviar'}
      </button> : <button className={isLoading ? styles.loading : styles.form__submit} type="submit">
        {isLoading ? 'Carregando...' : 'Enviar'}
      </button>}      
    </form>
  )
}

export default EditSlideForm