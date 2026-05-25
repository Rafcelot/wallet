import './product-hero.scss'



import { getOpacityProductHero } from '../../../utils/getOpacity'



import { useEffect, useRef, useState } from "react"

import { useBreakpoint } from '../../../hooks/useBreakpoint'
import StarIcon from '../../ui/icons/start-icon/StartIcon'

import { walletTextures } from '@/data/aphineWalletTextures'
import { useFrame } from '@react-three/fiber'

import { sectionOpacityData } from '../../../data/textData'


export default function ProductHero({
  setActiveTexture,
  activeTexture,
  scrollOffset
}) {

  

  // console.log("scroll", scrollOffset)

   // ---------------------------
  // REFS
  // ---------------------------

  // const opacity = getOpacity(scrollOffset, sectionOpacityData)

  const opacity = getOpacityProductHero(scrollOffset)



  const previousScroll = useRef(0)

  // ---------------------------
  // STATES
  // ---------------------------

  const [hideProductHero, setHideProductHero] = useState(false)

  // ---------------------------
  // SCROLL DIRECTION
  // ---------------------------





  const showTimeout = useRef(null)
    



  useEffect(() => {

  const isScrollingDown =
    scrollOffset > previousScroll.current

  // ---------------------------
  // HIDE HERO
  // ---------------------------

  if (isScrollingDown && scrollOffset > 0.3) {

    setHideProductHero(true)

    // cancelamos cualquier show pendiente
    clearTimeout(showTimeout.current)

  }

  // ---------------------------
  // SHOW HERO
  // ---------------------------

  if (!isScrollingDown && scrollOffset < 0.05) {

    // evitamos crear múltiples timeouts
    clearTimeout(showTimeout.current)

    showTimeout.current = setTimeout(() => {

      setHideProductHero(false)

    }, 2500)

  }

  previousScroll.current = scrollOffset

}, [scrollOffset])


useEffect(() => {

  return () => {

    clearTimeout(showTimeout.current)

  }

}, [])

  
  return (

    <section 
      className={`product-hero ${hideProductHero ? "active" : ""}`}
      style={{
        opacity: opacity,
        
        visibility:
          hideProductHero
            ? 'hidden'
            : 'visible',


      }}
      >

      <div className='product-hero__container'>

        <div className='product-hero__layout'>

          <div className='product-hero__description'>

            <div className='product-hero__information'>

              <h1 className='product-hero__title'>
                Alphine
              </h1>

              <div className='product-hero__meta'>

                <p className="product-hero__price">$99.000</p>

                <div className='product-hero__rating'>

                  <div className='product-hero__stars'>
                    <StarIcon className="icon__star-icon" />
                    <StarIcon className="icon__star-icon" />
                    <StarIcon className="icon__star-icon" />
                    <StarIcon className="icon__star-icon" />
                    <StarIcon className="icon__star-icon" />
                  </div>

                  <div className='product-hero__reviews'>
                    <p>4.9 (37.101 reviews)</p>
                  </div>

                </div>

              </div>



            </div>
            
            <p className="product-hero__paragraph">
              Lorem ipsum dolor sit amet consectetur.
              Enim eu ut nam pulvinar egestas eget facilisis.
              Elementum purus rhoncus tellus sagittis.
              Pretium cursus arcu morbi phasellus.
              Proin aliquet vel mi pharetra urna neque a.
            </p>

          </div>

          <div className='product-hero__color-section'>
            <div>
              <p className='product-hero__color-text'>Escoge el color</p>
              <div className='product-hero__current-color-texts'>
                <p className='product-hero__color'>Color:</p>
                <p className='product-hero__current-color'>{activeTexture}</p>
              </div>
            </div>

            <div className='product-hero__textures'>

              {walletTextures.map((texture) => (

                <button
                  key={texture.id}
                  className='product-hero__texture-buttons'
                  onClick={() => setActiveTexture(texture.name)}
                >

                  <img
                    src={texture.preview}
                    alt={texture.name}
                    className='product-hero__texture-image'
                  />

                </button>

              ))}

            </div>            
          </div>

          <button className='product-hero__button-cart'>
            AGREGAR AL CARRITO
          </button>

        </div>

      </div>

    </section>

  )
}