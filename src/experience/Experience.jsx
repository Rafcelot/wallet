



// ---------------------------
// IMPORTS
// ---------------------------

// react
import { useRef } from 'react'

// fiber
import { useFrame } from '@react-three/fiber'

// drei
import { Environment, useHelper, useScroll } from '@react-three/drei'

// three
import * as THREE from 'three'
import { DirectionalLightHelper } from 'three'

// models
import Wallet from './models/Wallet.jsx'

// data
import { leatherPresets } from '../data/materials.js'
import { layoutConfig } from '../data/textData.js'

// hooks
import { useBreakpoint } from '../hooks/useBreakpoint.js'







// ---------------------------
// COMPONENT
// ---------------------------

export default function Experience({
  setActiveText,
  setScrollOffset,
  activeTexture
}) {

  // ---------------------------
  // REFS
  // ---------------------------

  const modelRef = useRef()                    

  const currentAnimation = useRef(null)
  const firstCharge = useRef(false)

  const smoothProgress = useRef(0)
  const lastOffset = useRef(0)

  const lightRef = useRef()



  // ---------------------------
  // HOOKS
  // ---------------------------

  const scroll = useScroll()

  const { isDesktop } = useBreakpoint()



  // ---------------------------
  // RESPONSIVE CONFIG
  // ---------------------------

  const currentLayout = isDesktop
    ? layoutConfig.desktop
    : layoutConfig.mobile

  const modelPosition = currentLayout.model.position
  const modelScale = currentLayout.model.scale
  const modelRotation = currentLayout.model.rotation



  // ---------------------------
  // ANIMATION CONFIG
  // ---------------------------

  const zoomOut = currentLayout.animations.zoomOut
  const zoomIn = currentLayout.animations.zoomIn

  const rotationLeft = currentLayout.animations.rotationLeft
  const rotationRight = currentLayout.animations.rotationRight

  const moveLeft = currentLayout.animations.moveLeft

  const moveDown = currentLayout.animations.moveDown

  const moveRight = currentLayout.animations.moveRight

  const rotationRightPullOver = currentLayout.animations.rotationRightPullOver
 

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

    // fade out animación anterior
    if (prev) {
      prev.fadeOut(0.5)
    }

    // preparar nueva animación
    next.reset()
    next.setLoop(THREE.LoopOnce)
    next.clampWhenFinished = true

    // reproducir nueva animación
    next.fadeIn(0.5).play()

    currentAnimation.current = name
  }



  // ---------------------------
  // FRAME LOOP
  // ---------------------------

  useFrame(() => {

    // ---------------------------
    // SCROLL DATA
    // ---------------------------

    const offset = scroll.offset



    // ---------------------------
    // OPTIMIZATION
    // ---------------------------

    // evitar re-renders innecesarios
    if (Math.abs(offset - lastOffset.current) > 0.01) {

      lastOffset.current = offset

      setScrollOffset(offset)
    }



    // ---------------------------
    // ANIMATION STATES
    // ---------------------------

    // marcar que ya pasó por apertura
    if (offset >= 0.2) {
      firstCharge.current = true
    }

    let nextAnimation = null

    // abrir billetera
    if (offset > 0.2 && offset < 0.65) {
      nextAnimation = 'open-leather'
    }

    // cerrar billetera
    if (
      (offset <= 0.2 || offset >= 0.6)
      && firstCharge.current
    ) {
      nextAnimation = 'close-leather'
    }

    // ejecutar cambio de animación
    if (nextAnimation) {
      playAnimation(nextAnimation)
    }



    // ---------------------------
    // SCROLL RANGES
    // ---------------------------

    const zoomOutRange = scroll.range(0, 0.4)

    const zoomInRange = scroll.range(0.7, 0.1)

    const rotationLeftRange = scroll.range(0, 0.3)

    const rotationRightRange = scroll.range(0.6, 0.4)

    const moveLeftRange = scroll.range(0, 0.3)

    const moveDownRange = scroll.range(0.15, 0.25)

    const moveRightRange = scroll.range(0.7, 1)

    const rotationRightPullOverRange = scroll.range(0.7, 1)

    // ---------------------------
    // SMOOTH VALUES [ANIM-01] SMOOTH SCROLL (LERP)
    // ---------------------------

    smoothProgress.current = THREE.MathUtils.lerp(
      smoothProgress.current,
      moveLeftRange,
      0.08
    )

    const smoothMoveProgress = smoothProgress.current



    // ---------------------------
    //  [ANIM-03] SMOOTH Z POSITION
    // ---------------------------

    const targetZ =
      modelPosition[2]
      + (zoomOutRange * zoomOut)
      + (zoomInRange * zoomIn)

    const targetRotationY =
      modelRotation[1]
      + (rotationLeftRange * -rotationLeft)
      + (rotationRightRange * rotationRight)
      // + (rotationRightPullOverRange * -rotationRightPullOver)

    const targetX =
      modelPosition[0]
      + (smoothMoveProgress * moveLeft)
      + (moveRightRange * moveRight)

    const targetY = 
      modelPosition[1]
        + (moveDownRange * moveDown)



    
      
    // ---------------------------
    // MODEL
    // ---------------------------

    const model = modelRef.current?.group?.current

    if (!model) return



    // ---------------------------
    // APPLY TRANSFORMS
    // ---------------------------

    model.position.x = targetX

    model.position.y = targetY

    model.position.z = THREE.MathUtils.lerp(
      model.position.z,
      targetZ,
      0.08
    )

    model.rotation.y = THREE.MathUtils.lerp(
      model.rotation.y,
      targetRotationY,
      0.08
    )
  })



  // ---------------------------
  // DEBUG
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
        scale={modelScale}
        rotation={modelRotation}
        materialConfig={leatherPresets[activeTexture]}
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









































// // ---------------------------
// // IMPORTS
// // ---------------------------

// // drei
// import { Environment, useHelper, useScroll } from '@react-three/drei'

// // fiber
// import { useFrame } from '@react-three/fiber'

// // react
// import { useRef, useState } from 'react'

// // three
// import * as THREE from 'three'
// import { DirectionalLightHelper } from 'three'

// // models
// import Wallet from './models/Wallet.jsx'

// // data
// import { leatherPresets } from '../data/materials.js'

// // custom hock
// import { useBreakpoint } from '../hooks/useBreakpoint.js'
// import { layoutConfig } from '../data/textData.js'





// // ---------------------------
// // COMPONENT
// // ---------------------------

// export default function Experience({ setActiveText, setScrollOffset, activeTexture }) {
// // console.log("experiece", activeTexture)
 

//   // ---------------------------
//   // REFS
//   // ---------------------------

//   const modelRef = useRef()            // referencia al modelo
//   const scroll = useScroll()           // hook de scroll

//   const currentAnimation = useRef(null) // animación actual
//   const firstCharge = useRef(false)     // control para saber si ya abrió
//   const smoothProgress = useRef(0)      // progreso suavizado (lerp)
//   const lastOffset = useRef(0)          // evitar re-renders innecesarios

//   const lightRef = useRef()             // referencia de la luz

//   // --------------------
//   // 
//   // ---------------------

//   const { isDesktop } = useBreakpoint()
  

//   const currentLayout = isDesktop
//     ? layoutConfig.desktop
//     : layoutConfig.mobile


//   const modelPosition = currentLayout.model.position
//   const modelScale = currentLayout.model.scale
//   const modelRotation = currentLayout.model.rotation
  
//   const zoomOut = currentLayout.animations.zoomOut
//   const zoomIn = currentLayout.animations.zoomIn 
  
//   const rotationLeft = currentLayout.animations.rotationLeft
//   const rotationRight = currentLayout.animations.rotationRight
  




//   const moveLeft = currentLayout.animations.moveLeft

//   // ---------------------------
//   // ANIMATION CONTROLLER
//   // ---------------------------

//   const playAnimation = (name) => {

//     const actions = modelRef.current?.actions
//     if (!actions) return

//     // evitar repetir la misma animación
//     if (currentAnimation.current === name) return

//     const next = actions[name]
//     const prev = actions[currentAnimation.current]

//     // fade out de la anterior
//     if (prev) prev.fadeOut(0.5)

//     // preparar nueva animación
//     next.reset()
//     next.setLoop(THREE.LoopOnce)
//     next.clampWhenFinished = true

//     // reproducir con fade
//     next.fadeIn(0.5).play()

//     currentAnimation.current = name
//   }



//   // ---------------------------
//   // FRAME LOOP (CORE LOGIC)
//   // ---------------------------

//   useFrame(() => {

//     const offset = scroll.offset
//     // console.log(offset)


//     // ---------------------------
//     // [SYS-01] OPTIMIZACIÓN RE-RENDER
//     // ---------------------------

//     // solo actualiza si el cambio es significativo
//     if (Math.abs(offset - lastOffset.current) > 0.01) {
//       lastOffset.current = offset
//       setScrollOffset(offset)
//     }





//     // ---------------------------
//     //  CONTROL DE ANIMACIONES
//     // ---------------------------

//     // marcar que ya pasó por apertura
//     if (offset >= 0.2) {
//       firstCharge.current = true
//     }

//     let nextAnimation = null

//     // abrir
//     if (offset > 0.2 && offset < 0.5) {
//       nextAnimation = 'open-leather'
//     }

//     // cerrar (solo si ya abrió antes)
//     if ((offset <= 0.2 || offset >= 0.7) && firstCharge.current) {
//       nextAnimation = 'close-leather'
//     }

//     // ejecutar cambio de animación
//     if (nextAnimation) {
//       playAnimation(nextAnimation)
//     }



//     // ---------------------------
//     // [ANIM-01] SMOOTH SCROLL (LERP)
//     // ---------------------------

//     // Esto solo genera un smoth en en rango de 0 a 0.3
//     const target = scroll.range(0, 0.3)
    
//     smoothProgress.current = THREE.MathUtils.lerp(
//       smoothProgress.current,
//       target,
//       0.08
//     )

//     const progress = smoothProgress.current


    
//     const zoomOutRange = scroll.range(0, 0.2)
//     const zoomInRange = scroll.range(0.7, 0.2)

//     const rotationLightRange = scroll.range(0, 0.3)
//     const rotationRightRange = scroll.range(0.5, 0.2)


//     // ---------------------------
//     // [ANIM-03] SMOOTH Z POSITION
//     // ---------------------------

//     const targetZ =
//     modelPosition[2]          // posición inicial
//     + (zoomOutRange * zoomOut) // alejamiento
//     + (zoomInRange * zoomIn)   // acercamiento
    

//     const targetRotationY = 
//       modelRotation[1]
//       + (rotationLightRange * -rotationLeft)
//       + (rotationRightRange * rotationRight)

//     // ---------------------------
//     //  TRANSFORM MODEL
//     // ---------------------------


//     const model = modelRef.current?.group?.current
//     if (!model) return

//     model.position.z = THREE.MathUtils.lerp(
//       model.position.z,
//       targetZ,
//       0.08
//     )

//     model.rotation.y = THREE.MathUtils.lerp(
//       model.rotation.y,
//       targetRotationY,
//       0.08
//     )

//     model.position.x = modelPosition[0]
//     model.position.y = modelPosition[1]
   

   
    
//     // model.rotation.y = -(progress * Math.PI / 2) + Math.PI / 5

//     model.position.x = modelPosition[0] + (progress * moveLeft)
   
   

    
//   })



//   // ---------------------------
//   // DEBUG HELPERS
//   // ---------------------------

//   useHelper(lightRef, DirectionalLightHelper, 1)



//   // ---------------------------
//   // JSX
//   // ---------------------------

//   return (
//     <>
      

//       {/* MODEL */}
//       <Wallet
//         ref={modelRef}
//         scale={[0.4, 0.4, 0.4]}
//         // scale = {modelScale}
//         // position={[-5000, 0, 0]}
//         // rotation={[0, Math.PI / 6, 0]}
//         rotation={ modelRotation }
//         materialConfig={leatherPresets[activeTexture]}
//       />

//       {/* LIGHT */}
//       <directionalLight
//         ref={lightRef}
//         position={[3, 5, 5]}
//         intensity={1.5}
//       />

//       {/* ENVIRONMENT */}
//       <Environment preset='lobby' />
//     </>
//   )
// }