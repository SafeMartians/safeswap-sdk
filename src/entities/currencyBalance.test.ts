import { BigNumber } from 'bignumber.js';
import { Token } from './token';
import { CurrencyBalance } from './currencyBalance';

describe('currencyBalance', () => {
    const ADDRESS_1 = '0x0000000000000000000000000000000000000001';
    const ETH_TOKEN = new Token(1, ADDRESS_1, 18, 'ETH', 'Ether')
    const ETH_BALANCE_1 = new CurrencyBalance(ETH_TOKEN, '123456789123456789123456789');
    const ETH_BALANCE_2 = new CurrencyBalance(ETH_TOKEN, '2003000000000000000000');

    describe('#decimals', () => {
        it('Returns correct balance with decimals', () => {
            expect(ETH_BALANCE_1.toFixed())
            .toEqual('123456789.123456789123456789');

            expect(ETH_BALANCE_2.toFixed())
            .toEqual('2003');
        })

        it('Returns correctly formatted balance', () => {
            expect(ETH_BALANCE_1.toFormat())
            .toEqual('123,456,789.123456789123456789')

            expect(ETH_BALANCE_2.toFormat())
            .toEqual('2,003');
        })
    })
})
