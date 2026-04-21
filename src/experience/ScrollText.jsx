import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'
import { textData } from '@/data/textData'

export default function ScrollText() {

  const scroll = useScroll()

  const [active, setActive] = useState(null)

  useFrame(() => {

    const offset = scroll.offset
    console.log(offset)

    
    const current = textData.find(
      (item) => offset > item.min && offset < item.max
    ) || null

    setActive(prev => {
      if (prev === current) return prev
      return current
    })

  })

  if (!active) return null

  return (
    <div className={active.className}>
      <h1>{active.text}</h1>
    </div>
  )
}