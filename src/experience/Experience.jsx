// ---------------------------
// IMPORTS
// ---------------------------

// drei
import { Environment, useHelper } from '@react-three/drei'
import { Scroll, useScroll } from '@react-three/drei'

// fiber
import { useFrame } from '@react-three/fiber'

// react
import { useRef } from 'react'

// three
import * as THREE from 'three'
import { DirectionalLightHelper } from 'three'

// models
import Wallet from './models/Wallet.jsx'
import TextureTest from './models/TextureTest.jsx'
import Prueba from './models/Prueba.jsx'

// data
import { textData } from '../data/textData.js'
import { leatherPresets } from '../data/materials.js'



// ---------------------------
// COMPONENT
// ---------------------------

export default function Experience({ setActiveText }) {

  // ---------------------------
  // REFS
  // ---------------------------

  const modelRef = useRef()
  const scroll = useScroll()

  const currentAnimation = useRef(null)
  const firstCharge = useRef(false)
  const lastText = useRef(null)

  const lightRef = useRef()



  // ---------------------------
  // HELPERS (ANIMATIONS)
  // ---------------------------

  const playAnimation = (name) => {

    const actions = modelRef.current?.actions
    if (!actions) return

    // evitar repetir la misma animación
    if (currentAnimation.current === name) return

    const next = actions[name]
    const prev = actions[currentAnimation.current]

    // fade out anterior
    if (prev) prev.fadeOut(0.5)

    // preparar nueva
    next.reset()
    next.setLoop(THREE.LoopOnce)
    next.clampWhenFinished = true

    // reproducir
    next.fadeIn(0.5).play()

    currentAnimation.current = name
  }



  // ---------------------------
  // DEBUG (opcional)
  // ---------------------------

  // console.log("offset:", scroll.offset)
  // console.log("page:", (scroll.offset * 5) + 1)



  // ---------------------------
  // FRAME LOOP
  // ---------------------------

  useFrame(() => {

    const offset = scroll.offset



    // ---------------------------
    // TEXTOS DINÁMICOS
    // ---------------------------

    const active = textData.find(
      (item) => offset > item.min && offset < item.max
    ) || null

    if (lastText.current !== active?.id) {
      lastText.current = active?.id
      setActiveText(active)
    }



    // ---------------------------
    // CONTROL DE ANIMACIONES
    // ---------------------------

    // detectar si ya pasó por apertura
    if (offset >= 0.2) {
      firstCharge.current = true
    }

    let nextAnimation = null

    // abrir
    if (offset > 0.2 && offset < 0.5) {
      nextAnimation = 'open-leather'
    }

    // cerrar (solo si ya abrió antes)
    if ((offset <= 0.2 || offset >= 0.7) && firstCharge.current) {
      nextAnimation = 'close-leather'
    }

    if (nextAnimation && currentAnimation.current !== nextAnimation) {
      playAnimation(nextAnimation)
    }



    // ---------------------------
    // TRANSFORMACIONES (MODEL)
    // ---------------------------

    const progress = scroll.range(0, 0.3)

    const model = modelRef.current?.group?.current
    if (!model) return

    model.rotation.y = -(progress * Math.PI / 2) + Math.PI / 7
    model.position.z = progress * -6
    model.position.x = progress * -2.6

  })



  // ---------------------------
  // HELPERS (DEBUG VISUAL)
  // ---------------------------

  useHelper(lightRef, DirectionalLightHelper, 1)



  // ---------------------------
  // JSX
  // ---------------------------

  return (
    <>

      {/* CONTROLS */}
      {/* <OrbitControls /> */}

      {/* TESTS */}
      {/* <TextureTest /> */}
      {/* <Prueba position={[0,-4,1]} /> */}



      {/* MODEL */}
      <Wallet
        ref={modelRef}
        scale={[0.4, 0.4, 0.4]}
        position={[0, -2, 0]}
        rotation={[0, Math.PI / 7, 0]}
        materialConfig={leatherPresets.brown}
      />



      {/* LIGHT */}
      <directionalLight
        ref={lightRef}
        position={[3, 5, 5]}
        intensity={1.5}
      />



      {/* ENVIRONMENT */}
      <Environment preset='lobby' />

      {/* <ambientLight intensity={0.5} /> */}

    </>
  )
}