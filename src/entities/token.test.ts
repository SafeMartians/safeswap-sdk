import { Token, listToTokenMap } from './token'
import { ChainId, TokenInfo } from '../types'

describe('Token', () => {
    const ADDRESS_1 = '0x0000000000000000000000000000000000000001'
    const ADDRESS_2 = '0x0000000000000000000000000000000000000002'
    const {
        SMART_CHAIN_TOKEN_LIST,
        SMART_CHAIN_TESTNET_TOKEN_LIST,
        DUPLICATES_TOKEN_LIST
    } = require('../tests/tokenLists')

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

    describe('#tokenAddressMap', () => {
        it('Map TokenList', () => {
            const tokenAddressMap = listToTokenMap([...SMART_CHAIN_TOKEN_LIST, ...SMART_CHAIN_TESTNET_TOKEN_LIST]);

            expect(tokenAddressMap[ChainId.SMART_CHAIN]['0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'].symbol)
            .toEqual('BUSD');

            expect(tokenAddressMap[ChainId.SMART_CHAIN_TESTNET]['0xDe9990024c75DCb5d3e88bBC0A5c8Dc236339F52'].name)
            .toEqual('NegativeHoro');
        })

        it('Map empty TokenList', () => {
            expect(listToTokenMap([]))
            .toEqual({[ChainId.SMART_CHAIN]: {}, [ChainId.SMART_CHAIN_TESTNET]: {}});
        })

        it('Map TokenList with duplicates', () => {
            expect(() => listToTokenMap(DUPLICATES_TOKEN_LIST))
            .toThrow('Duplicate tokens.')
        })
    })
})
