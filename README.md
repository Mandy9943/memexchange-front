# MemExchange - MultiversX Meme Coin Trading Platform

## Overview

MemExchange is a decentralized platform built on the MultiversX blockchain, designed for launching and trading meme coins. It incorporates bonding curve mechanics for automated liquidity, seamless DEX integration with xExchange, and a user-friendly interface. The platform offers a rewards system, token creation tools, and a community-driven approach to meme coin trading.

## Links
- GitHub: [https://github.com/Mandy9943/memexchange-front](https://github.com/Mandy9943/memexchange-front)
- Twitter: [https://x.com/mem_exchange](https://x.com/mem_exchange)
- Telegram: [https://t.me/mem_exchange](https://t.me/mem_exchange)

## Features

- **Meme Coin Creation:** Launch your own meme coin with a few clicks, paying a small fee (0.1 EGLD). Customize your coin with a name, ticker, description, and image.
- **Automated Liquidity:** Tokens are designed for easy liquidity bootstrapping using a bonding curve, allowing liquidity to automatically flow to xExchange when the pool reaches 25 EGLD.
- **Trading Platform:** Buy and sell meme coins directly on MemExchange, with real-time charts and trading capabilities.
- **Rewards System:** Earn points by completing tasks such as connecting your wallet, creating a meme coin, or buying meme coins. Climb the leaderboard and win weekly prizes.
- **User Profiles:** Track your achievements, manage your tokens.
- **MVXBrand Integration:** Brand your tokens with custom images and social links that appear directly on the MultiversX Explorer.

- **Wallet Integration:** Seamlessly connect with Defi Wallet, Wallet Connect, or xPortal App.
- **Mobile-Friendly Design:** Responsive design for optimal use on various devices.

## Tech Stack

- **Next.js:** React framework for building the user interface and server-side rendering
- **TypeScript:** Programming language for type safety and improved code quality
- **Tailwind CSS:** Utility-first CSS framework for styling
- **MultiversX SDK:** For blockchain interactions and wallet integration
- **Redux Toolkit:** State management library
- **UploadThing:** File uploading service
- **SWR:** React Hooks library for data fetching
- **TradingView Charting Library:** For displaying interactive charts
- **Axios:** For making HTTP requests
- **Js-cookie:** Used for storing authentication data
- **Zod:** Schema declaration and validation library
- **@hookform/resolvers/zod:** Integration of Zod with React Hook Form
- **react-hot-toast:** Displaying notifications

## Directory Structure
```
├── actions/          # Server actions for handling cookies and authentication
├── adapters/         # Adapters for transforming data from smart contracts
├── app/              # Next.js application structure
│   ├── admin/        # Admin dashboard pages
│   ├── api/          # API routes
│   ├── create-coin/  # Meme coin creation page
│   ├── meme-coins/   # Meme coin listing and trading pages
│   ├── profile/      # User profile pages
│   └── rewards/      # Rewards page
├── components/       # Reusable React components
├── config/          # Configuration files
├── contracts/       # Smart contract ABI definitions
├── helpers/         # Utility functions
├── hooks/           # Custom React hooks
├── lib/             # Utility library
├── localConstants/  # Local constants
├── redux/           # Redux store and slices
├── routes/          # Route definitions
├── services/        # Services for backend and blockchain
├── styles/          # Global CSS styles
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── wrappers/        # Page wrappers
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MultiversX Wallet

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Mandy9943/memexchange-front.git
cd memexchange-front
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

### Configuration

1. Configure the environment variables:
   - Create a `.env.local` file in the root directory
   - Add the required environment variables based on `.env.example`

2. Select the appropriate network configuration:
   - Modify the `config/index.ts` file for your chosen network (devnet, testnet, or mainnet)

### Running the Application

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Open your browser and navigate to `http://localhost:3000`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Implement your changes
4. Test your changes thoroughly
5. Submit a pull request

## License

This project is licensed under the [MIT License](LICENSE).