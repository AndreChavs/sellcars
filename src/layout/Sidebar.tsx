import React from 'react'
import Link from 'next/link'
import styles from '../styles/modules/Sidebar.module.css'
import { signOut } from 'next-auth/react'
import {useSidebar} from '../global/store'

const itensList = [
  { 
    iconTag: <i className="fa-solid fa-house"></i>, 
    text: 'Interface', 
    href:'/admin' 
  },  
  { 
    iconTag: <i className="fa-solid fa-box"></i>, 
    text: 'Produtos',
    href:'/admin/produtos' 
  },
  
  

]

interface ActiveProps {
  active?: boolean;
  setActive?:() => void;
  user?: {
    name?:string | null;
    email?:string | null;
    image?:string | null;
  };  
}
interface NavlistProps {
  itens: {
    iconTag: JSX.Element;
    text:string;
    href:string;
  }[]
}

const Logo = ({ active, user }:ActiveProps) => {
  return (
    <div className={styles.logo} style={{ display: active ? 'none' : 'block' }}>      
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  )
}

const Hamburger = ({setActive ,active }:ActiveProps) => {

  function handleClick() {
    if (setActive) {      
      setActive()
    }
  }

  return (
    <div className={styles.hamburger} onClick={handleClick}>
      {active ? (
        <i className="fa-solid fa-bars"></i>
      ) : (
        <i className="fa-solid fa-bars"></i>
      )}
    </div>
  )
}

const NavList = ({itens}:NavlistProps) => {
  return (
    <ul className={styles.navList}>
      {itens.map((item, index) => {        
        return (
        <Link href={item.href} key={index} legacyBehavior>
          <li>
              <a>
                {item.iconTag}
                <span>{item.text}</span>
              </a>
          </li>
        </Link>
        )
      })}
    </ul>
  )
}

const Logout = () => {
  return (
    <div className={styles.logout}>
      <Link href="/" legacyBehavior>
        <a onClick={() => signOut()}>
          <i className="bx bx-log-out"></i>
          <span>logout</span>
        </a>
      </Link>
    </div>
  )
}



const Sidebar = ({user}:ActiveProps) => {
  // const [active, setActive] = React.useState<boolean>(false)
  const active = useSidebar((state) => state.active)
  const setActive = useSidebar((state) => state.setActive)

  return (
    <div
      className={styles.sidebar}
      style={{ width: active ? '50px' : '230px' }}
    >
      <div
        className={styles.headerSidebar}
        style={{ justifyContent: active ? 'center' : 'space-between' }}
      >
        <Logo active={active} user={user}/>
        <Hamburger setActive={setActive} active={active} />
      </div>
      <NavList itens={itensList} />
      <Logout />
    </div>
  )
}

export default Sidebar
