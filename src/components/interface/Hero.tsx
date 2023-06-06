import styles from '../../styles/modules/Hero.module.css'
import Image from 'next/image'

interface HeroProps{
  src: string;
  alt: string;
  title: string;
}

const Hero = ({src, alt, title}: HeroProps) => {
  return (
    <div className={styles.hero}>
      <Image src={src} alt={alt} width="1460" height="380" />
      <h1 className={styles.title}>{title}</h1>
    </div>
  )
}

export default Hero