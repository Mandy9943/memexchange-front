/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import 'immer';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface StoreState {
  didInit: boolean;
  images: any[] | null;
  layout: string;
  layouts: Record<string, any> | null;
  nodePositions: Record<string, number[]> | null;
  highlightNodes: any[] | null;
  isFetching: boolean;
  isSidebarOpen: boolean;
  xRayMode: boolean;
  targetImage: string | null;
  caption: string | null;
  resetCam: boolean;
}

export default createSelectorFunctions(
  create<StoreState>()(
    immer(() => ({
      didInit: false,
      images: null,
      layout: 'sphere',
      layouts: null,
      nodePositions: null,
      highlightNodes: null,
      isFetching: false,
      isSidebarOpen: false,
      xRayMode: false,
      targetImage: null,
      caption: null,
      resetCam: false
    }))
  )
);
