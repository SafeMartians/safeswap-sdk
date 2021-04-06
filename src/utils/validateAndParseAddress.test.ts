import validateAndChecksumAddress from './validateAndChecksumAddress'

describe('#validateAndChecksumAddress', () => {
    it('returns same address if already checksummed', () => {
        expect(validateAndChecksumAddress('0xCa955b10560BC82797077ec25CBBC4Dc52CE5A27'))
        .toEqual('0xCa955b10560BC82797077ec25CBBC4Dc52CE5A27')
    })

    it ('returns checksummed address if not checksummed', () => {
        expect(validateAndChecksumAddress('0xCa955b10560BC82797077ec25CBBC4Dc52CE5A27'.toLowerCase()))
        .toEqual('0xCa955b10560BC82797077ec25CBBC4Dc52CE5A27')
    })

    it ('throws if the address is not valid', () => {
        expect(() => validateAndChecksumAddress('0xCa955b10560BC82797077ec25CBBC4Dc52CE5A2'))
        .toThrow('0xCa955b10560BC82797077ec25CBBC4Dc52CE5A2 is not a valid address.')
    })
})
