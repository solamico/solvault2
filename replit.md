# Solana Pro Suite - Token Creator & Multi-Wallet Manager

## Overview
This is a professional Solana toolkit built with React and TypeScript that provides SPL token creation capabilities and advanced multi-wallet management features. The application operates on the Solana blockchain with a focus on the devnet environment for testing and development.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **UI Library**: Shadcn/ui components built on Radix UI primitives for accessible and customizable interfaces
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for consistent theming
- **State Management**: React hooks and context for local state management
- **Routing**: React Router for client-side navigation

### Backend Architecture
- **Blockchain Integration**: Direct interaction with Solana blockchain through RPC connections
- **No Traditional Backend**: The application is a pure frontend application that communicates directly with Solana nodes
- **Network Configuration**: Currently configured for Solana Devnet with capability to switch networks

## Key Components

### 1. Wallet Management System
- **Wallet Connection**: Integration with Solana wallet adapters (Phantom, etc.)
- **Multi-Wallet Generation**: Create and manage multiple wallets programmatically
- **Encrypted Storage**: Client-side wallet encryption using Web Crypto API with PBKDF2 key derivation
- **Import/Export**: Secure wallet backup and restoration functionality

### 2. Token Creation Engine
- **SPL Token Creation**: Full SPL token minting capabilities with customizable parameters
- **Metadata Management**: Token name, symbol, decimals, and supply configuration
- **Authority Management**: Options to revoke mint and freeze authorities for token finalization
- **Multi-step Process**: Guided token creation with progress tracking

### 3. Trading Integration
- **Jupiter Protocol Integration**: DEX aggregator for token swapping
- **Automated Trading**: Scheduled and recurring trade execution across multiple wallets
- **Balance Management**: Real-time SOL and token balance tracking
- **Slippage Control**: Configurable slippage tolerance for trades

### 4. Security Features
- **Client-side Encryption**: All sensitive data encrypted using AES-GCM with random salts
- **Password Protection**: Master password system for wallet access
- **Memory Cleanup**: Automatic clearing of sensitive data from memory
- **Secure Key Generation**: Cryptographically secure random key generation

## Data Flow

### Token Creation Flow
1. User inputs token parameters through the UI
2. System generates new mint keypair
3. Transaction constructed with mint initialization instructions
4. User signs transaction through connected wallet
5. Token created on Solana blockchain
6. Associated token account created and initial supply minted

### Trading Flow
1. User selects tokens and trading parameters
2. Jupiter API queried for optimal swap routes
3. Swap transaction constructed with Jupiter's routing
4. Transaction signed and executed on blockchain
5. Balance updates reflected in UI

### Wallet Management Flow
1. New wallets generated using Solana's Keypair.generate()
2. Private keys encrypted with user-provided password
3. Encrypted wallets stored in browser localStorage
4. Decryption on demand for transaction signing

## External Dependencies

### Solana Ecosystem
- **@solana/web3.js**: Core Solana blockchain interaction
- **@solana/spl-token**: SPL token program interactions
- **@solana/wallet-adapter-***: Wallet connection and management
- **Jupiter API**: DEX aggregation for token swapping (quote-api.jup.ag)

### UI and Utilities
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Class Variance Authority**: Component variant management
- **React Hook Form**: Form state management with validation
- **Zod**: Runtime type validation for API responses

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and enhanced developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint**: Code linting and quality enforcement

## Deployment Strategy

### Build Configuration
- **Production Build**: `npm run build` creates optimized production bundle
- **Development Build**: `npm run build:dev` creates development build with source maps
- **Static Hosting**: Application can be deployed to any static hosting service (Vercel, Netlify, etc.)

### Environment Configuration
- **Network Selection**: Configurable Solana network endpoints (devnet/testnet/mainnet)
- **API Endpoints**: Jupiter API integration with fallback handling
- **RPC Configuration**: Custom RPC endpoint support for performance optimization

### Browser Compatibility
- **Modern Browsers**: Targets ES2020 with modern JavaScript features
- **Web Crypto API**: Requires browsers with full Web Crypto API support
- **Local Storage**: Utilizes browser localStorage for encrypted wallet persistence

## Recent Changes
- June 23, 2025: Complete application infrastructure built with React + TypeScript + Vite + Tailwind CSS
- June 23, 2025: Implemented comprehensive UI component suite (30+ Shadcn components)
- June 23, 2025: Created core features: WalletManager, TokenCreator, TokenTrading, JitoBundleManager, LiquidityPoolManager
- June 23, 2025: Added Jito bundle integration for MEV protection and atomic transaction execution
- June 23, 2025: Professional dark theme with Solana branding (#9945FF purple, #14F195 green)
- June 23, 2025: Application running successfully with modern tabbed interface and comprehensive DeFi features
- June 23, 2025: Implemented Advanced Jito Bundle Automation Dashboard with sophisticated job management, automation rules, real-time analytics, and comprehensive MEV protection controls

## Changelog
- June 23, 2025: Initial setup and complete application development

## User Preferences
Preferred communication style: Simple, everyday language.