interface ContentProps{
  children: JSX.Element;
}

const Content = ({children}:ContentProps) => {
  return (
    <div style={{height:'100vh', width:'calc(100% - 230px)', overflow:'auto'}}>
      {children}
    </div>
  )
}

export default Content