Code Structure:**

```
/app
  |-- layout.tsx
  |-- page.tsx
  |-- globals.css
  |-- components/
      |-- Navbar.tsx
      |-- Footer.tsx
      |-- Leaderboard.tsx
      |-- ActionCards.tsx
      |-- MemeCoins.tsx
```


---

### `/app/layout.tsx`

Make sure you have a global layout with Tailwind set up:

```tsx
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AppInCoin Interface',
  description: 'Copy of the provided interface',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-900 text-white`}>{children}</body>
    </html>
  )
}
```

---

### `/app/page.tsx`

```tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

// Example Data
const topUsers = [
  { rank: 1, address: "EQDZlx...nuyu", points: 97, prize: "1000 AICG ($3.85)" },
  { rank: 2, address: "EQDxBj...keml", points: 85, prize: "800 AICG ($3.08)" },
  { rank: 3, address: "EQCxgy...YuJP", points: 80, prize: "600 AICG ($2.31)" },
  { rank: 4, address: "EQDhwE...VdEP", points: 70, prize: "400 AICG ($1.54)" },
  { rank: 5, address: "EQDeXI...EHvU", points: 65, prize: "200 AICG ($0.77)" },
]

const actions = [
  { title: "Join Telegram Channel", points: 10, status: "Not joined yet" },
  { title: "Join Telegram Chat", points: 10, status: "Not joined yet" },
  { title: "Invite Friends", points: 5, status: "0 friends invited" },
  { title: "Follow X (Twitter) Account", points: 10, status: "Not followed yet" },
  { title: "Retweet Our Post", points: 15, status: "Not retweeted yet" },
  { title: "Post Story", points: 5, status: "Not posted yet" },
  { title: "Buy any AppInCoin Meme coin", points: 10, status: "Not claimed yet" },
  { title: "Sell any AppInCoin Meme coin", points: 10, status: "Not claimed yet" },
  { title: "Launch Any App", points: 5, status: "Not launched yet" },
  { title: "Create New Coin", points: 5, status: "Not created yet" },
]

const memeCoins = [
  { name: "AICG", badge: "TOP MARKET CAP", marketCap: "$3,779", bondingCurve: "2.957%", address: "EQDqDQeR2vqIY-wqDJEihW-Kv2xWEYjajOpZ5GtAvkPxBM3w" },
  { name: "TRGC", marketCap: "$3,358", bondingCurve: "0.772%", address: "EQAt4QbaR51uf1n_LdU6d1M1BvCLXWHxk5Xxp81hpDtxS9v" },
  { name: "BDTTK", marketCap: "$3,262", bondingCurve: "0.274%", address: "EQCSsPx0iC9r3UvV3oxButcnQGSuru7i68khL_SCcLGlM5S6" },
]

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Leaderboard />
          <ActionCards />
          <MemeCoins />
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Navbar() {
  return (
    <div className="flex items-center justify-between px-4 py-4 bg-neutral-800 border-b border-neutral-700">
      <div className="text-white font-semibold text-xl">AppInCoin</div>
      <Button variant="outline" className="border-neutral-700 bg-neutral-900 hover:bg-neutral-800">
        Connect Wallet
      </Button>
    </div>
  )
}

function HeroSection() {
  return (
    <div className="bg-blue-900 py-16 text-center">
      <div className="text-6xl font-bold mb-4">5</div>
      <div className="text-lg mb-4">Claim your Points by <a href="#" className="underline hover:text-blue-200">connecting wallet</a></div>
    </div>
  )
}

function Leaderboard() {
  return (
    <Card className="mt-8 bg-neutral-800 text-white">
      <CardHeader>
        <CardTitle className="text-xl">Top Users</CardTitle>
        <p className="text-sm text-neutral-400">Win prizes every 24h<br/>The winners will receive prizes in <span className="text-green-400">01:30:08</span></p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-neutral-300">Your rank: -</div>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-neutral-700 text-neutral-400">
              <th className="py-2">#</th>
              <th>Address</th>
              <th>Points</th>
              <th>Prize</th>
            </tr>
          </thead>
          <tbody>
            {topUsers.map((user) => (
              <tr key={user.rank} className="border-b border-neutral-700 text-white">
                <td className="py-2">{user.rank}</td>
                <td>{user.address}</td>
                <td>{user.points}</td>
                <td>{user.prize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

function ActionCards() {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, idx) => (
        <Card key={idx} className="bg-neutral-800 border border-neutral-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">{action.title}</CardTitle>
            <p className="text-xs text-neutral-400">{action.status} • {action.points} points</p>
          </CardHeader>
          <CardContent className="pt-0">
            <Button variant="outline" className="w-full border-neutral-700 bg-neutral-900 hover:bg-neutral-800">
              Connect Wallet
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function MemeCoins() {
  return (
    <div className="mt-16">
      <div className="flex items-center mb-4">
        <button className="mr-2 text-sm text-neutral-400 hover:text-neutral-200">{`< Meme Coins`}</button>
        <h2 className="text-2xl font-semibold">Meme Coins</h2>
      </div>
      <p className="text-neutral-400 mb-4">Create your meme coin just for 0.15 TON</p>
      <div className="space-y-4">
        {memeCoins.map((coin, idx) => (
          <Card key={idx} className="bg-neutral-800 border border-neutral-700 p-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold flex items-center gap-2">
                {coin.name}
                {coin.badge && (
                  <span className="text-xs bg-green-600 py-1 px-2 rounded-full">
                    {coin.badge}
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm text-neutral-300">Market Cap: {coin.marketCap}</div>
                <div className="text-sm text-neutral-300">Bonding curve: {coin.bondingCurve}</div>
                <div className="text-xs text-neutral-500 mt-1">{coin.address}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-neutral-800 border-t border-neutral-700 py-4 mt-8">
      <div className="max-w-6xl mx-auto px-4 flex gap-4 text-neutral-400 text-sm flex-wrap">
        <a href="#" className="hover:text-neutral-200">Website</a>
        <a href="#" className="hover:text-neutral-200">X (Twitter)</a>
        <a href="#" className="hover:text-neutral-200">Telegram Channel</a>
        <a href="#" className="hover:text-neutral-200">Telegram Group</a>
        <a href="#" className="hover:text-neutral-200">Telegram Mini App</a>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-4">
        <div className="flex items-center justify-center text-neutral-500 text-xs">
          © {new Date().getFullYear()} AppInCoin. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
```

---

### `globals.css`

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Global styles to closely match the provided interface */

/* Base setup */
html, body {
  @apply bg-neutral-900 text-white font-sans;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Links */
a {
  @apply text-blue-300 underline;
}
a:hover {
  @apply text-blue-200;
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  @apply font-semibold;
}

/* Cards and containers */
.card {
  @apply bg-neutral-800 border border-neutral-700 rounded-md p-4;
}

/* Buttons */
.button {
  @apply inline-flex items-center justify-center border border-neutral-700 bg-neutral-900 text-white rounded-md px-4 py-2 hover:bg-neutral-800;
}

/* Tables */
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  @apply py-2;
}
thead th {
  @apply text-neutral-400;
  border-bottom: 1px solid #3f3f46;
}
tbody tr {
  border-bottom: 1px solid #3f3f46;
}
tbody tr:hover {
  @apply bg-neutral-800;
}

/* Footer links */
footer a {
  @apply text-neutral-400 hover:text-neutral-200;
}

/* Utility classes for sections */
.hero-section {
  @apply bg-blue-900 py-16 text-center;
}

.hero-section .main-number {
  @apply text-6xl font-bold mb-4;
}

.hero-section .subtext {
  @apply text-lg mb-4;
}

.navbar {
  @apply flex items-center justify-between px-4 py-4 bg-neutral-800 border-b border-neutral-700;
}

.footer {
  @apply bg-neutral-800 border-t border-neutral-700 py-4;
}

/* Adjust spacing for layout containers */
.container {
  @apply max-w-6xl mx-auto px-4;
}

/* Leaderboard header */
.leaderboard-header {
  @apply text-xl font-semibold;
}

/* Secondary texts and meta info */
.text-muted {
  @apply text-neutral-400;
}
.text-xs-muted {
  @apply text-neutral-500 text-xs;
}