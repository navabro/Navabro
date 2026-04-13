import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField({ count = 3500 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04
      ref.current.rotation.x += delta * 0.015
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#ff6044"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function FloatingGeo() {
  const mesh1 = useRef()
  const mesh2 = useRef()
  const mesh3 = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (mesh1.current) {
      mesh1.current.rotation.x = t * 0.3
      mesh1.current.rotation.y = t * 0.5
      mesh1.current.position.y = Math.sin(t * 0.8) * 0.4 + 0.5
    }
    if (mesh2.current) {
      mesh2.current.rotation.x = -t * 0.4
      mesh2.current.rotation.z = t * 0.3
      mesh2.current.position.y = Math.sin(t * 0.6 + 2) * 0.3 - 0.8
    }
    if (mesh3.current) {
      mesh3.current.rotation.y = t * 0.6
      mesh3.current.position.y = Math.sin(t * 0.7 + 4) * 0.35
    }
  })

  return (
    <>
      <mesh ref={mesh1} position={[2.5, 0.5, -1]}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#ff6044"
          wireframe
          transparent
          opacity={0.7}
          emissive="#ff6044"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh ref={mesh2} position={[-2.8, -0.8, -0.5]}>
        <octahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial
          color="#ff6044"
          wireframe
          transparent
          opacity={0.65}
          emissive="#ff6044"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh ref={mesh3} position={[1.2, 0, -2]}>
        <tetrahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color="#ff6044"
          wireframe
          transparent
          opacity={0.6}
          emissive="#ff6044"
          emissiveIntensity={0.4}
        />
      </mesh>
    </>
  )
}

function CameraRig({ mouse }) {
  useFrame(({ camera }) => {
    camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.05
    camera.position.y += (-mouse.current.y * 1.2 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroScene({ mouse }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 65 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]} intensity={0.8} color="#ff6044" />
      <pointLight position={[-4, -2, 2]} intensity={0.6} color="#ff6044" />
      <ParticleField />
      <FloatingGeo />
      <CameraRig mouse={mouse} />
    </Canvas>
  )
}
