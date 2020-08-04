import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DataOutputTable from '../data_output_table/DataOutputTable';
import { round, calculateMonthlyLoanPayment } from '../../../helper/math';
import { Header, Grid, Popup, Icon } from 'semantic-ui-react';
import DataOutputTableBlock from '../data_output_table_block/DataOutputTableBlock';

const DataOutput = () => {

    const inputData = useSelector(state => state.calc.inputData);

    const assetPrice = inputData && inputData['assetPrice'];
    const mortgageRate = inputData && inputData['mortgageRate'];
    const mortgagePeriod = inputData && inputData['mortgagePeriod'];
    const rentPrice = inputData && inputData['rentPrice'];

    // mortgage
    const monthlyDepositRate = round(inputData && inputData['depositRate'] / 12, 5);
    const monthlyMortgagePayment = round(calculateMonthlyLoanPayment(assetPrice, mortgagePeriod, mortgageRate), 3); 
    const totalMortgagePayment = round(monthlyMortgagePayment * mortgagePeriod * 12);
    const mortgageOverpayment = totalMortgagePayment - assetPrice;
    const assetOverpaymentPerc = round(mortgageOverpayment / assetPrice, 4);
    
    // deposit and rent
    const mothlyDepositContribution = monthlyMortgagePayment - rentPrice;
    const depositContributionSum = mothlyDepositContribution * mortgagePeriod * 12;
    const rentPaymentsSum = rentPrice * mortgagePeriod * 12;

    // asset payback
    const mortgageAssetPayback = round(totalMortgagePayment / rentPrice / 12, 1);
    const pureAssetPayback = round(assetPrice / rentPrice / 12, 1);

    // const [ inflationControl, setInflationControl ] = useState(false);
    // const [ mortgageRate, setMortgageRate ] = useState(0.08);
    // const [ mortgagePeriod, setMortgagePeriod ] = useState(10);
    // const [ assetPrice, setAssetPrice ] = useState(0);
    // const [ rentPrice, setRentPrice ] = useState(0);
    // const [ rentCoef, setRentCoef ] = useState(0);
    // const [ depositRate, setDepositRate ] = useState(0.04);
    // const [ inflationValue, setInflationValue ] = useState(0);

    const mortgageData = {
        monthlyMortgagePayment: {
            label: "Ежемесячный платеж по ипотеке",
            value: monthlyMortgagePayment,
            format: "money",
        },
        totalMortgagePayment: {
            label: "Сумма платежей по ипотеке",
            value: totalMortgagePayment,
            format: "money",
        },
        mortgageOverpayment: {
            label: "Переплата по ипотеке",
            value: mortgageOverpayment,
            format: "money",
        },
        assetOverpaymentPerc: {
            label: "Процент переплаты от цены актива",
            value: assetOverpaymentPerc,
            format: "perc",
        },
    }

    const depositData = {
        // monthlyDepositRate: {
        //     label: "Месячная ставка по вкладу",
        //     value: monthlyDepositRate,
        //     format: "perc",
        // },
        mothlyDepositContribution: {
            label: "Рассчетный размер взноса на вклад",
            value: mothlyDepositContribution,
            format: "money",
        }, 
        depositContributionSum: {
            label: "Сумма взносов на вклад",
            value: depositContributionSum,
            format: "money",
        },
        rentPaymentsSum: {
            label: "Сумма расходов на аренду",
            value: rentPaymentsSum,
            format: "money",
        },
    }

    const paybackData = {
        mortgageAssetPayback: {
            label: "Срок окупаемости актива в годах (ипотека)",
            value: mortgageAssetPayback,
        },
        pureAssetPayback: {
            label: "Срок окупаемости актива в годах (без переплаты)",
            value: pureAssetPayback,
        },
    }

    return (
        <>
            <Grid stackable>
                <Grid.Row columns={2}>

                    <Grid.Column>
                        <DataOutputTableBlock
                            data={ mortgageData } 
                            tableColor="pink"
                            headerText="Ипотека"
                            tooltipText="Если мы используем ипотечный кредит для оплаты актива, то какой будет переплата?"
                        />
                    </Grid.Column>
                    
                    <Grid.Column>
                        <DataOutputTableBlock
                            data={ depositData } 
                            tableColor="green"
                            headerText="Вклад"
                            tooltipText="Предполагается, что мы тратим в месяц такую же сумму,
                                как платили бы за ипотеку, но часть из нее отдаем за аренду,
                                а остаток кладем на вклад."
                        />
                    </Grid.Column>

                    <Grid.Column>
                        <DataOutputTableBlock
                            data={ paybackData } 
                            tableColor="blue"
                            headerText="Окупаемость актива"
                            tooltipText="Если мы будем сдавать актив с той же самой ставкой за аренду, 
                                то за сколько лет он окупится?"
                        />
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        </>
    )
}

export default DataOutput;