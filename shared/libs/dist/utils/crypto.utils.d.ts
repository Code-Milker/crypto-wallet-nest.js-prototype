export declare function generateWallet(): {
    publicAddress: string;
    privateKey: string;
};
export declare function encryptPrivateKey(privateKey: string): string;
export declare function decryptPrivateKey(encryptedKey: string): string;
export declare function signMessage(privateKey: string, message: string): Promise<string>;
