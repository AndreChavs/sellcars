import Image from 'next/image'
import { Grid06 } from '@/layout/Grid';
import styles from '../../../styles/modules/SquareCar.module.css'

interface CarProps {
  texto: string;
  src: string;
  width: any;
  height: any;
  alt: string;
}

const SquareCar = ({texto, src, width, height, alt}: CarProps) => {
  return (
    <Grid06 className={styles.card}>
      <div>
        <Image 
          src={src} 
          width={width}
          height={height} 
          alt={alt}
          style={{width: "100%", objectFit: "contain"}}
        />
      </div>
      <span>{texto}</span>
    </Grid06>
  )
}

export default SquareCar