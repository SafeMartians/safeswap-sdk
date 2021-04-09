export enum ChainId {
    SMART_CHAIN = 56,
    SMART_CHAIN_TESTNET = 97
}

export interface TokenInfo {
    readonly chainId: number;
    readonly address: string;
    readonly name: string;
    readonly decimals: number;
    readonly symbol: string;
    readonly logoURI?: string;
}
