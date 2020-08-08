import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { updateCalcInput } from '../../../store/actions/calcActions';
import { percentToDecimal } from '../../../helper/math';
import NumberFormat from 'react-number-format';
import { parseQueryString } from '../../../helper/url';
import config from '../../../config/config';
import './DataInput.css';

const DataInput = () => {
    
    const dispatch = useDispatch();

    const urlParams = parseQueryString(window.location.hash, true);
    const ifGiven = (given, def) => (given ? given : def);
    const inputData = {
        inflationControl: ifGiven(urlParams && urlParams.inflationControl, config.defaults.INFLATION_CONTROL),
        inflationValue: ifGiven(urlParams && urlParams.inflationValue, config.defaults.INFLATION_VALUE),
        mortgageRate: ifGiven(urlParams && urlParams.mortgageRate, config.defaults.MORTGAGE_RATE),
        mortgagePeriod: ifGiven(urlParams && urlParams.mortgagePeriod, config.defaults.MORTGAGE_PERIOD),
        assetPrice: ifGiven(urlParams && urlParams.assetPrice, config.defaults.ASSET_PRICE),
        rentPrice: ifGiven(urlParams && urlParams.rentPrice, config.defaults.RENT_PRICE),
        depositRate: ifGiven(urlParams && urlParams.depositRate, config.defaults.DEPOSIT_RATE),
    }

    const [ inflationControl ] = useState(inputData && inputData.inflationControl);
    const [ inflationValue ] = useState(inputData && inputData.inflationValue);
    const [ mortgageRate, setMortgageRate ] = useState(inputData && inputData.mortgageRate);
    const [ mortgagePeriod, setMortgagePeriod ] = useState(inputData && inputData.mortgagePeriod);
    const [ assetPrice, setAssetPrice ] = useState(inputData && inputData.assetPrice);
    const [ rentPrice, setRentPrice ] = useState(inputData && inputData.rentPrice);
    const [ depositRate, setDepositRate ] = useState(inputData && inputData.depositRate);

    const handleRentPriceChange = (newPrice) => {
        setRentPrice(newPrice);
    }

    useEffect(() => {
        const inputData = {
            inflationControl: inflationControl,
            mortgageRate:  percentToDecimal(parseFloat(mortgageRate)),
            mortgagePeriod: parseFloat(mortgagePeriod),
            assetPrice: parseFloat(assetPrice),
            rentPrice: parseFloat(rentPrice),
            depositRate: percentToDecimal(parseFloat(depositRate)),
            inflationValue: parseFloat(inflationValue),
        }
        dispatch(updateCalcInput(inputData));
    }, [
        dispatch, 
        inputData,
        inflationControl, mortgageRate, mortgagePeriod, 
        assetPrice, rentPrice, depositRate, inflationValue,
    ]);

    return (
        <Form>
            <Form.Group widths='equal'>
                <NumberFormat
                    customInput={ Form.Input }
                    fluid 
                    label={ config.labels.MORTGAGE_RATE } 
                    placeholder={ config.labels.MORTGAGE_RATE } 
                    value={ mortgageRate }
                    icon='percent'
                    onValueChange={ values => setMortgageRate(values.floatValue) }
                />
                <NumberFormat
                    customInput={ Form.Input }
                    fluid 
                    label={ config.labels.DEPOSIT_RATE } 
                    placeholder={ config.labels.DEPOSIT_RATE }
                    value={ depositRate }
                    icon='percent'
                    onValueChange={ values => setDepositRate(values.floatValue) }
                />
                <NumberFormat
                    customInput={ Form.Input }
                    fluid 
                    label={ config.labels.MORTGAGE_PERIOD } 
                    placeholder={ config.labels.MORTGAGE_PERIOD }
                    value={ mortgagePeriod }
                    onValueChange={ values => setMortgagePeriod(values.floatValue) }
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <NumberFormat
                    customInput={ Form.Input }
                    fluid 
                    label={ config.labels.ASSET_PRICE } 
                    placeholder={ config.labels.ASSET_PRICE }
                    value={ assetPrice }
                    onValueChange={ values => setAssetPrice(values.floatValue) }
                    thousandSeparator=" "
                />
                <NumberFormat
                    customInput={ Form.Input }
                    fluid 
                    label={ config.labels.RENT_PRICE } 
                    placeholder={ config.labels.RENT_PRICE }
                    value={ rentPrice }
                    thousandSeparator=" "
                    onValueChange={ values => handleRentPriceChange(values.floatValue) }
                />
            </Form.Group>
            <p><i>Вид платежей по ипотеке: аннуитетные</i></p>
            <p><i>Вид процентов по вкладу: ежем. капитализация</i></p>
        </Form>
    )
}

export default DataInput;
