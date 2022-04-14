import * as THREE from 'three'
import { proxy } from 'valtio'

export const damp = THREE.MathUtils.damp
export const state = proxy({
  clicked: null,
  urls: [
      'bocre',
      'cloud',
      'colossal',
      'uni',
      'whales',
      'ayykia'
  ].map((u) => `/images/${u}.png`)
})
