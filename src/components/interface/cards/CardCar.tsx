import { Grid03 } from "@/layout/Grid";
import Image from "next/image";
import Link from "next/link";
import styles from '../../../styles/modules/CardCar.module.css'

interface CardCarProps{
  src: string;
  alt: string;
  marca: string;
  modelo: string;
  ano?: string;
  href: string;
}

const CardCar = ({ano, marca, modelo, href, alt, src}:CardCarProps) => {
  return (
    <Grid03 className={styles.card}>
      <div>
        <Image src={src} width={380} height={300} alt={alt} />
      </div>
      <div className={styles.content}>
        <ul>
          <li>
            {marca} - {modelo}
          </li>
          {ano && <li>{ano}</li>}
        </ul>
        <div className={styles.link}>
          <Link href={href} legacyBehavior>
            <a >mais detalhes +</a>
          </Link>
        </div>
      </div>
    </Grid03>
  )
}

export default CardCar