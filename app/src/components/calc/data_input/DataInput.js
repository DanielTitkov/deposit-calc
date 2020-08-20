import React, { useState, useEffect } from 'react';
import { Form, Button, Grid } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { updateCalcInput } from '../../../store/actions/calcActions';
import { percentToDecimal } from '../../../helper/math';
import NumberFormat from 'react-number-format';
import { parseQueryString } from '../../../helper/url';
import config from '../../../config/config';
import './DataInput.css';
import TippedLabel from '../tipped_label/TippedLabel';

const DataInput = () => {

    const dispatch = useDispatch();
    const [showAdvancedFields, setShowAdancedFields] = useState(false);


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
        initialPayment: ifGiven(urlParams && urlParams.initialPayment, config.defaults.INITIAL_PAYMENT),
        assetPriceIncreaseCoef: ifGiven(urlParams && urlParams.assetPriceIncreaseCoef, config.defaults.ASSET_PRICE_INCREASE_COEF),
    }

    const [inflationControl] = useState(inputData && inputData.inflationControl);
    const [inflationValue] = useState(inputData && inputData.inflationValue);
    const [mortgageRate, setMortgageRate] = useState(inputData && inputData.mortgageRate);
    const [mortgagePeriod, setMortgagePeriod] = useState(inputData && inputData.mortgagePeriod);
    const [assetPrice, setAssetPrice] = useState(inputData && inputData.assetPrice);
    const [rentPrice, setRentPrice] = useState(inputData && inputData.rentPrice);
    const [depositRate, setDepositRate] = useState(inputData && inputData.depositRate);
    const [initialPayment, setInitialPayment] = useState(inputData && inputData.initialPayment);
    const [assetPriceIncreaseCoef, setAssetPriceIncreaseCoef] = useState(inputData && inputData.assetPriceIncreaseCoef);

    const handleRentPriceChange = (newPrice) => {
        setRentPrice(newPrice);
    }

    const checkLimit = (values, max, min = 0) => (
        (values.floatValue <= max) && (values.floatValue >= min)
    )

    useEffect(() => {
        const inputData = {
            inflationControl: inflationControl,
            mortgageRate: percentToDecimal(parseFloat(mortgageRate)),
            mortgagePeriod: parseFloat(mortgagePeriod),
            assetPrice: parseFloat(assetPrice),
            rentPrice: parseFloat(rentPrice),
            depositRate: percentToDecimal(parseFloat(depositRate)),
            inflationValue: parseFloat(inflationValue),
            initialPayment: parseFloat(initialPayment),
            assetPriceIncreaseCoef: percentToDecimal(parseFloat(assetPriceIncreaseCoef)),
        }
        dispatch(updateCalcInput(inputData));
    }, [
        dispatch,
        inputData,
        inflationControl, mortgageRate, mortgagePeriod,
        assetPrice, rentPrice, depositRate, inflationValue,
        initialPayment, assetPriceIncreaseCoef
    ]);

    return (
        <>
            <Grid stackable padded={false}>
                <Grid.Row columns={3}>

                    <Grid.Column className="data-input-field-wrapper">
                        <NumberFormat
                            customInput={Form.Input}
                            fluid
                            label={
                                <TippedLabel 
                                    labelText={config.labels.MORTGAGE_RATE}
                                    tooltipText={"Годовой процент по ипотеке"}
                                    limits={[config.limits.MORTGAGE_RATE_MAX, config.limits.MORTGAGE_RATE_MIN]}
                                />
                            }
                            placeholder={config.labels.MORTGAGE_RATE}
                            value={mortgageRate}
                            isAllowed={values => checkLimit(values, config.limits.MORTGAGE_RATE_MAX)}
                            icon='percent'
                            onValueChange={values => setMortgageRate(values.floatValue)}
                        />
                    </Grid.Column>
                    <Grid.Column className="data-input-field-wrapper">
                        <NumberFormat
                            customInput={Form.Input}
                            fluid
                            label={
                                <TippedLabel 
                                    labelText={config.labels.DEPOSIT_RATE}
                                    tooltipText={"Годовой доход по вкладу и/или другим инвестициям"}
                                    limits={[config.limits.DEPOSIT_RATE_MAX, config.limits.DEPOSIT_RATE_MIN]}
                                />
                            }
                            placeholder={config.labels.DEPOSIT_RATE}
                            value={depositRate}
                            isAllowed={values => checkLimit(values, config.limits.MORTGAGE_RATE_MAX)}
                            icon='percent'
                            onValueChange={values => setDepositRate(values.floatValue)}
                        />
                    </Grid.Column>
                    <Grid.Column className="data-input-field-wrapper">
                        <NumberFormat
                            customInput={Form.Input}
                            fluid
                            label={
                                <TippedLabel 
                                    labelText={config.labels.MORTGAGE_PERIOD}
                                    tooltipText={"Сколько лет придется платить по ипотеке"}
                                    limits={[config.limits.MORTGAGE_PERIOD_MAX, config.limits.MORTGAGE_PERIOD_MIN]}
                                />
                            }
                            placeholder={config.labels.MORTGAGE_PERIOD}
                            isAllowed={values => checkLimit(
                                values,
                                config.limits.MORTGAGE_PERIOD_MAX,
                                config.limits.MORTGAGE_PERIOD_MIN
                            )}
                            value={mortgagePeriod}
                            onValueChange={values => setMortgagePeriod(values.floatValue)}
                        />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={3}>
                    <Grid.Column className="data-input-field-wrapper">
                        <NumberFormat
                            customInput={Form.Input}
                            fluid
                            label={
                                <TippedLabel 
                                    labelText={config.labels.ASSET_PRICE}
                                    tooltipText={"Полная стоимость квартиры"}
                                    limits={[config.limits.ASSET_PRICE_MAX, config.limits.ASSET_PRICE_MIN]}
                                />
                            }
                            placeholder={config.labels.ASSET_PRICE}
                            isAllowed={values => checkLimit(values, config.limits.ASSET_PRICE_MAX)}
                            value={assetPrice}
                            onValueChange={values => setAssetPrice(values.floatValue)}
                            thousandSeparator=" "
                            icon="ruble sign"
                        />
                    </Grid.Column>
                    <Grid.Column className="data-input-field-wrapper">
                        <NumberFormat
                            customInput={Form.Input}
                            fluid
                            label={
                                <TippedLabel 
                                    labelText={config.labels.RENT_PRICE}
                                    tooltipText={"Во сколько обойдется аренда, если не брать ипотеку"}
                                    limits={[config.limits.RENT_PRICE_MAX, config.limits.RENT_PRICE_MIN]}
                                />
                            }
                            placeholder={config.labels.RENT_PRICE}
                            isAllowed={values => checkLimit(values, config.limits.RENT_PRICE_MAX)}
                            value={rentPrice}
                            thousandSeparator=" "
                            onValueChange={values => handleRentPriceChange(values.floatValue)}
                            icon="ruble sign"
                        />
                    </Grid.Column>
                    <Grid.Column className="data-input-field-wrapper">
                        <NumberFormat
                            customInput={Form.Input}
                            fluid
                            label={
                                <TippedLabel 
                                    labelText={config.labels.INITIAL_PAYMENT}
                                    tooltipText={"В сценарии с вкладом эта сумма сразу помещается на вклад"}
                                    limits={[config.limits.INITIAL_PAYMENT_MAX, config.limits.INITIAL_PAYMENT_MIN]}
                                />
                            }
                            placeholder={config.labels.INITIAL_PAYMENT}
                            isAllowed={values => checkLimit(values, config.limits.INITIAL_PAYMENT_MAX)}
                            value={initialPayment}
                            thousandSeparator=" "
                            onValueChange={values => setInitialPayment(values.floatValue)}
                            icon="ruble sign"
                        />
                        <div className="data-input-field-buttons-wrapper">
                            {config.interface.INITIAL_PAYMENT_RATES.map(e => (
                                <Button
                                    primary
                                    size="tiny"
                                    onClick={() => setInitialPayment(assetPrice * e)}
                                    key={e}
                                >
                                    {e * 100 + "%"}
                                </Button>
                            ))}
                        </div>
                    </Grid.Column>
                </Grid.Row>

                {config.interface.ALLOW_ADVANCED_FIELDS ? (
                    <Grid.Row columns={1}>
                        <Grid.Column className="data-input-field-wrapper">
                            <Button
                                fluid
                                primary
                                basic
                                className="data-input-button-centered"
                                onClick={() => setShowAdancedFields(!showAdvancedFields)}
                            >
                                {showAdvancedFields ? "Скрыть" : "Показать"} дополнительные настройки
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                ) : null}

                {showAdvancedFields ? (
                    <Grid.Row columns={3}>
                        <Grid.Column className="data-input-field-wrapper">
                            <NumberFormat
                                customInput={Form.Input}
                                fluid
                                label={config.labels.ASSET_PRICE_INCREASE_COEF}
                                placeholder={config.labels.ASSET_PRICE_INCREASE_COEF}
                                value={assetPriceIncreaseCoef}
                                onValueChange={values => setAssetPriceIncreaseCoef(values.floatValue)}
                                icon='percent'
                            />
                        </Grid.Column>
                    </Grid.Row>
                ) : null}
            </Grid>

        </>
    )
}

export default DataInput;
