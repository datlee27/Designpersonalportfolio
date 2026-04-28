import { HTMLAttributes, ReactNode } from 'react';
import { Scroll3DDepth, Scroll3DScene, Scroll3DSide, Scroll3DStrength, useScroll3D } from '../hooks/useScroll3D';

interface Scroll3DLayerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  side?: Scroll3DSide;
  scene?: Scroll3DScene;
  depth?: Scroll3DDepth;
  strength?: Scroll3DStrength;
  surfaceClassName?: string;
}

export function Scroll3DLayer({
  children,
  className = '',
  side = 'center',
  scene,
  depth = 2,
  strength = 'medium',
  surfaceClassName = '',
  ...props
}: Scroll3DLayerProps) {
  const ref = useScroll3D<HTMLDivElement>({ side, scene, depth, strength });

  return (
    <div
      ref={ref}
      data-depth={depth}
      data-scene={scene ?? `legacy-${strength}`}
      className={`archive-3d-layer ${className}`.trim()}
      {...props}
    >
      <div className={`archive-3d-surface archive-depth-${depth} ${surfaceClassName}`.trim()}>
        {children}
      </div>
    </div>
  );
}
