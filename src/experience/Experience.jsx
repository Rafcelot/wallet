



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

import { Lightformer } from '@react-three/drei'





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

  // const currentAnimation = useRef(null)

  const currentAnimations = useRef({
    wallet: null,
    pocket: null,
    'first-card': null,
  })

  const firstCharge = useRef(false)

  const smoothProgress = useRef(0)
  const lastOffset = useRef(0)

  const lightRef = useRef()

  const animationTrigged = useRef(false)
  const pocketTimeout = useRef(null)

  const firstCardTriggered = useRef(false)  
  const firstCardTimeout = useRef(null)

  const secondCardTriggered = useRef(false)  
  const secondCardTimeout = useRef(null)

  const leverTriggered = useRef(false)  
  const leverTimeout = useRef(null)



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


const playAnimation = (group, name) => {

  const actions = modelRef.current?.actions

  if (!actions) return

  const current = currentAnimations.current[group]

  if (current === name) return

  const prev = actions[current]
  const next = actions[name]

  if (prev) {
    prev.fadeOut(0.5)
  }

  next.reset()
  next.setLoop(THREE.LoopOnce)
  next.clampWhenFinished = true

  next.fadeIn(0.5).play()

  currentAnimations.current[group] = name
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

    // abrir 
    if(
      offset > 0.2 &&
      offset < 0.6 &&
      !animationTrigged.current
    ) {

      animationTrigged.current = true

      playAnimation('wallet', 'open-leather')

      clearTimeout(pocketTimeout.current)

      pocketTimeout.current = setTimeout(() => {

        playAnimation('pocket', 'open-plastic')
      }, 2200)
    }

    // Cerrar
    if(
      (offset <= 0.2 || offset >= 0.6) &&
      firstCharge.current &&
      animationTrigged.current
    ) {

      animationTrigged.current = false
      
      clearTimeout(pocketTimeout.current)

      playAnimation('wallet', 'close-leather')

      playAnimation('pocket', 'close-plastic')
    }

    // Open first-cards
    if (
      offset > 0.95 &&
      !firstCardTriggered.current     
    ) {

      firstCardTriggered.current = true

      clearTimeout(firstCardTimeout.current)
      
      firstCardTimeout.current = setTimeout(() => {
        
        playAnimation('first-card', 'open-first-card')
      },1500)

    }

    // Close first-card
    if(
      offset < 0.95 &&
      firstCardTriggered.current
    ) {

      clearTimeout(firstCardTimeout.current)

      firstCardTriggered.current = false

      playAnimation('first-card', 'close-first-card')
    }

    
    // Open second-cards
    if (
      offset > 0.95 &&
      !secondCardTriggered.current     
    ) {

      secondCardTriggered.current = true

      clearTimeout(secondCardTimeout.current)
      
      secondCardTimeout.current = setTimeout(() => {
        
        playAnimation('second-card', 'open-second-card')
      },1500)

    }

    // Close second-card
    if(
      offset < 0.95 &&
      secondCardTriggered.current
    ) {

      clearTimeout(firstCardTimeout.current)

      secondCardTriggered.current = false

      playAnimation('second-card', 'close-second-card')
    }


        // Open lever
    if (
      offset > 0.95 &&
      !leverTriggered.current     
    ) {

      leverTriggered.current = true

      clearTimeout(leverTimeout.current)
      
      leverTimeout.current = setTimeout(() => {
        
        playAnimation('lever', 'open-lever')
      },1500)

    }

    // Close lever
    if(
      offset < 0.95 &&
      leverTriggered.current
    ) {

      clearTimeout(leverTimeout.current)

      leverTriggered.current = false

      playAnimation('lever', 'close-lever')
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

    const moveRightRange = scroll.range(0.6, 1)

    const rotationRightPullOverRange = scroll.range(0.6, 1)



   


    // ---------------------------
    //  TARGET TRANSFORMS
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
      + (moveLeftRange * moveLeft)
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

    // model.position.x = targetX

    model.position.x = THREE.MathUtils.lerp(
      model.position.x,
      targetX,
      0.08
    )

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

  // useHelper(lightRef, DirectionalLightHelper, 1)



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
        position={[-1, 3, 5]}
        intensity={0.8}
      />

      {/* ENVIRONMENT */}
      {/* <Environment preset='city' background/> */}

      <Environment
        // background
        preset='warehouse'
        environmentIntensity={0.8}
      
      >
            <color args={ ['rgb(0, 0, 0)'] } attach={ 'background'} />
            <Lightformer 
                position-z={ -5 } 
                scale={ 10 }
                color={ 'rgb(184, 184, 184)' }
                intensity={ 2 }
                form={ 'ring' }
            />
      </Environment>

    </>
  )
}


































