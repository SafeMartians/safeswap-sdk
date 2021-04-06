import { getAddress } from '@ethersproject/address'
import invariant from 'tiny-invariant'

export default function validateAndChecksumAddress(address: string): string {
    try {
        const checksummedAddress = getAddress(address)
        return checksummedAddress
    } catch(error) {
        invariant(false, `${address} is not a valid address.`)
        return null
    }
}
