import { CSSProperties } from "react"
import Container from "../Container"
import { Navbar } from "./Navbar"

const Header = () => {
  const styles: CSSProperties = {
    width: '100%',
    position: 'fixed',
    top: '0px',
    background: '#000',
    zIndex: '99',    
  }
  return <header style={styles}>
    <Container>
      <Navbar />
    </Container>
  </header>

}

export default Header