import React from 'react'
import { useSelector } from 'react-redux';
import { round, calculateMonthlyLoanPayment, calculateDepositSums } from '../../../helper/math';
import { Grid } from 'semantic-ui-react';
import DataOutputTableBlock from '../data_output_table_block/DataOutputTableBlock';

const DataOutput = () => {

    const inputData = useSelector(state => state.calc.inputData);

    // input fields
    const assetPrice = inputData && inputData['assetPrice'];
    const mortgageRate = inputData && inputData['mortgageRate'];
    const mortgagePeriod = inputData && inputData['mortgagePeriod'];
    const rentPrice = inputData && inputData['rentPrice'];

    // mortgage
    const monthlyMortgagePayment = round(calculateMonthlyLoanPayment(assetPrice, mortgagePeriod, mortgageRate), 3); 
    const totalMortgagePayment = round(monthlyMortgagePayment * mortgagePeriod * 12);
    const mortgageOverpayment = totalMortgagePayment - assetPrice;
    const assetOverpaymentPerc = round(mortgageOverpayment / assetPrice, 4);
    
    // deposit and rent
    const monthlyDepositContribution = monthlyMortgagePayment - rentPrice;
    const depositContributionSum = monthlyDepositContribution * mortgagePeriod * 12;
    const rentPaymentsSum = rentPrice * mortgagePeriod * 12;
    const monthlyDepositRate = round(inputData && inputData['depositRate'] / 12, 5);
    const depositSums = calculateDepositSums(mortgagePeriod, monthlyDepositRate, monthlyDepositContribution)
    const depositResult = depositSums[depositSums.length-1];
    const depositIncome = depositResult - depositContributionSum;

    // asset payback
    const mortgageAssetPayback = round(totalMortgagePayment / rentPrice / 12, 1);
    const pureAssetPayback = round(assetPrice / rentPrice / 12, 1);

    // asset and deposit
    const assetCoveringPerc = round(depositResult / assetPrice, 3);
    const assetCoveringRemainder = depositResult - assetPrice;

    // outputs
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
        monthlyDepositContribution: {
            label: "Рассчетный размер взноса на вклад",
            value: monthlyDepositContribution,
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
        depositResult: {
            label: "Итог на вкладе (с учетом процентов)",
            value: depositResult,
            format: "money",
        },
        depositIncome: {
            label: "Доход по вкладу",
            value: depositIncome,
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

    const assetDepositData = {
        assetCoveringPerc: {
            label: "Покрытие стоимости актива вкладом",
            value: assetCoveringPerc,
            format: "perc",
        },
        assetCoveringRemainder: {
            label: "Остаток/дефицит",
            value: assetCoveringRemainder,
            format: "money",
        },
    }

    return (
        <>
            <Grid stackable>
                <Grid.Row columns={2}>

                    <Grid.Column>
                        <DataOutputTableBlock
                            data={ mortgageData } 
                            tableColor="orange"
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
                            tableColor="violet"
                            headerText="Окупаемость актива"
                            tooltipText="Если мы будем сдавать актив в аренду с той же самой ставкой, 
                                то за сколько лет он окупится?"
                        />
                    </Grid.Column>

                    <Grid.Column>
                        <DataOutputTableBlock
                            data={ assetDepositData } 
                            tableColor="blue"
                            headerText="Актив и вклад"
                            tooltipText="Покроет ли сумма на вкладе стоимость актива? 
                                Сколько еще останется или надо будет доплатить?"
                        />
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        </>
    )
}

export default DataOutput;