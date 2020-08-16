import React from 'react'
import NumberFormat from 'react-number-format';

const DataOutputValue = ({ value, format }) => {
    let decimalScale = 0;
    let suffix = ""
    switch (format) {
        case "money":
            decimalScale = 0;
            break;
        case "perc":
            decimalScale = 2;
            suffix = "%";
            value = value * 100
            break;
        case "years":
            decimalScale = 1;
            suffix = "";
            break;
        default:
            decimalScale = 0;
            suffix = "";
    }

    return (
        <NumberFormat
            decimalScale={decimalScale}
            value={value}
            displayType={'text'}
            thousandSeparator=" "
            isNumericString={true}
            suffix={suffix}
        />
    )
}

export default DataOutputValue;
