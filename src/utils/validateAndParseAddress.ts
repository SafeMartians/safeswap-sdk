import { getAddress }'@ethersproject/address'
import invariant from 'tiny-invariant'
import warning from 'tiny-warning'

export default function validateAndChecksumAddress(address: string): string {
    try {
        const checksummedAddress = getAddress(address)
        warning(address === checksummedAddress, `${address} did not get checksummed.`)
        return checksummedAddress
    } catch(error) {
        invariant(false, `${address} is not a valid address.`)
        return null
    }
}
