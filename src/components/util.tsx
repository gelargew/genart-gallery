import * as THREE from 'three'
import { proxy } from 'valtio'

export const damp = THREE.MathUtils.damp
export const state = proxy({
  clicked: null,
  urls: [
      'faces',
      'cube',
      'bocre',
      'cloud',
      'colossal',
      'crowd',
      'whales',
      'cube2',
      'uni'
  ].map((u) => `/images/${u}.png`)
})
