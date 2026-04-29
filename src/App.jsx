import { Canvas } from "@react-three/fiber"
import { ScrollControls, Scroll } from "@react-three/drei"
import Experience from "./experience/Experience"
import TextOverlay from "./components/ui/TextOverlay"
import { useState } from 'react'

import './app.scss'
import { textData } from './data/textData.js'
// import NavBar from "./components/layout/Navbar.jsx"
import NavBar from "@/components/layout/Navbar.jsx"
import { useBreakpoint } from "@/hooks/useBreakpoint.js"

export default function App() {

  // 📌 estados
  const [scrollOffset, setScrollOffset] = useState(0)

  const { isDesktop } = useBreakpoint()
  console.log(isDesktop)

  return (
    <>

      <NavBar />

      {/* 🟣 UI (textos) */}
      
      <TextOverlay 
        scrollOffset={scrollOffset} 
        textData={textData} 
      />
 


      {/* 🟢 3D */}
      <Canvas
        // camera={{
        //   position: isDesktop ? [0, 0, 12] :[0, 0, 10],
        //   fov: isDesktop ? 45 : 35          
        // }}
        camera={{
          position: [0, 0, 12],
          fov: 30
        }}
      >

        <ScrollControls pages={3}>

          <Experience 
            setScrollOffset={setScrollOffset}  
          />

          <Scroll html>
            {/* aquí puedes poner UI si quieres */}
          </Scroll>           

        </ScrollControls>

      </Canvas>

    </>
  )
}