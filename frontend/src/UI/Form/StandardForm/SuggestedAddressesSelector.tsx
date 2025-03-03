import { AddressType } from "type/formTypes"
import { SelectField } from "../FormField/SelectField";
import { createExcerpt } from "functions/stringHelpers/excerptMaker";
import { useTranslation } from "react-i18next";
import { resolveUniqueString } from "functions/stringHelpers/uniqueStringResolver";

type Props = {
    suggestedAddresses: AddressType[],
    validation: any,
};

export const SuggestedAddressesSelector = ({
    suggestedAddresses,
    validation,
}: Props) => {
    const {t} = useTranslation();

    const handleChange = (optionValue: string | number) => {
        const address = suggestedAddresses.find((address: AddressType) => address['@id'] === optionValue);
        if(!address) {
            return;
        }

        validation.setFieldValue('name', address.name);
        validation.setFieldValue('firstLine', address.firstLine);
        validation.setFieldValue('secondLine', address.secondLine);
        validation.setFieldValue('thirdLine', address.thirdLine);
        validation.setFieldValue('zip', address.zip);
        validation.setFieldValue('city', address.city);
        validation.setFieldValue('country', address.country);
        validation.setFieldValue('phoneNumber', address.phoneNumber);
        validation.setFieldValue('mobileNumber', address.mobileNumber);
    }

    let choices: {[key: string]: any} = {};
    for(const address of suggestedAddresses) {
        let label = '';
        if(address.name && address.name !== '' && address.name !== ' ') {
            label += address.name + ' - ';
        }

        label += createExcerpt(address.firstLine, 20) + ' ' + address.zip + ' ' + address.city;
        if(choices[label]) {
            const uniqueLabel = resolveUniqueString(label, Object.keys(choices));
            choices[uniqueLabel] = address['@id'];
        } else {
            choices[label] = address['@id'];
        }
    }

    return (
        <SelectField
            choices={choices}
            name="address-suggests"
            onChange={handleChange}
            placeholder={t('stored_addresses')}
        />
    )
}
