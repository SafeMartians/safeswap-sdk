import BigNumber from 'bignumber.js';
import { Currency } from './currency';

export class CurrencyBalance {
    private readonly decimals: BigNumber;
    private readonly balance: BigNumber;

    public constructor(currency: Currency, balance: string) {
        this.decimals = new BigNumber(currency.decimals);
        this.balance = new BigNumber(balance);
    }

    public value(): BigNumber {
        const exp = new BigNumber(10).pow(this.decimals);

        return this.balance.dividedBy(exp);
    }

    public toFixed(): string {
        return this.value().toFixed();
    }

    public toFormat(): string {
        return this.value().toFormat();
    }
}
