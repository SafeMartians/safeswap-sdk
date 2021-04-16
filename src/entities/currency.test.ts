import { Token } from './token';
import { Currency } from './currency';
import { ChainId } from '../types';

describe('currency', () => {
    const BNB_CURRENCY = new Token(ChainId.SMART_CHAIN, '0x0000000000000000000000000000000000000000', 18, 'BNB', 'Binance Coin')

    describe('#ETHs', () => {
        it('BNB for Smart Chain', () => {
            const SMART_CHAIN_ETHER = Currency.getEther(ChainId.SMART_CHAIN)

            expect(SMART_CHAIN_ETHER.decimals)
            .toEqual(BNB_CURRENCY.decimals);

            expect(SMART_CHAIN_ETHER.symbol)
            .toEqual(BNB_CURRENCY.symbol);

            expect(SMART_CHAIN_ETHER.name)
            .toEqual(BNB_CURRENCY.name);
        })
    })
})
