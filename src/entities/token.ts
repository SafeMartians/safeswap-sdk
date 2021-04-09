import invariant from 'tiny-invariant'
import { ChainId, TokenInfo } from '../types'
import { Currency } from './currency'
import { validateAndChecksumAddress } from '../utils'

export type TokenAddressMap = Readonly<
    { [chainId in ChainId]: Readonly<{ [tokenAddress: string]: WrappedTokenInfo }> }
>

const tokenMapCache: WeakMap<TokenInfo[], TokenAddressMap> =
    typeof WeakMap !== 'undefined' ? new WeakMap<TokenInfo[], TokenAddressMap>() : null

/**
* Represents an ERC20 token with a unique address and some metadata.
*/
export class Token extends Currency {
    public readonly chainId: number
    public readonly address: string

    public constructor(chainId: ChainId | number, address: string, decimals: number, symbol?: string, name?: string) {
        super(decimals, symbol, name)
        this.chainId = chainId
        this.address = validateAndChecksumAddress(address)
    }

    /**
    * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
    * @param other other token to compare
    */
    public equals(otherToken: Token): boolean {
        // short circuit on reference equality
        if (this === otherToken) {
            return true
        }
        return this.chainId === otherToken.chainId && this.address === otherToken.address
    }

    /**
    * Returns true if the address of this token sorts before the address of the other token
    * @param other other token to compare
    * @throws if the tokens have the same address
    * @throws if the tokens are on different chains
    */
    public sortsBefore(other: Token): boolean {
        invariant(this.chainId === other.chainId, 'CHAIN_IDS')
        invariant(this.address !== other.address, 'ADDRESSES')
        return this.address.toLowerCase() < other.address.toLowerCase()
    }
}

export class WrappedTokenInfo extends Token {
    public readonly tokenInfo: TokenInfo

    public constructor(tokenInfo: TokenInfo) {
        super(tokenInfo.chainId, tokenInfo.address, tokenInfo.decimals, tokenInfo.symbol, tokenInfo.name)
        this.tokenInfo = tokenInfo
    }

    public get logoURI(): string {
        return this.tokenInfo.logoURI
    }
}

const EMPTY_TOKEN_ADDRESS_MAP = {
    [ChainId.SMART_CHAIN]: {},
    [ChainId.SMART_CHAIN_TESTNET]: {},
}

export function listToTokenMap(tokenList: TokenInfo[]) {
    const cachedTokenMap = tokenMapCache?.get(tokenList);
    if (cachedTokenMap) return cachedTokenMap;

    const tokenMap = Array.from(tokenList).reduce<TokenAddressMap>(
        (map, tokenInfo) => {
            const token = new WrappedTokenInfo(tokenInfo);

            // remove duplicates tokens
            if (map[token.chainId] && map[token.chainId][token.address] !== undefined) throw Error('Duplicate tokens.')
            return {
                ...map,
                [token.chainId]: {
                    ...map[token.chainId],
                    [token.address]: token
                }
            };
        },
        { ...EMPTY_TOKEN_ADDRESS_MAP }
    );
    tokenMapCache?.set(tokenList, tokenMap);
    return tokenMap;
}
