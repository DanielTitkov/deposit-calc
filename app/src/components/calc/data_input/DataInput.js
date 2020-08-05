import React, { useState, useEffect } from 'react';
import { Form, Header } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { updateCalcInput } from '../../../store/actions/calcActions';
import './DataInput.css';
import { percentToDecimal } from '../../../helper/math';
import { formatPriceInput } from '../../../helper/format';
import NumberFormat from 'react-number-format';

const DataInput = (props) => {

    const dispatch = useDispatch();

    // const inflationControlLabel = 'Учитывать инфляцию'
    // const inflationValueLabel = 'Среднегодовая инфляция'
    const mortgageRateLabel = 'Процентная ставка по ипотеке'
    const mortgagePeriodLabel = 'Срок кредитования (лет)'
    const depositRateLabel = 'Процентная ставка по вкладу'
    const assetPriceLabel = 'Цена актива'
    const rentPriceLabel = 'Месяц аренды'
    const rentCoefLabel = 'Коэффициент стоимости аренды'

    const [ inflationControl ] = useState(false);
    const [ inflationValue ] = useState(0);
    const [ mortgageRate, setMortgageRate ] = useState(8);
    const [ mortgagePeriod, setMortgagePeriod ] = useState(15);
    const [ assetPrice, setAssetPrice ] = useState(5000000);
    const [ rentPrice, setRentPrice ] = useState(25000);
    const [ rentCoef, setRentCoef ] = useState(0.005);
    const [ depositRate, setDepositRate ] = useState(4);

    const handleRentPriceChange = (newPrice) => {
        setRentPrice(newPrice);
        setRentCoef(newPrice / assetPrice)
    }

    const handleRentCoefChange = (newCoef) => {
        setRentCoef(newCoef);
        setRentPrice(newCoef * assetPrice)
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
                <NumberFormat
                    customInput={ Form.Input }
                    fluid 
                    label={ assetPriceLabel } 
                    placeholder={ assetPriceLabel }
                    value={ assetPrice }
                    onValueChange={ values => setAssetPrice(values.floatValue) }
                    thousandSeparator=" "
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <NumberFormat
                    customInput={ Form.Input }
                    fluid 
                    label={ rentPriceLabel } 
                    placeholder={ rentPriceLabel }
                    value={ rentPrice }
                    thousandSeparator=" "
                    onValueChange={ values => handleRentPriceChange(values.floatValue) }
                />
                <Header as="h3" textAlign='center' className="data-input-inputs-separator">или</Header>
                <NumberFormat
                    customInput={ Form.Input }
                    fluid
                    label={ rentCoefLabel }
                    placeholder={ rentCoefLabel }
                    value={ rentCoef } 
                    onValueChange={ values => handleRentCoefChange(values.floatValue) }
                />
            </Form.Group>
            <p><i>Вид платежей по ипотеке: аннуитетные</i></p>
            <p><i>Вид процентов по вкладу: ежем. капитализация</i></p>
        </Form>
    )
}

export default DataInput;
