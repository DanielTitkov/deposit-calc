import React from 'react'
import NumberFormat from 'react-number-format';

const DataOutputValue = ({ value, max, min }) => {
    return (
        <NumberFormat
            decimalScale={2}
            value={value}
            displayType={'text'}
            thousandSeparator=" "
            isNumericString={true}
        />
    )
}

export default DataOutputValue;
