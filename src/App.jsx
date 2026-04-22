import { Canvas } from "@react-three/fiber"
import { ScrollControls, Scroll } from "@react-three/drei"
import Experience from "./experience/Experience"
import Sections from "./components/sections/Sections"
import { useState } from 'react'

// react
import { useRef } from 'react'

import './app.scss'

import { textData } from './data/textData.js'



export default function App() {

  const scrollRef = useRef(0)

  const [activeText, setActiveText] = useState(null)
  const [scrollOffset, setScrollOffset] = useState(0)

  const currentText = activeText

  // console.log(currentText)
  console.log(scrollRef.current)

const getOpacity = (offset, item) => {

  // 🔴 BLOQUE DURO: antes de empezar → invisible SIEMPRE
  if (offset <= item.fadeInStart) return 0

  // 🟢 fade in
  if (offset > item.fadeInStart && offset <= item.fadeInEnd) {
    return (offset - item.fadeInStart) / (item.fadeInEnd - item.fadeInStart)
  }

  // 🟡 visible
  if (offset > item.fadeInEnd && offset < item.fadeOutStart) {
    return 1
  }

  // 🔵 fade out
  if (offset >= item.fadeOutStart && offset < item.fadeOutEnd) {
    return 1 - (
      (offset - item.fadeOutStart) /
      (item.fadeOutEnd - item.fadeOutStart)
    )
  }

  // ⚫ después → invisible
  return 0
}




  return (
    <>

      { textData.map((item) => {

        const opacity = getOpacity(scrollOffset, item)

        return (
          <div
            key={item.id}
            className={item.className}
            style={{
              opacity: opacity,
              pointerEvents: 'none' // importante para no bloquear clicks
            }}
          >
            <h1>{item.text}</h1>
          </div>
        )
      })}

      {/* {currentText && (
        <div className={currentText.className}>
          <h1>{currentText.text}</h1>
        </div>
      )}
      */}

      <Canvas>
        {/* “Quiero que el usuario tenga que scrollear 5 pantallas para recorrer el 0 → 1 */}
        <ScrollControls pages={3}>
                
          {/* 3D */}
          <Experience 
            setActiveText={setActiveText} 
            setScrollOffset={setScrollOffset}  
            scrollRef={scrollRef}
          />

          {/* HTML */}
          <Scroll html>
            {/* <div className="scroll-container">
              <Sections />
            </div> */}
          </Scroll>           

        </ScrollControls>
      </Canvas>

  
 
    </>


  )
}