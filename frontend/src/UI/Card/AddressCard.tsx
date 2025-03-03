import { createExcerpt } from "functions/stringHelpers/excerptMaker";
import { AddressType } from "type/formTypes"

type Props = {
    address?: AddressType,
    className?: string
};

export const AddressCard = ({
    address,
    className
}: Props) => {
    if(!address) {
        return '';
    }

    return (
        <div className={className || ''} style={{display: 'flex', gap: '5px', alignItems: 'center', minHeight: '130px'}}>
            <i className="ri-map-pin-2-fill ri-xl text-secondary" style={{alignSelf: 'center'}}></i>
            <div className="ms-2" style={{alignSelf: 'center'}}>
                <div>{address.name}</div>
                <div>{address.firstLine}</div>
                {
                    address?.secondLine && (
                        <div>{address.secondLine}</div>
                    )
                }
                {
                    address?.thirdLine && (
                        <div>{address.thirdLine}</div>
                    )
                }
                <div>{address.zip} {address.city}</div>
                {
                    address.country && (
                        <div>{address.country.name} ({address.country.iso2})</div> 
                    )
                }
                {
                    address?.phoneNumber && (
                        <div>
                            <i className="ri ri-phone-line"></i>{' '}
                            {address.phoneNumber}
                        </div>
                    )
                }
                {
                    address?.mobileNumber && (
                        <div>
                            <i className="ri ri-smartphone-line"></i>{' '}
                            {address.mobileNumber}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export const AddressCell = ({
    address,
    className
}: Props) => {
    if(!address) {
        return '';
    }

    const streetLine = (address.firstLine ?? '') + (address.secondLine ? ' ' + address.secondLine: '');

    const cityLine =  (address.zip ?? '') + ' ' + ' ' + createExcerpt(address.city ?? '', 10) + (address.country ? ' (' + address.country.iso2 + ')': '');

    return (
        <div className={className || ''}>
            <div>
                {
                    createExcerpt(streetLine ?? '', 20)
                }
            </div>
            <div>
                {cityLine}
            </div>
        </div>
    )
}
