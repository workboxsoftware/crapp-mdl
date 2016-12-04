import { FormattedDate } from 'react-intl';
import React from 'react';

const FmtDate = ({ value,  options: { weekday, year, month, day }}) => {
    return (
    <FormattedDate
        value={value}
        weekday={weekday}
        year={year}
        month={month}
        day={day} 
    />
  );
};

export default FmtDate;
