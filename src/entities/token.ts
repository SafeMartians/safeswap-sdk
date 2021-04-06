import invariant from 'tiny-invariant'
import { ChainId } from '../types'
import Currency from './currency'
import { validateAndChecksumAddress } from '../utils'

/**
* Represents an ERC20 token with a unique address and some metadata.
*/
export default class Token extends Currency {
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
