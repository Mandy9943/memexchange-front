/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Billboard, Html, Text } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import Link from 'next/link';
import { TextureLoader } from 'three';
import { setTargetImage } from './actions';

// Import components to be rendered in Html
import BondingCurveProgress from '../../app/meme-coins/components/MemeCoins/components/BondingCurveProgress';
import MarketCap from '../../app/meme-coins/components/MemeCoins/components/MarketCap';

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
  name?: string;
  bondingAddress?: string;
  bondingState?: string;
  isSearchResult?: boolean;
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
  description,
  name,
  bondingAddress,
  bondingState,
  isSearchResult = false
}: PhotoNodeProps) {
  const texture = useLoader(TextureLoader, `${imageUrl}`);

  // Enhanced opacity logic for search results
  let opacity = 1;
  if (isSearchResult && !highlight) {
    opacity = 0.9; // Search results are slightly highlighted even when not focused
  } else if (highlight) {
    opacity = 1;
  } else if (dim) {
    opacity = isSearchResult ? 0.4 : 0.1; // Search results remain more visible when dimmed
  }

  const displayName = name || description.split(' ')[0] || 'Coin';

  // Enhanced scale for search results
  const baseScale = isSearchResult && !highlight ? 1.1 : 1;
  const highlightScale = highlight ? 1.2 : baseScale;

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
        scale: highlightScale,
        transition: { duration: 1, ease: 'circInOut' }
      }}
    >
      {/* Search result glow effect */}
      {isSearchResult && !highlight && (
        <Billboard>
          <mesh scale={[thumbWidth * 1.3, thumbHeight * 1.3, 1]}>
            <planeGeometry />
            <motion.meshStandardMaterial
              transparent
              opacity={0.3}
              color='#60a5fa'
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 0.5 }}
            />
          </mesh>
        </Billboard>
      )}

      <Billboard>
        <mesh scale={[thumbWidth, thumbHeight, 1]}>
          <planeGeometry />
          <motion.meshStandardMaterial
            map={texture}
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            transition={{ duration: 0.5 }}
            color={
              isSearchResult && !highlight
                ? '#e0f2fe' // Light blue tint for search results
                : xRayMode
                ? '#999'
                : '#fff'
            }
          />
        </mesh>
      </Billboard>

      {/* Search result indicator */}
      {isSearchResult && !highlight && (
        <Billboard position={[thumbWidth / 2 - 1, thumbHeight / 2 - 1, 0.1]}>
          <mesh scale={[2, 2, 1]}>
            <circleGeometry args={[1, 16]} />
            <motion.meshStandardMaterial
              transparent
              color='#3b82f6'
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.5 }}
            />
          </mesh>
          <Text
            fontSize={1.2}
            color='white'
            anchorX='center'
            anchorY='middle'
            position={[0, 0, 0.1]}
          >
            ✓
          </Text>
        </Billboard>
      )}

      <Billboard>
        <Text
          fontSize={1}
          color={isSearchResult ? '#60a5fa' : 'white'}
          anchorX='left'
          anchorY='middle'
          position={[-(thumbWidth / 2) + 2, 0, 1]}
          maxWidth={thumbWidth - 4}
          fillOpacity={xRayMode && !highlight ? 1 : 0}
        >
          {description.split('.')[0] + '.'}
        </Text>
      </Billboard>

      {highlight && (
        <Billboard position={[0, -thumbHeight / 2 - 5, 0]}>
          <Text
            fontSize={2}
            color={isSearchResult ? '#60a5fa' : 'white'}
            anchorX='center'
            anchorY='top'
            maxWidth={thumbWidth * 1.5}
            outlineColor='black'
            outlineWidth={0.1}
          >
            {displayName}
          </Text>
          <Text
            fontSize={1.2}
            color='#ccc'
            anchorX='center'
            anchorY='top'
            position={[0, -2.5, 0]}
            maxWidth={thumbWidth * 1.8}
            lineHeight={1.2}
            textAlign='center'
          >
            {description}
          </Text>
          {isSearchResult && (
            <Text
              fontSize={1}
              color='#60a5fa'
              anchorX='center'
              anchorY='top'
              position={[0, -5, 0]}
              maxWidth={thumbWidth * 1.8}
              textAlign='center'
            >
              🔍 Search Result
            </Text>
          )}
        </Billboard>
      )}

      {/* Display MarketCap and BondingCurveProgress when highlighted */}
      {highlight && bondingAddress && (
        <Html
          position={[0, thumbHeight / 2 + 2, 0]}
          center
          className='p-4 bg-black bg-opacity-50 rounded-lg w-64'
        >
          <div className='text-white'>
            {name && (
              <h3 className='text-lg font-bold mb-2 text-center'>{name}</h3>
            )}
            <div className='mb-2'>
              <MarketCap bondingAddress={bondingAddress} />
            </div>
            {bondingState && (
              <BondingCurveProgress
                bondingAddress={bondingAddress}
                isFinished={bondingState === 'Finished'}
                removeText={false}
              />
            )}
            <div className='mt-4 text-center'>
              <Link href={`/meme-coins/${bondingAddress}`} passHref>
                <button className='w-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-2 px-4 rounded-md'>
                  Visit Coin Page
                </button>
              </Link>
            </div>
          </div>
        </Html>
      )}
    </motion.group>
  );
}
