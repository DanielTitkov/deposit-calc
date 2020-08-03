import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const DataOutput = (props) => {

    const inputData = useSelector(state => state.calc.inputData);

    return (
        <div>
            Data Output
            { JSON.stringify(inputData) }
        </div>
    )
}

export default DataOutput;