/* eslint-disable */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import useStore from './store';

const get = useStore.getState;
const set = useStore.setState;

interface CoinImage {
  id: string;
  url: string;
  description: string;
}

interface BondingPair {
  coin: {
    imageUrl: string;
    description: string;
  };
}

export const init = async () => {
  if (get().didInit) {
    return;
  }

  // @ts-ignore - immer handles this properly
  set((state) => {
    state.didInit = true;
  });

  const [images, sphere, umapGrid] = await Promise.all(
    ['meta', 'sphere', 'umap-grid'].map((path) =>
      fetch(path + '.json').then((res) => res.json())
    )
  );

  const coins = await fetch(
    'https://api.memexchange.fun/api/bonding-pairs?limit=2000&offset=0'
  ).then((res) => res.json());
  const coinImages: CoinImage[] = coins.items.map(
    (coin: BondingPair, index: number) => ({
      id: images[index].id,
      url: coin.coin.imageUrl,
      description: coin.coin.description
    })
  );

  const imagesData = coinImages.slice(0, coinImages.length - 1);
  // @ts-ignore - immer handles this properly
  set((state) => {
    state.images = imagesData as any;
    state.layouts = {
      sphere,
      grid: Object.fromEntries(
        Object.entries(umapGrid).map(([k, coords]) => [
          k,
          Array.isArray(coords) && coords.length >= 2
            ? [coords[0], coords[1] / (16 / 9) + 0.25]
            : [0, 0]
        ])
      )
    } as any;
    state.nodePositions = Object.fromEntries(
      images.map((img: any) => [img.id, [0.5, 0.5, 0.5]])
    ) as any;
  });

  setLayout('sphere');
};

export const setLayout = (layout: string) =>
  // @ts-ignore - immer handles this properly
  set((state) => {
    state.layout = layout;
    if (state.layouts && state.layouts[layout]) {
      state.nodePositions = state.layouts[layout];
    }
  });

export const setSphereLayout = (positions: Record<string, number[]>) =>
  // @ts-ignore - immer handles this properly
  set((state) => {
    if (state.layouts) {
      (state.layouts as any).sphere = positions;
    }
  });

export const sendQuery = async (query: string) => {
  // @ts-ignore - immer handles this properly
  set((state) => {
    state.isFetching = true;
    state.targetImage = null;
    state.resetCam = true;
    state.caption = null;
  });
};

export const clearQuery = () =>
  // @ts-ignore - immer handles this properly
  set((state) => {
    state.highlightNodes = null;
    state.caption = null;
    state.targetImage = null;
  });

export const setXRayMode = (xRayMode: boolean) =>
  // @ts-ignore - immer handles this properly
  set((state) => {
    state.xRayMode = xRayMode;
  });

export const setTargetImage = async (targetImage: string | null) => {
  if (targetImage === get().targetImage) {
    targetImage = null;
  }

  // @ts-ignore - immer handles this properly
  set((state) => {
    state.targetImage = targetImage;
    state.isFetching = !!targetImage;
    state.highlightNodes = null;
  });

  if (!targetImage) {
    return;
  }

  // @ts-ignore - immer handles this properly
  set((state) => {
    state.isFetching = false;
  });
};

export const toggleSidebar = () =>
  // @ts-ignore - immer handles this properly
  set((state) => {
    state.isSidebarOpen = !state.isSidebarOpen;
  });

export const setSidebarOpen = (isOpen: boolean) =>
  // @ts-ignore - immer handles this properly
  set((state) => {
    state.isSidebarOpen = isOpen;
  });

init();
