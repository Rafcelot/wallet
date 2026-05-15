import { Canvas } from "@react-three/fiber"
import { ScrollControls, Scroll } from "@react-three/drei"
import Experience from "./experience/Experience"
import TextOverlay from "./components/ui/TextOverlay"
import { useState } from 'react'

import './app.scss'
import { textData } from './data/textData.js'
// import NavBar from "./components/layout/Navbar.jsx"
import NavBar from "@/components/layout/navbar/Navbar.jsx"
import { useBreakpoint } from "@/hooks/useBreakpoint.js"
import ProductHero from "./components/sections/product-hero/ProductHero.jsx"

export default function App() {

   // Estado global para la textura activa
  const [activeTexture, setActiveTexture] = useState('black')
 

  // 📌 estados
  const [scrollOffset, setScrollOffset] = useState(0)

  const { isDesktop } = useBreakpoint()
  // console.log(isDesktop)

  return (
    <>

      <NavBar />

      {/* 🟣 UI (textos) */}
      
      {/* <TextOverlay 
        scrollOffset={scrollOffset} 
        textData={textData} 
      /> */}

      {/* SECTIONS */}
      <ProductHero 
        setActiveTexture={ setActiveTexture }
        activeTexture={ activeTexture }
      /> 


      {/* 🟢 3D */}
      <Canvas
        camera={{
          position: isDesktop ? [0, 0.5, 9] :[0, 0.5, 8],
          fov: isDesktop ? 40 : 55        
        }}
        // camera={{
        //   position: [0, 0, 12],
        //   fov: 30
        // }}
      >

        {/* <axesHelper args={[10]}/> */}

        <ScrollControls pages={3} >

          <Experience 
            setScrollOffset={ setScrollOffset }  
            activeTexture={ activeTexture }
          />

          <Scroll html>
            {/* aquí puedes poner UI si quieres */}
          </Scroll>           

        </ScrollControls>

      </Canvas>

    </>
  )
}