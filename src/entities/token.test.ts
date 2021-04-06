import Token from './token'
import { ChainId } from '../types'

describe('Token', () => {
    const ADDRESS_1 = '0x0000000000000000000000000000000000000001'
    const ADDRESS_2 = '0x0000000000000000000000000000000000000002'

    describe('#equals', () => {
        it('Fails if addresses differ', () => {
            expect(new Token(ChainId.SMART_CHAIN, ADDRESS_1, 18).equals(new Token(ChainId.SMART_CHAIN, ADDRESS_2, 18)))
            .toBe(false)
        })

        it('Fails if chains differ', () => {
            expect(new Token(ChainId.SMART_CHAIN_TESTNET, ADDRESS_1, 18).equals(new Token(ChainId.SMART_CHAIN, ADDRESS_1, 18)))
            .toBe(false)
        })

        it('Succeed if token are identicals', () => {
            expect(new Token(ChainId.SMART_CHAIN, ADDRESS_1, 18).equals(new Token(ChainId.SMART_CHAIN, ADDRESS_1, 18)))
            .toBe(true)
        })

        it('Succeed if the decimals, symbols and names differs', () => {
            const TOKEN_1 = new Token(ChainId.SMART_CHAIN, ADDRESS_1, 18, 'TEST', 'Test Token')
            const TOKEN_2 = new Token(ChainId.SMART_CHAIN, ADDRESS_1, 8, 'TEST_2', 'Second Test Token')

            expect(TOKEN_1.equals(TOKEN_2))
            .toBe(true)
        })
    })
})
