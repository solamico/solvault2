
import { Buffer } from 'buffer';

// Make Buffer available globally for Solana libraries
(window as any).global = window;
(window as any).Buffer = Buffer;
