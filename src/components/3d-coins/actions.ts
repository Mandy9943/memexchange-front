/* eslint-disable */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BondingPair } from '@/types/bondingPairsTypes';
import useStore from './store';

// @ts-ignore - immer handles this properly
const { getState, setState: set } = useStore;

// Define a more specific type for our gallery images
interface GalleryImage extends Record<string, any> {
  id: string; // From meta.json
  url: string; // From BondingPair.coin.imageUrl
  name: string; // From BondingPair.coin.name
  description: string; // From BondingPair.coin.description
  bondingAddress: string; // From BondingPair.address
  bondingState: string; // From BondingPair.state
  coinData: BondingPair; // Full bonding pair data
}

interface CoinImage {
  id: string;
  url: string;
  description: string;
  name: string;
  bondingAddress: string;
  bondingState: string;
  coinData: BondingPair;
}

export const init = async () => {
  if (getState().didInit) {
    return;
  }

  // @ts-ignore - immer handles this properly
  set((state) => {
    state.didInit = true;
  });

  const [imagesMeta, sphere, umapGrid] = await Promise.all(
    ['meta', 'sphere', 'umap-grid'].map((path) =>
      fetch(path + '.json').then((res) => res.json())
    )
  );

  // Fetch coin data from your API
  const bondingPairsResponse = await fetch(
    'https://api.memexchange.fun/api/bonding-pairs?limit=2000&offset=0'
  );
  const bondingPairsData = await bondingPairsResponse.json();
  const fetchedCoins: BondingPair[] = bondingPairsData.items;

  // Map fetchedCoins to the structure needed by the gallery
  // Ensuring we use the id from imagesMeta and data from fetchedCoins
  const galleryImages: GalleryImage[] = imagesMeta
    .map((metaImage: { id: string }, index: number) => {
      // Find a corresponding coin. This assumes a 1:1 mapping based on order,
      // which might need to be more robust if lengths can differ or if there's no direct match.
      // For now, if we run out of fetchedCoins, we'll skip creating gallery items.
      const bondingPair = fetchedCoins[index];

      if (!bondingPair || !bondingPair.coin) {
        // If no corresponding coin or coin data, or if crucial data is missing, skip this item.
        // console.warn(`Skipping image ${metaImage.id} due to missing bonding pair or coin data.`);
        return null;
      }

      return {
        id: metaImage.id, // Preserve original ID from meta.json
        url: bondingPair.coin.imageUrl,
        name: bondingPair.coin.name,
        description: bondingPair.coin.description,
        bondingAddress: bondingPair.address,
        bondingState: bondingPair.state,
        coinData: bondingPair // Store the full bonding pair data
      };
    })
    .filter(
      (image: GalleryImage | null): image is GalleryImage => image !== null
    ) // Explicitly type image here
    .slice(0, imagesMeta.length - 1); // Original slice logic
  console.log(galleryImages);
  // @ts-ignore - immer handles this properly
  set((state) => {
    state.images = galleryImages as any; // Cast to any for now, store expects any[]
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
      imagesMeta.map((img: any) => [img.id, [0.5, 0.5, 0.5]])
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

export const fetchNext = async () => {
  // @ts-ignore - immer handles this properly
  set(async (state) => {
    state.isFetching = true;

    const currentCaption = getState().caption || ''; // Ensure caption is a string
    const result = await fetch(
      `https://labs.perplexity.ai/api/search?model=online&query=${encodeURIComponent(
        currentCaption
      )}`
    ).then((r) => r.json());

    // @ts-ignore - immer handles this properly
    state.targetImage = result.data[0].url;
    state.highlightNodes = result.data.map((d: any) => d.node);
    state.resetCam = false;
  });
};

export const clearQuery = () =>
  // @ts-ignore - immer handles this properly
  set((state) => {
    state.highlightNodes = null;
    state.caption = null;
    state.targetImage = null; // also clear target image
    state.resetCam = true; // and reset camera
  });

export const setXRayMode = (xRayMode: boolean) =>
  // @ts-ignore - immer handles this properly
  set((state) => {
    state.xRayMode = xRayMode;
  });

export const setTargetImage = async (targetImage: string | null) => {
  if (targetImage === getState().targetImage) {
    targetImage = null;
  }

  // @ts-ignore - immer handles this properly
  set((state) => {
    state.targetImage = targetImage;
    state.isFetching = !!targetImage;
    state.highlightNodes = null;
    // Close sidebar when targeting an image (when zooming in on a coin)
    if (targetImage) {
      state.isSidebarOpen = false;
    }
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

// Search actions
export const setSearchQuery = (query: string) =>
  // @ts-ignore - immer handles this properly
  set((state) => {
    state.searchQuery = query;
  });

export const setSearchType = (type: 'all' | 'name' | 'address') =>
  // @ts-ignore - immer handles this properly
  set((state) => {
    state.searchType = type;
  });

export const performSearch = (
  query: string,
  searchType: 'all' | 'name' | 'address' = 'all'
) => {
  // @ts-ignore - immer handles this properly
  set((state) => {
    state.searchQuery = query;
    state.searchType = searchType;

    if (!query.trim()) {
      state.searchResults = null;
      state.isSearchActive = false;
      state.highlightNodes = null;
      return;
    }

    const images = getState().images;
    if (!images) return;

    const searchTerm = query.toLowerCase().trim();
    const filteredImages = images.filter((image: any) => {
      switch (searchType) {
        case 'name':
          return (
            image.name?.toLowerCase().includes(searchTerm) ||
            image.coinData?.coin?.name?.toLowerCase().includes(searchTerm)
          );
        case 'address':
          return (
            image.bondingAddress?.toLowerCase().includes(searchTerm) ||
            image.coinData?.address?.toLowerCase().includes(searchTerm)
          );
        case 'all':
        default:
          return (
            image.name?.toLowerCase().includes(searchTerm) ||
            image.coinData?.coin?.name?.toLowerCase().includes(searchTerm) ||
            image.bondingAddress?.toLowerCase().includes(searchTerm) ||
            image.coinData?.address?.toLowerCase().includes(searchTerm) ||
            image.description?.toLowerCase().includes(searchTerm) ||
            image.coinData?.coin?.description
              ?.toLowerCase()
              .includes(searchTerm)
          );
      }
    });

    state.searchResults = filteredImages;
    state.isSearchActive = true;
    state.highlightNodes = filteredImages.map((img: any) => img.id);
  });
};

export const clearSearch = () =>
  // @ts-ignore - immer handles this properly
  set((state) => {
    state.searchQuery = '';
    state.searchResults = null;
    state.isSearchActive = false;
    state.highlightNodes = null;
    state.targetImage = null;
    state.resetCam = true;
  });

export const selectSearchResult = (imageId: string) => {
  setTargetImage(imageId);
  // @ts-ignore - immer handles this properly
  set((state) => {
    state.isSidebarOpen = false;
  });
};

init();
