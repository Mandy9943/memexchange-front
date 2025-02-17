import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='bg-[linear-gradient(135deg,_#071001,_#0f2b04)] py-12 md:py-20'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='flex flex-col items-center text-center'>
            <Image
              src='/mxc-logo.webp'
              alt='MemExchange Logo'
              width={120}
              height={120}
              className='mb-6 md:mb-8 w-24 md:w-40'
            />
            <h1 className='text-4xl md:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent'>
              Launch Your Next Meme Coin
            </h1>
            <p className='text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl'>
              Launch and trade meme coins with guaranteed liquidity on{' '}
              <a
                href='https://xexchange.com/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-green-400 hover:text-green-300 underline'
              >
                xExchange
              </a>
              . Zero presale, zero team allocation, 100% community-driven.
            </p>
            <div className='flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto'>
              <Link
                href='/meme-coins'
                className='bg-green-500 hover:bg-green-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-base'
              >
                Trade Meme Coins
              </Link>
              <Link
                href='/create-coin'
                className='bg-white/10 hover:bg-white/20 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-base'
              >
                Launch Coin
              </Link>
            </div>
            {/* Add social links */}
            <div className='flex gap-4 mt-6'>
              <a
                href='https://x.com/mem_exchange'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2'
              >
                <svg viewBox='0 0 24 24' className='h-5 w-5 fill-current'>
                  <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                </svg>
                <span>Twitter</span>
              </a>
              <a
                href='https://t.me/mem_exchange'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2'
              >
                <svg viewBox='0 0 24 24' className='h-5 w-5 fill-current'>
                  <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.29-.48.79-.74 3.08-1.34 5.15-2.23 6.19-2.66 2.95-1.23 3.56-1.44 3.97-1.45.09 0 .28.02.41.12.11.08.18.21.2.34.02.12.02.24.01.36z' />
                </svg>
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-12 md:py-20 bg-neutral-900'>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white'>
            Why Choose MemExchange?
          </h2>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8'>
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.link}
                className='bg-neutral-800 p-4 md:p-6 rounded-lg hover:bg-neutral-700 transition-colors'
              >
                <div className='text-green-400 mb-3 md:mb-4 text-2xl md:text-3xl'>
                  {feature.icon}
                </div>
                <h3 className='text-lg md:text-xl font-semibold mb-2 text-white'>
                  {feature.title}
                </h3>
                <p className='text-gray-400 text-sm md:text-base'>
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className='py-12 md:py-20 bg-neutral-800'>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white'>
            How It Works
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8'>
            {steps.map((step, index) => (
              <div key={index} className='text-center'>
                <div className='w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl mx-auto mb-3 md:mb-4'>
                  {index + 1}
                </div>
                <h3 className='text-base md:text-lg font-semibold mb-2 text-white'>
                  {step.title}
                </h3>
                <p className='text-gray-400 text-sm md:text-base'>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-12 md:py-20 bg-[linear-gradient(135deg,_#071001,_#0f2b04)]'>
        <div className='max-w-6xl mx-auto px-4 text-center'>
          <h2 className='text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white'>
            Ready to Join the Revolution?
          </h2>
          <p className='text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto'>
            Start earning rewards and be part of the next generation of meme
            coins on MultiversX
          </p>
          <Link
            href='/rewards'
            className='bg-green-500 hover:bg-green-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-medium transition-colors inline-block text-sm md:text-base'
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: '🛡️',
    title: 'Fair Launch Guaranteed',
    description:
      'Every token launches with zero presale and zero team allocation. Pure community-driven growth.',
    link: '/create-coin'
  },
  {
    icon: '🔄',
    title: 'Automated Liquidity',
    description:
      'When the pool reaches 25 EGLD (guaranteeing the minimum 20 EGLD required by xExchange), liquidity automatically flows to xExchange for enhanced trading',
    link: 'https://xexchange.com/trade'
  },
  {
    icon: '🎨',
    title: 'MVXBrand Integration',
    description:
      'Brand your tokens with custom images and social links that appear directly on the MultiversX Explorer',
    link: 'https://mvxbrand.fun/'
  }
];

const steps = [
  {
    title: 'Connect Wallet',
    description: 'Link your MultiversX wallet to get started'
  },
  {
    title: 'Create or Trade',
    description: 'Launch your own meme coin or trade from a curated selection'
  },
  {
    title: 'Brand Your Token',
    description:
      'After migration, customize your token with images and social links on MVXBrand'
  },
  {
    title: 'Earn Rewards',
    description:
      'Participate in the ecosystem and earn points through our rewards program'
  }
];
