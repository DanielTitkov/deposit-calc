import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';

const DataInput = (props) => {

    const inflationControlLabel = 'Учитывать инфляцию'
    const inflationValueLabel = 'Среднегодовая инфляция'
    const mortgageRateLabel = 'Ставка по ипотеке'
    const mortgagePeriodLabel = 'Срок кредиования (лет)'
    const depositRateLabel = 'Ставка по вкладу'
    const assetPriceLabel = 'Цена актива (руб)'
    const rentPriceLabel = 'Месяц аренды'
    const rentCoefLabel = 'Коэффициент аренды'
    const submitButtonLabel = 'Пересчитать'

    const [ inflationControl, setInflationControl ] = useState(false);
    const [ mortgageRate, setMortgageRate ] = useState(0);
    const [ mortgagePeriod, setMortgagePeriod ] = useState(0);
    const [ assetPrice, setAssetPrice ] = useState(0);
    const [ rentPrice, setRentPrice ] = useState(0);
    const [ rentCoef, setRentCoef ] = useState(0);
    const [ depositRate, setDepositRate ] = useState(0);
    const [ inflationValue, setInflationValue ] = useState(0);

    console.log(mortgageRate, inflationControl);

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
                <Form.Input 
                    fluid 
                    label={rentPriceLabel} 
                    placeholder={rentPriceLabel}
                    value={ rentPrice }
                    onChange={ e => setRentPrice(e.target.value) }
                />
                <Form.Input 
                    fluid 
                    label={rentCoefLabel} 
                    placeholder={rentCoefLabel}
                    value={ rentCoef }
                    onChange={ e => setRentCoef(e.target.value) }
                />
            </Form.Group>
            <Form.Group inline>
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
            </Form.Group>
            <Form.Button>{submitButtonLabel}</Form.Button>
        </Form>
    )
}

export default DataInput;
