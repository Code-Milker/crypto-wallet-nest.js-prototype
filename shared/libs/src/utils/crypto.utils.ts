import { Wallet } from "ethers";
import * as crypto from "crypto";

const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY || "supersecretkey32byteslong1234567"; // Set in .env; 32 bytes for AES-256

export function generateWallet(): {
  publicAddress: string;
  privateKey: string;
} {
  const wallet = Wallet.createRandom();
  return { publicAddress: wallet.address, privateKey: wallet.privateKey };
}

export function encryptPrivateKey(privateKey: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv,
  );
  let encrypted = cipher.update(privateKey);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decryptPrivateKey(encryptedKey: string): string {
  const [ivHex, encryptedHex] = encryptedKey.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encryptedText = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv,
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export function signMessage(
  privateKey: string,
  message: string,
): Promise<string> {
  const wallet = new Wallet(privateKey);
  return wallet.signMessage(message);
}
