import { fetchAxios } from '@/services/rest/backendApi';
import { BondingPair } from '@/types/bondingPairsTypes';
import type { Metadata, ResolvingMetadata } from 'next';
import MemeCoinClientPage from './client-page';
export async function generateMetadata(
  { params }: { params: Promise<{ address: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { address } = await params;
  const bondingPair = await fetchAxios<BondingPair>(
    `/bonding-pairs/${address}`
  );
  const previousImages = (await parent).openGraph?.images || [];

  const coin = bondingPair.coin;
  const title = coin?.name
    ? `${coin.name} | Meme Coin on MultiversX`
    : 'Meme Coin | Meme Exchange';
  const description = coin?.description
    ? coin.description
    : 'Discover the latest meme coins on MultiversX at Meme Exchange!';
  const imageUrl = coin?.imageUrl;
  const url = `https://memexchange.fun/meme-coins/${address}`;

  return {
    title,
    description,
    keywords: [
      coin?.name,
      'meme coin',
      'MultiversX',
      bondingPair.firstToken,
      bondingPair.secondToken,
      'crypto',
      'memecoin',
      'Meme Exchange'
    ]
      .filter(Boolean)
      .join(', '),
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Meme Exchange',
      images: imageUrl ? [imageUrl, ...previousImages] : previousImages
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : []
    },
    alternates: {
      canonical: url
    },
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: coin?.name,
        description: coin?.description,
        image: coin?.imageUrl,
        url,
        brand: {
          '@type': 'Brand',
          name: 'Meme Exchange'
        },
        offers: {
          '@type': 'Offer',
          url,
          availability: 'https://schema.org/InStock'
        }
      })
    }
  };
}

const CoinPage = async () => {
  return <MemeCoinClientPage />;
};

export default CoinPage;
