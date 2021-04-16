import invariant from 'tiny-invariant';
import { ChainId } from '../types';

/**
* A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
*
* The only instance of the base class `Currency` is Ether.
*/
export class Currency {
    public readonly decimals: number
    public readonly symbol?: string
    public readonly name?: string

    private static readonly ETHERS: {[chainId: number]: Currency} = {
        [ChainId.SMART_CHAIN]: new Currency(18, 'BNB', 'Binance Coin'),
        [ChainId.SMART_CHAIN_TESTNET]: new Currency(18, 'BNB', 'Binance Coin')
    }

    /**
    * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
    * @param decimals decimals of the currency
    * @param symbol symbol of the currency
    * @param name of the currency
    */
    protected constructor(decimals: number, symbol?: string, name?: string) {
        invariant(decimals < 255, 'DECIMALS')

        this.decimals = decimals
        this.symbol = symbol
        this.name = name
    }

    public static getEther(chainId: ChainId | number): Currency | undefined {
        return this.ETHERS[chainId];
    }
}
