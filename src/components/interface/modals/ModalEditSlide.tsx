import React from 'react'
import Container from '@/layout/Container'
import styles from '../../../styles/modules/Modal.module.css'
import EditSlideForm from '@/components/form/EditSlideForm';

interface ModalProps{
  setModal:React.Dispatch<React.SetStateAction<boolean>>;
  editData:DataGridState;  
}

const ModalEditSlide = ({setModal, editData }:ModalProps) => {

  function handleClose() {
    setModal((modal) => !modal)
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={handleClose}>&times;</span>
        <Container>
          <EditSlideForm editData={editData} setModal={setModal}/>
        </Container>
      </div>
    </div>
  )
}

export default ModalEditSlide