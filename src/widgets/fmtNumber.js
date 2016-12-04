import { FormattedNumber } from 'react-intl';
import React from 'react';

const FmtNumber = ({ value, options: { style, currency, currencyDisplay, 
            useGrouping, minimumFractionDigits, maximumFractionDigits }}) => {
    return (
    <FormattedNumber
        value={value}
        style={style}
        currency={currency}
        currencyDisplay={currencyDisplay}
        useGrouping={useGrouping}
        minimumFractionDigits={minimumFractionDigits}
        maximumFractionDigits={maximumFractionDigits}
    />
  );
};

export default FmtNumber;
