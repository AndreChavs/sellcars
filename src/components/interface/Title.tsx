import styles from '../../styles/modules/Title.module.css'

interface TitleProps {
  text: string;
}


export const Title = ({ text }: TitleProps) => {
  return (
    <h1 className={styles.title} >
      {text}
    </h1>
  )
}
