import { Grid06 } from "@/layout/Grid"
import Image from "next/image"
import styles from '../../../styles/modules/CardService.module.css'

interface CardServiceProps{
  src: string;
  alt:string;
  title: string;
  text:string;
}

const CardService = ({alt, src, text, title}:CardServiceProps) => {
  return (
    <Grid06 className={styles.card}>
      <div className={styles.img}>
        <Image src={src} width={580} height={390} alt={alt} />
      </div>
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
        <div className={styles.btn}>
          <a>Mais Informações</a>
        </div>
      </div>
    </Grid06>
  )
}

export default CardService