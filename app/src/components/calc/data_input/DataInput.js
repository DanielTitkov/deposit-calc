import React, { useState, useEffect } from 'react';
import { Form, Header } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCalcInput } from '../../../store/actions/calcActions';

const DataInput = (props) => {

    const dispatch = useDispatch();

    // const inflationControlLabel = 'Учитывать инфляцию'
    // const inflationValueLabel = 'Среднегодовая инфляция'
    const mortgageRateLabel = 'Ставка по ипотеке'
    const mortgagePeriodLabel = 'Срок кредиования (лет)'
    const depositRateLabel = 'Ставка по вкладу'
    const assetPriceLabel = 'Цена актива (руб)'
    const rentPriceLabel = 'Месяц аренды'
    const rentCoefLabel = 'Коэффициент стоимости аренды'

    const [ inflationControl, setInflationControl ] = useState(false);
    const [ inflationValue, setInflationValue ] = useState(0);
    const [ mortgageRate, setMortgageRate ] = useState(0.08);
    const [ mortgagePeriod, setMortgagePeriod ] = useState(15);
    const [ assetPrice, setAssetPrice ] = useState(5000000);
    const [ rentPrice, setRentPrice ] = useState(25000);
    const [ rentCoef, setRentCoef ] = useState(0.005);
    const [ depositRate, setDepositRate ] = useState(0.04);

    const handleRentPriceChange = (e) => {
        setRentPrice(e.target.value);
        setRentCoef(e.target.value / assetPrice)
    }

    const handleRentCoefChange = (e) => {
        setRentCoef(e.target.value);
        setRentPrice(e.target.value * assetPrice)
    }

    useEffect(() => {
        const inputData = {
            inflationControl: inflationControl,
            mortgageRate: parseFloat(mortgageRate),
            mortgagePeriod: parseFloat(mortgagePeriod),
            assetPrice: parseFloat(assetPrice),
            rentPrice: parseFloat(rentPrice),
            rentCoef: parseFloat(rentCoef),
            depositRate: parseFloat(depositRate),
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
                <Form.Input 
                    fluid 
                    label={mortgageRateLabel} 
                    placeholder={mortgageRateLabel} 
                    value={ mortgageRate }
                    onChange={ e => setMortgageRate(e.target.value) }
                />
                <Form.Input 
                    fluid 
                    label={depositRateLabel} 
                    placeholder={depositRateLabel}
                    value={ depositRate }
                    onChange={ e => setDepositRate(e.target.value) }
                />
                <Form.Input 
                    fluid 
                    label={mortgagePeriodLabel} 
                    placeholder={mortgagePeriodLabel}
                    value={ mortgagePeriod }
                    onChange={ e => setMortgagePeriod(e.target.value) }
                />
                <Form.Input 
                    fluid 
                    label={assetPriceLabel} 
                    placeholder={assetPriceLabel}
                    value={ assetPrice }
                    onChange={ e => setAssetPrice(e.target.value) }
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input 
                        fluid 
                        label={rentPriceLabel} 
                        placeholder={rentPriceLabel}
                        value={ rentPrice }
                        onChange={ handleRentPriceChange }
                    />
                    <Header as="h3">или</Header>
                    <Form.Input 
                        fluid
                        label={rentCoefLabel}
                        placeholder={rentCoefLabel}
                        value={rentCoef}
                        onChange={ handleRentCoefChange }
                    />
                </Form.Group>
            {/* <Form.Group inline>
                <Form.Checkbox 
                    label={inflationControlLabel} 
                    checked={ inflationControl }
                    onChange={ e => setInflationControl(!inflationControl) }
                />
                <Form.Input 
                    fluid 
                    label={inflationValueLabel} 
                    placeholder={inflationValueLabel} 
                    value={ inflationValue }
                    onChange={ e => setInflationValue(e.target.value) }
                />
            </Form.Group> */}
            {/* <Form.Group inline>
                <Form.Checkbox 
                    label={inflationControlLabel} 
                    checked={ inflationControl }
                    onChange={ e => setInflationControl(!inflationControl) }
                />
            </Form.Group> */}
            <p><i>Вид платежей по ипотеке: аннуитетные</i></p>
            <p><i>Вид процентов по вкладу: ежем. капитализация</i></p>
        </Form>
    )
}

export default DataInput;
