import { NextRequest, NextResponse, userAgent } from 'next/server';

export function middleware(request: NextRequest) {
  const { device } = userAgent(request);

  // device.type can be: 'mobile', 'tablet', 'console', 'smarttv',
  // 'wearable', 'embedded', or undefined (for desktop browsers)
  const viewport = device.type || 'desktop';
  console.log(request.url);

  if (request.url.endsWith('/meme-coins') && viewport === 'mobile') {
    return NextResponse.rewrite(new URL('/legacy-coins', request.url));
  }

  return NextResponse.next();
}
