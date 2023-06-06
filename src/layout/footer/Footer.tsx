import Container from "../Container"
import styles from '../../styles/modules/Footer.module.css'
import { Grid06 } from "../Grid"
import { Logo } from "../header/Navbar"
import Link from "next/link"

const Footer = () => {
  const links: {nome:string, rota:string}[] = [
    { nome: 'home', rota: '/' },
    { nome: 'sobre nós', rota: '/about' },
    { nome: 'serviços', rota: '/services' },
  ]

  return (
    <footer>
      <div className={styles.info}>
        <Container className='wrap'>
          <Grid06 className={styles.content}>
            <Logo />
            <ul className={styles.links}>
              {links.map( (link, index) => {
                return (
                  <li key={index}>
                    <Link href={link.rota} legacyBehavior>
                      <a>{link.nome}</a>
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className={styles.describe}>
              <h3>Horário de funcionamento</h3>
              <p>
                De Segunda a Sexta-feira: das 9:00 da manha até as 18:30 da
                noite
              </p>
              <p>Aos Sábados: 10:00 até as 14:30</p>
            </div>
          </Grid06>
          
          <Grid06 className={styles.content}>
            <div className={styles.describe}>
            <h3>Nossas Redes Sociais</h3>
              <ul className={styles.social}>
                <li>
                  <i className="fa-brands fa-facebook"></i>
                </li>
                <li>
                  <i className="fa-brands fa-instagram"></i>
                </li>
                <li>
                  <i className="fa-brands fa-whatsapp"></i>
                </li>
              </ul>
            </div>
            <div className={styles.describe}>
              <h3>Estamos no endereço</h3>
              <ul className={styles.contato}>
                <li>
                  <address>Rua Floriano Peixoto, nº561, centro - Santarém</address>
                </li>
                <li>Telefone: (93) 98439-4640</li>
              </ul>
            </div>
          </Grid06>
        </Container>
        <div className={styles.cnpj}>
          <span>CNPJ: 99.99999/0001-99</span>
        </div>
      </div>
      <div className={styles.footer}>
        Copyright © 2022. Todos os direitos reservados - Desenvolvido
        por <Link href="/">André Chaves</Link>
      </div>
    </footer>
  )
}
export default Footer