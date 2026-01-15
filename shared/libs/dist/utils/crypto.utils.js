"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWallet = generateWallet;
exports.encryptPrivateKey = encryptPrivateKey;
exports.decryptPrivateKey = decryptPrivateKey;
exports.signMessage = signMessage;
const ethers_1 = require("ethers");
const crypto = require("crypto");
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "supersecretkey32byteslong1234567";
function generateWallet() {
    const wallet = ethers_1.Wallet.createRandom();
    return { publicAddress: wallet.address, privateKey: wallet.privateKey };
}
function encryptPrivateKey(privateKey) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(privateKey);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
}
function decryptPrivateKey(encryptedKey) {
    const [ivHex, encryptedHex] = encryptedKey.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encryptedText = Buffer.from(encryptedHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
function signMessage(privateKey, message) {
    const wallet = new ethers_1.Wallet(privateKey);
    return wallet.signMessage(message);
}
//# sourceMappingURL=crypto.utils.js.map