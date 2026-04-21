import { useTexture, Plane } from "@react-three/drei"
import * as THREE from 'three'

export default function Model() {

    const texture = useTexture('/textures/FabricLeatherCowhide001_COL_VAR3_2K.jpg')
    const textureDos = useTexture('/textures/prueba.png')
    
    // console.log(textureDos.colorSpace)
    // console.log(textureDos.flipY)

    // Drei ya no es necesario usar el colorSpace.
    texture.colorSpace = THREE.SRGBColorSpace
    texture.flipY = false

    return (
        <mesh>
            <planeGeometry args={[5, 5]}/>
            <meshStandardMaterial map={texture} />
        </mesh>
    )
}