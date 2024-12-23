export function Footer() {
  return (
    <footer className='bg-neutral-800 border-t border-neutral-700 py-4 mt-8 mb-[90px] max-w-6xl mx-auto w-full'>
      <div className='max-w-6xl mx-auto px-4 flex gap-4 text-neutral-400 text-sm flex-wrap'>
        <a href='#' className='hover:text-neutral-200'>
          Website
        </a>
        <a href='#' className='hover:text-neutral-200'>
          X (Twitter)
        </a>
        <a href='#' className='hover:text-neutral-200'>
          Telegram Channel
        </a>
        <a href='#' className='hover:text-neutral-200'>
          Telegram Group
        </a>
        <a href='#' className='hover:text-neutral-200'>
          Telegram Mini App
        </a>
      </div>
      <div className='max-w-6xl mx-auto px-4 mt-4'>
        <div className='flex items-center justify-center text-neutral-500 text-xs'>
          © {new Date().getFullYear()} AppInCoin. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
