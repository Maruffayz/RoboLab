import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Ground } from '../environment/Ground';
import { DifferentialDriveRobot } from '../robots/DifferentialDriveRobot';

export const SimulatorCanvas = () => {
  return (
    <div className="h-[520px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={['#e2e8f0']} />

        <PerspectiveCamera makeDefault position={[4, 5, 8]} fov={42} />
        <ambientLight intensity={1.15} />
        <directionalLight castShadow position={[5, 8, 6]} intensity={1.8} shadow-mapSize={[2048, 2048]} />
        <spotLight position={[-6, 7, 6]} angle={0.45} intensity={1.3} penumbra={0.8} color="#bfdbfe" />

        <Ground size={18} />
        <DifferentialDriveRobot position={[0, 0.4, 0]} rotationY={Math.PI / 4} scale={1.2} />

        <OrbitControls enablePan enableZoom enableRotate maxPolarAngle={Math.PI / 2.2} minDistance={4} maxDistance={16} />
      </Canvas>
    </div>
  );
};
