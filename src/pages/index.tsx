import { Canvas } from '@react-three/fiber'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Image } from '@react-three/drei'
import styles from '../styles/Home.module.css'
import Items from '../components/Items'
import { state } from '../components/util'
import { Suspense } from 'react'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Generative Art | Gelar</title>
      </Head>
      <div className={styles.container}>
      <main>
        <Suspense fallback={null}>
          <Canvas gl={{ antialias: false }} dpr={[1, 1.5]} onPointerMissed={() => (state.clicked = null)}>
            <Items />
          </Canvas>
        </Suspense>
      </main>
    </div>
    </>

  )
}

export default Home
