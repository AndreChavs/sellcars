import Container from '@/layout/Container';
import React from 'react'
import styles from '../../../styles/modules/Modal.module.css'
import AddSlideForm from '../../form/AddSlideForm';

interface ModalProps{
  setModal:React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({setModal}: ModalProps) => {

  function handleClose() {
    setModal((modal) => !modal)
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={handleClose}>&times;</span>
        <Container>
          <AddSlideForm setModal={setModal}/>
        </Container>
      </div>
    </div>
  )
}

export default Modal