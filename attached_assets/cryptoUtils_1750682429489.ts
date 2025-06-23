
import { Buffer } from 'buffer';

export interface EncryptedData {
  encryptedData: string;
  iv: string;
  salt: string;
}

// Generate a key from password using PBKDF2
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptPrivateKey(privateKey: string, password: string): Promise<EncryptedData> {
  const encoder = new TextEncoder();
  const data = encoder.encode(privateKey);
  
  // Generate random salt and IV
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  
  // Derive key from password
  const key = await deriveKey(password, salt);
  
  // Encrypt the private key
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );
  
  return {
    encryptedData: Buffer.from(encryptedBuffer).toString('base64'),
    iv: Buffer.from(iv).toString('base64'),
    salt: Buffer.from(salt).toString('base64'),
  };
}

export async function decryptPrivateKey(
  encryptedData: EncryptedData,
  password: string
): Promise<string> {
  const { encryptedData: encrypted, iv: ivBase64, salt: saltBase64 } = encryptedData;
  
  // Convert from base64
  const encryptedBuffer = Buffer.from(encrypted, 'base64');
  const iv = new Uint8Array(Buffer.from(ivBase64, 'base64'));
  const salt = new Uint8Array(Buffer.from(saltBase64, 'base64'));
  
  // Derive key from password
  const key = await deriveKey(password, salt);
  
  // Decrypt the data
  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encryptedBuffer
  );
  
  const decoder = new TextDecoder();
  return decoder.decode(decryptedBuffer);
}

export function generateSecurePassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 16; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export function clearSensitiveData(obj: any) {
  if (typeof obj === 'string') {
    // Overwrite string with random data
    return crypto.getRandomValues(new Uint8Array(obj.length)).toString();
  }
  if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      if (key.includes('private') || key.includes('secret') || key.includes('key')) {
        obj[key] = crypto.getRandomValues(new Uint8Array(32)).toString();
      }
    });
  }
}
