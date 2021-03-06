//@ts-nocheck
import * as THREE from 'three'
import { MutableRefObject, Ref, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image, ScrollControls, Scroll, useScroll, Box } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { Minimap } from './Minimap'
import { state, damp } from './util'
import Background from './Background'

function Item({ index, position, scale, c = new THREE.Color(), url, ...props }) {
  const ref = useRef<THREE.Group>(null!)
  const imageRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>(null!)
  const scroll = useScroll()
  const { clicked, urls } = useSnapshot(state)
  const [hovered, hover] = useState(false)
  const click = () => (state.clicked = index === clicked ? null : index)
  const over = () => hover(true)
  const out = () => hover(false)
  useFrame((state, delta) => {
    const y = scroll.curve(index / urls.length - 1.5 / urls.length, 4 / urls.length)
    imageRef.current.material.scale[1] = ref.current.scale.y = damp(ref.current.scale.y, clicked === index ? 5 : 4 + y, 8, delta)
    imageRef.current.material.scale[0] = ref.current.scale.x = damp(ref.current.scale.x, clicked === index ? 4.7 : scale[0], 6, delta)
    if (clicked !== null && index < clicked) ref.current.position.x = damp(ref.current.position.x, position[0] - 2, 6, delta)
    if (clicked !== null && index > clicked) ref.current.position.x = damp(ref.current.position.x, position[0] + 2, 6, delta)
    if (clicked === null || clicked === index) ref.current.position.x = damp(ref.current.position.x, position[0], 6, delta)
    imageRef.current.material.grayscale = damp(imageRef.current.material.grayscale, hovered || clicked === index ? 0 : Math.max(0, 1 - y), 6, delta)
    imageRef.current.material.color.lerp(c.set(hovered || clicked === index ? 'white' : '#aaa'), hovered ? 0.3 : 0.1)
  })
  return <group ref={ref} {...props} position={position} scale={scale} onClick={click} onPointerOver={over} onPointerOut={out}>
          <Image ref={imageRef} url={url} />
        </group>
}

function Items({ w = 0.7, gap = 0.4 }) {
  const { urls } = useSnapshot(state)
  const { width } = useThree((state) => state.viewport)
  const xW = w + gap
  return (
    <ScrollControls horizontal damping={10} pages={(width - xW + urls.length * xW) / width}>
      <Minimap />
      <Scroll>
        {urls.map((url, i) => <Item key={i} index={i} position={[i * xW, 0, 0]} scale={[w, 5, 1]} url={url} />) /* prettier-ignore */}
      </Scroll>
    </ScrollControls>
  )
}

export default Items
