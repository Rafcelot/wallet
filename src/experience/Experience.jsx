// ---------------------------
// IMPORTS
// ---------------------------

// drei
import { Environment, useHelper, useScroll } from '@react-three/drei'

// fiber
import { useFrame } from '@react-three/fiber'

// react
import { useRef } from 'react'

// three
import * as THREE from 'three'
import { DirectionalLightHelper } from 'three'

// models
import Wallet from './models/Wallet.jsx'

// data
import { leatherPresets } from '../data/materials.js'

// custom hock
import { useBreakpoint } from '../hooks/useBreakpoint.js'
import { layoutConfig } from '../data/textData.js'




// ---------------------------
// COMPONENT
// ---------------------------

export default function Experience({ setActiveText, setScrollOffset }) {

  // ---------------------------
  // REFS
  // ---------------------------

  const modelRef = useRef()            // referencia al modelo
  const scroll = useScroll()           // hook de scroll

  const currentAnimation = useRef(null) // animación actual
  const firstCharge = useRef(false)     // control para saber si ya abrió
  const smoothProgress = useRef(0)      // progreso suavizado (lerp)
  const lastOffset = useRef(0)          // evitar re-renders innecesarios

  const lightRef = useRef()             // referencia de la luz

  // --------------------
  // 
  // ---------------------

  const { isDesktop } = useBreakpoint()
  

  const currentLayout = isDesktop
    ? layoutConfig.desktop
    : layoutConfig.mobile


  const modelPosition = currentLayout.model.position
  const modelScale = currentLayout.model.scale
  const modelRotation = currentLayout.model.rotation

 

  // ---------------------------
  // ANIMATION CONTROLLER
  // ---------------------------

  const playAnimation = (name) => {

    const actions = modelRef.current?.actions
    if (!actions) return

    // evitar repetir la misma animación
    if (currentAnimation.current === name) return

    const next = actions[name]
    const prev = actions[currentAnimation.current]

    // fade out de la anterior
    if (prev) prev.fadeOut(0.5)

    // preparar nueva animación
    next.reset()
    next.setLoop(THREE.LoopOnce)
    next.clampWhenFinished = true

    // reproducir con fade
    next.fadeIn(0.5).play()

    currentAnimation.current = name
  }



  // ---------------------------
  // FRAME LOOP (CORE LOGIC)
  // ---------------------------

  useFrame(() => {

    const offset = scroll.offset



    // ---------------------------
    // [SYS-01] OPTIMIZACIÓN RE-RENDER
    // ---------------------------

    // solo actualiza si el cambio es significativo
    if (Math.abs(offset - lastOffset.current) > 0.01) {
      lastOffset.current = offset
      setScrollOffset(offset)
    }





    // ---------------------------
    //  CONTROL DE ANIMACIONES
    // ---------------------------

    // marcar que ya pasó por apertura
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

    // ejecutar cambio de animación
    if (nextAnimation) {
      playAnimation(nextAnimation)
    }



    // ---------------------------
    // [ANIM-01] SMOOTH SCROLL (LERP)
    // ---------------------------

    const target = scroll.range(0, 0.3)
    
    smoothProgress.current = THREE.MathUtils.lerp(
      smoothProgress.current,
      target,
      0.08
    )

    const progress = smoothProgress.current
    


    // ---------------------------
    //  TRANSFORM MODEL
    // ---------------------------


    const model = modelRef.current?.group?.current
    if (!model) return

    model.position.x = modelPosition[0]
    model.position.y = modelPosition[1]
    model.position.z = modelPosition[2] + (progress * -6)

   

    model.rotation.y = -(progress * Math.PI / 2) + Math.PI / 7
    model.position.z = progress * -6
    // model.position.x = progress * -2.6

  })



  // ---------------------------
  // DEBUG HELPERS
  // ---------------------------

  useHelper(lightRef, DirectionalLightHelper, 1)



  // ---------------------------
  // JSX
  // ---------------------------

  return (
    <>
      {/* MODEL */}
      <Wallet
        ref={modelRef}
        scale={[0.4, 0.4, 0.4]}
        // scale = {modelScale}
        // position={[0, -2, 0]}
        // rotation={[0, Math.PI / 6, 0]}
        rotation={ modelRotation }
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
    </>
  )
}