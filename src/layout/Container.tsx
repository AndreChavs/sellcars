import styles from '../styles/modules/Container.module.css'
import { CSSProperties, ReactElement, ReactNode } from "react"

interface Props {
  children?: any;
  className?: any;
  style?: CSSProperties;
}
const Container = ({children, className, style}:Props) => {
  const { container } = styles
  const componentStyles = [container, className]
  // console.log(componentStyles)
  return (
    <div className={componentStyles.join(' ')} style={style}>
      {children}
    </div>
  )
}

export default Container