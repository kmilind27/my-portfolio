import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import styles from './Background3D.module.css';

function ParticleField() {
  const ref = useRef();
  const count = 2500;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 35;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 35;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 35;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.015;
      ref.current.rotation.y -= delta * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#915EFF" size={0.035} sizeAttenuation depthWrite={false} opacity={0.5} />
    </Points>
  );
}

function FloatingOrb({ position, color, speed = 1, distort = 0.4 }) {
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.2}>
      <Sphere args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial color={color} distort={distort} speed={2} roughness={0} metalness={0.2} transparent opacity={0.12} />
      </Sphere>
    </Float>
  );
}

function TorusRing({ position, color }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.25;
      ref.current.rotation.y += delta * 0.15;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[1.2, 0.03, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.35} />
    </mesh>
  );
}

function MovingPointLight() {
  const ref = useRef();
  const t = useRef(0);
  useFrame((_, delta) => {
    if (ref.current) {
      t.current += delta;
      ref.current.position.x = Math.sin(t.current * 0.4) * 8;
      ref.current.position.y = Math.cos(t.current * 0.3) * 5;
    }
  });
  return <pointLight ref={ref} intensity={2} color="#915EFF" distance={20} />;
}

export default function Background3D() {
  return (
    <div className={styles.wrapper}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#915EFF" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00D8FF" />
        <pointLight position={[0, 5, 5]} intensity={0.8} color="#14F195" />
        <MovingPointLight />
        <ParticleField />
        <FloatingOrb position={[-4, 2, -3]} color="#915EFF" speed={1.2} distort={0.5} />
        <FloatingOrb position={[4, -2, -4]} color="#00D8FF" speed={0.8} distort={0.3} />
        <FloatingOrb position={[0, 3, -5]} color="#14F195" speed={1.5} distort={0.6} />
        <TorusRing position={[3, 1, -2]} color="#915EFF" />
        <TorusRing position={[-3, -1, -3]} color="#00D8FF" />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
