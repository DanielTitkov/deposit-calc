import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { updateCalcInput } from '../../../store/actions/calcActions';
import { percentToDecimal } from '../../../helper/math';
import NumberFormat from 'react-number-format';
import './DataInput.css';
import { parseQueryString } from '../../../helper/url';

const DataInput = () => {
    
    const dispatch = useDispatch();

    const urlParams = parseQueryString(window.location.hash, true);
    const ifGiven = (given, def) => (given ? given : def);
    const inputData = {
        inflationControl: ifGiven(urlParams && urlParams.inflationControl, false),
        inflationValue: ifGiven(urlParams && urlParams.inflationValue, 0),
        mortgageRate: ifGiven(urlParams && urlParams.mortgageRate, 8),
        mortgagePeriod: ifGiven(urlParams && urlParams.mortgagePeriod, 15),
        assetPrice: ifGiven(urlParams && urlParams.assetPrice, 5000000),
        rentPrice: ifGiven(urlParams && urlParams.rentPrice, 25000),
        rentCoef: ifGiven(urlParams && urlParams.rentCoef, 0.005),
        depositRate: ifGiven(urlParams && urlParams.depositRate, 4),
    }

    // const inflationControlLabel = 'Учитывать инфляцию'
    // const inflationValueLabel = 'Среднегодовая инфляция'
    const mortgageRateLabel = 'Процентная ставка по ипотеке'
    const mortgagePeriodLabel = 'Срок кредитования (лет)'
    const depositRateLabel = 'Процентная ставка по вкладу'
    const assetPriceLabel = 'Цена актива'
    const rentPriceLabel = 'Месяц аренды'
    // const rentCoefLabel = 'Коэффициент стоимости аренды'

    const [ inflationControl ] = useState(inputData && inputData.inflationControl);
    const [ inflationValue ] = useState(inputData && inputData.inflationValue);
    const [ mortgageRate, setMortgageRate ] = useState(inputData && inputData.mortgageRate);
    const [ mortgagePeriod, setMortgagePeriod ] = useState(inputData && inputData.mortgagePeriod);
    const [ assetPrice, setAssetPrice ] = useState(inputData && inputData.assetPrice);
    const [ rentPrice, setRentPrice ] = useState(inputData && inputData.rentPrice);
    const [ rentCoef, setRentCoef ] = useState(inputData && inputData.rentCoef);
    const [ depositRate, setDepositRate ] = useState(inputData && inputData.depositRate);

    const handleRentPriceChange = (newPrice) => {
        setRentPrice(newPrice);
        setRentCoef(newPrice / assetPrice)
    }

    useEffect(() => {
        const inputData = {
            inflationControl: inflationControl,
            mortgageRate:  percentToDecimal(parseFloat(mortgageRate)),
            mortgagePeriod: parseFloat(mortgagePeriod),
            assetPrice: parseFloat(assetPrice),
            rentPrice: parseFloat(rentPrice),
            rentCoef: parseFloat(rentCoef),
            depositRate: percentToDecimal(parseFloat(depositRate)),
            inflationValue: parseFloat(inflationValue),
        }
        dispatch(updateCalcInput(inputData));
    }, [
        dispatch, 
        inputData,
        inflationControl, mortgageRate, mortgagePeriod, assetPrice, 
        rentPrice, rentCoef, depositRate, inflationValue,
    ]);

    return (
        <Form>
            <Form.Group widths='equal'>
                <NumberFormat
                    customInput={ Form.Input }
                    fluid 
                    label={ mortgageRateLabel } 
                    placeholder={ mortgageRateLabel } 
                    value={ mortgageRate }
                    icon='percent'
                    onValueChange={ values => setMortgageRate(values.floatValue) }
                />
                <NumberFormat
                    customInput={ Form.Input }
                    fluid 
                    label={ depositRateLabel } 
                    placeholder={ depositRateLabel }
                    value={ depositRate }
                    icon='percent'
                    onValueChange={ values => setDepositRate(values.floatValue) }
                />
                <NumberFormat
                    customInput={ Form.Input }
                    fluid 
                    label={ mortgagePeriodLabel } 
                    placeholder={ mortgagePeriodLabel }
                    value={ mortgagePeriod }
                    onValueChange={ values => setMortgagePeriod(values.floatValue) }
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <NumberFormat
                    customInput={ Form.Input }
                    fluid 
                    label={ assetPriceLabel } 
                    placeholder={ assetPriceLabel }
                    value={ assetPrice }
                    onValueChange={ values => setAssetPrice(values.floatValue) }
                    thousandSeparator=" "
                />
                <NumberFormat
                    customInput={ Form.Input }
                    fluid 
                    label={ rentPriceLabel } 
                    placeholder={ rentPriceLabel }
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
