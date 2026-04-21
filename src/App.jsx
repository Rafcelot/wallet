import { Canvas } from "@react-three/fiber"
import { ScrollControls, Scroll } from "@react-three/drei"
import Experience from "./experience/Experience"
import Sections from "./components/sections/Sections"
import { useState } from 'react'

import './app.scss'



export default function App() {

  const [activeText, setActiveText] = useState(null)

  const currentText = activeText

  // console.log(currentText)

  return (
    <>

      {currentText && (
        <div className={currentText.className}>
          <h1>{currentText.text}</h1>
        </div>
      )}
     

      <Canvas>
        <ScrollControls pages={5}>
                
          {/* 3D */}
          <Experience setActiveText={setActiveText} />

          {/* HTML */}
          <Scroll html>
            <div className="scroll-container">
              <Sections />
            </div>
          </Scroll>           

        </ScrollControls>
      </Canvas>

  
 
    </>


  )
}