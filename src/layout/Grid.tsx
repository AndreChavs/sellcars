import { CSSProperties, ReactNode } from 'react'
import styles from '../styles/modules/Grid.module.css'

interface GridProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: [key: string] | string ;
}

const Grid01 = ( {children, style, className}: GridProps) => {
  const componentStyles = [styles.grid01, className]
  return (
    <div className={componentStyles.join(' ')} style={style}>
      {children}
    </div>
  )
}

const Grid02 = ({ children, style, className }: GridProps) => {
  const componentStyles = [styles.grid02, className]
  return (
    <div className={componentStyles.join(' ')} style={style}>
      {children}
    </div>
  )
}

const Grid03 = ({ children, style, className }: GridProps) => {
  const componentStyles = [styles.grid03, className]
  return (
    <div className={componentStyles.join(' ')} style={style}>
      {children}
    </div>
  )
}

const Grid04 = ({ children, style, className }: GridProps) => {
  const componentStyles = [styles.grid04, className]
  return (
    <div className={componentStyles.join(' ')} style={style}>
      {children}
    </div>
  )
}

const Grid05 = ({ children, style, className }: GridProps) => {
  const componentStyles = [styles.grid05, className]
  return (
    <div className={componentStyles.join(' ')} style={style}>
      {children}
    </div>
  )
}

const Grid06 = ({ children, style, className }: GridProps) => {
  const componentStyles = [styles.grid06, className]
  return (
    <div className={componentStyles.join(' ')} style={style}>
      {children}
    </div>
  )
}

const Grid07 = ({ children, style, className }: GridProps) => {
  const componentStyles = [styles.grid07, className]
  return (
    <div className={componentStyles.join(' ')} style={style}>
      {children}
    </div>
  )
}

const Grid08 = ({ children, style, className }: GridProps) => {
  const componentStyles = [styles.grid08, className]
  return (
    <div className={componentStyles.join(' ')} style={style}>
      {children}
    </div>
  )
}

const Grid09 = ({ children, style, className }: GridProps) => {
  const componentStyles = [styles.grid09, className]
  return (
    <div className={componentStyles.join(' ')} style={style}>
      {children}
    </div>
  )
}

const Grid10 = ({ children, style, className }: GridProps) => {
  const componentStyles = [styles.grid10, className]
  return (
    <div className={componentStyles.join(' ')} style={style}>
      {children}
    </div>
  )
}

const Grid11 = ({ children, style, className }: GridProps) => {
  const componentStyles = [styles.grid11, className]
  return (
    <div className={componentStyles.join(' ')} style={style}>
      {children}
    </div>
  )
}

const Grid12 = ({ children, style, className }: GridProps) => {
  const componentStyles = [styles.grid12, className]
  return (
    <div className={componentStyles.join(' ')} style={style}>
      {children}
    </div>
  )
}

export {
  Grid01,
  Grid02,
  Grid03,
  Grid04,
  Grid05,
  Grid06,
  Grid07,
  Grid08,
  Grid09,
  Grid10,
  Grid11,
  Grid12
}
