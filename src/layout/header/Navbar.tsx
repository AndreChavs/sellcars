import Link from "next/link";
import { useRouter } from "next/router";
import React from "react"
import styles from '../../styles/modules/Navbar.module.css'

interface PropsMobile {
  mobile: boolean;
  setMobile: any;
}

export const Navbar = () => {
  const [mobile, setMobile] = React.useState(false)
  return (
    <nav className={styles.navbar}>
      <Logo />
      <MobileMenu mobile={mobile} setMobile={setMobile}/>
      <NavList mobile={mobile} setMobile={setMobile}/>
      <User />
    </nav>
  )
}

export const Logo = () => {
  return (
    <div className={styles.logo}>
      LOGO
    </div>
  )
}

const MobileMenu = ({mobile, setMobile}: PropsMobile) => {
  function handleClick() {
    setMobile(!mobile)
  }
  return (
    <div onClick={handleClick} className={styles.mobileMenu}>
      {mobile ? (
        <i className="fas fa-times close"></i>
      ) : (
        <i className="fas fa-bars open"></i>
      )}
    </div>
  )
}

const NavList = ({mobile, setMobile}: PropsMobile) => {
  const [classModule, setClassModule] = React.useState(styles.navlist)
  const router = useRouter()
  React.useEffect(() => {
    if (mobile){
      setClassModule(styles.navlistActive)
    } else {
      setClassModule(styles.navlist)
    }
  },[mobile])
  const links:{nome:string, rota:string}[] = [
    { nome: 'home', rota: '/' },
    { nome: 'sobre nós', rota: '/about' },
    { nome: 'serviços', rota: '/services' },
  ]
  return (
    <ul className={classModule}>
      {links.map( (link, index) => {
        return (
          <Link href={link.rota} key={index} legacyBehavior>
            <li className={
              (router.asPath !== link.rota)?
               styles.itemlist : styles.itemlistActive
              }
              onClick={() => setMobile(false)}>
              <a>{link.nome}</a>
            </li>
          </Link>
        )
      })}
    </ul>
  )
}

const User = () => {
  return (
    <div className={styles.user}>
      <Link href='/login' legacyBehavior>
        <a>
          <i className="fa-solid fa-user"></i>
        </a>
      </Link>
    </div>
  )
}