/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Billboard, Text } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { TextureLoader } from 'three';
import { setTargetImage } from './actions';

const aspectRatio = 16 / 16;
const thumbHeight = 16;
const thumbWidth = thumbHeight * aspectRatio;

interface PhotoNodeProps {
  id: string;
  imageUrl: string;
  x?: number;
  y?: number;
  z?: number;
  highlight?: boolean;
  dim?: boolean;
  xRayMode?: boolean;
  description: string;
}

export default function PhotoNode({
  id,
  imageUrl,
  x = 0,
  y = 0,
  z = 0,
  highlight,
  dim,
  xRayMode,
  description
}: PhotoNodeProps) {
  const texture = useLoader(TextureLoader, `${imageUrl}`);
  const opacity = highlight ? 1 : dim ? 0.1 : 1;

  return !texture ? null : (
    <motion.group
      onClick={(e) => {
        e.stopPropagation();
        setTargetImage(id);
      }}
      position={[x * 500, y * 500, z * 500] as [number, number, number]}
      animate={{
        x: x * 600,
        y: y * 600,
        z: z * 600,

        transition: { duration: 1, ease: 'circInOut' }
      }}
    >
      <Billboard>
        <mesh scale={[thumbWidth, thumbHeight, 1]}>
          <planeGeometry />
          <motion.meshStandardMaterial
            map={texture}
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            transition={{ duration: 0.5 }}
            color={xRayMode ? '#999' : '#fff'}
          />
        </mesh>
      </Billboard>

      <Billboard>
        <Text
          fontSize={1}
          color='white'
          anchorX='left'
          anchorY='middle'
          position={[-(thumbWidth / 2) + 2, 0, 1]}
          maxWidth={thumbWidth - 4}
          fillOpacity={xRayMode ? 1 : 0}
        >
          {description.split('.')[0] + '.'}
        </Text>
      </Billboard>
    </motion.group>
  );
}
