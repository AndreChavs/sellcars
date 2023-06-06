import React, { RefObject } from "react"
import styles from '../../styles/modules/Slider.module.css'

interface SliderProps{
  slides: DataGridState[]
  time?: boolean | number;
}

const Slider = ({slides, time = false}: SliderProps) => {
  const [active, setActive] = React.useState<number>(0)
  const [position, setPosition] = React.useState<number>(0)
  const [width, setWidth] = React.useState<number | undefined>(0)
  const contentRef = React.useRef<HTMLDivElement | null>(null)
  const timeRef = React.useRef<HTMLElement | NodeJS.Timeout | null>(null);
  
  const select = { width: '30px', height: '8px', backgroundColor: '#0d328f' }
  const unSelect = { width: '30px', height: '8px' }

  React.useEffect(() => {             
    setWidth(() => contentRef?.current?.getBoundingClientRect().width)  
    if (width) {      
      setPosition(-(width * active))
    }
  },[active, width])

  React.useEffect(() => {
    if (time !== false) {
      if (typeof time === 'number') {
        timeRef.current = setTimeout( () => {
          if (active < slides.length) {
            setActive(active + 1)
          }
        }, time)
        if (active === slides.length) {
          setActive(0)
          return clearTimeout(timeRef.current)
        }        
      } else {
        alert('Error slide')
      }
    }
  }, [time, active, slides])

  function handleControl(index:number) {
    setActive(index)
    if (time !== false) {             
      clearTimeout(timeRef.current as NodeJS.Timeout)        
    }
  }

  function prev() {
    if(active > 0){
      setActive(active - 1)
    }
    if(time !== false){              
      clearTimeout(timeRef.current as NodeJS.Timeout)
    }
  }

  function next() {
    if (active < slides.length - 1) {
      setActive(active + 1)
    }
    if (time !== false) {            
      clearTimeout(timeRef.current as NodeJS.Timeout)      
    }
  }


  return (
    <section className={styles.container} ref={timeRef as RefObject<HTMLElement>}>
      <div 
        className={styles.content} 
        ref={contentRef} 
        style={{transform: `translateX(${position}px)`}}
      >
        {slides.map( (slide, index) => {
          return (
            <div 
              key={index} 
              className={styles.slide} 
              style={                
                width && (width <= 480) ?  { backgroundImage: `url(${slide.imageMobile})` } : { backgroundImage: `url(${slide.image})` }
              }
              >
                <div className={styles.slideInfo}>
                <h1>{slide.paragraph}</h1>
                {slide.button && <div>
                  <a href="#">{slide.textButton}</a>
                </div>}
              </div>
            </div>
          )
        })}
      </div>
      <nav className={styles.controlls}>
        {slides.map( (slide, index) => {          
          return (
            <span key={index}
              style={ (active === index) ? select : unSelect }
              onClick={() => handleControl(index)}
            ></span>
          )
        })}
      </nav>
      <div className={styles.setas}>
        <span onClick={prev}>
          <i className="fa-solid fa-angle-left"></i>
        </span>
        <span onClick={next}>
          <i className="fa-solid fa-angle-right"></i>
        </span>
      </div>
    </section>
  )
}

export default Slider