import React from 'react'
import { useSelector } from 'react-redux';
import { round, calculateMonthlyLoanPayment, calculateDepositSums } from '../../../helper/math';
import { Grid } from 'semantic-ui-react';
import DataOutputTableBlock from '../data_output_table_block/DataOutputTableBlock';
import DataOutputLineChart from '../data_output_line_chart/DataOutputLineChart';
import DataOutputChartBlock from '../data_output_chart_block/DataOutputTableBlock';


const DataOutput = () => {

    const inputData = useSelector(state => state.calc.inputData);

    // input fields
    const assetPrice = inputData && inputData['assetPrice'];
    const mortgageRate = inputData && inputData['mortgageRate'];
    const mortgagePeriod = inputData && inputData['mortgagePeriod'];
    const rentPrice = inputData && inputData['rentPrice'];
    const initialPayment = inputData && inputData['initialPayment'];
    const assetPriceIncreaseCoef = inputData && inputData['assetPriceIncreaseCoef'];

    // mortgage
    const monthlyMortgagePayment = round(calculateMonthlyLoanPayment(assetPrice, mortgagePeriod, mortgageRate, initialPayment), 3); 
    const totalMortgagePayment = round(monthlyMortgagePayment * mortgagePeriod * 12);
    const mortgageOverpayment = totalMortgagePayment - assetPrice;
    const assetOverpaymentPerc = round(mortgageOverpayment / assetPrice, 4);
    
    // deposit and rent
    const monthlyDepositContribution = monthlyMortgagePayment - rentPrice;
    const depositContributionSum = monthlyDepositContribution * mortgagePeriod * 12;
    const rentPaymentsSum = rentPrice * mortgagePeriod * 12;
    const monthlyDepositRate = round(inputData && inputData['depositRate'] / 12, 5);
    const [depositSums, depositIncomes] = calculateDepositSums(mortgagePeriod, monthlyDepositRate, monthlyDepositContribution, initialPayment)
    const depositResult = depositSums[depositSums.length-1];
    const depositIncome = depositResult - depositContributionSum;

    // asset payback
    const mortgageAssetPayback = round(totalMortgagePayment / rentPrice / 12, 1);
    const pureAssetPayback = round(assetPrice / rentPrice / 12, 1);

    // asset and deposit
    const assetCoveringPerc = round(depositResult / assetPrice, 3);
    const assetCoveringRemainder = depositResult - assetPrice;

    // charts
    // const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 800, pv: 2400, amt: 2400 }];
    const depositChartData = depositSums.filter(
        (_, i) => (i % 12 === 0)
    ).map( (value, i) => {
        return {
            name: `Год ${i}`,
            deposit: value,
            depositContibutionSum: monthlyDepositContribution * i * 12 + initialPayment,
            depositIncomeSum: depositIncomes.slice(0,i*12).reduce((a, b) => a + b, 0),
            mortgage: monthlyMortgagePayment * i * 12 + initialPayment,
            assetPrice: assetPrice * (1+assetPriceIncreaseCoef)**i,
        }

    });

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

                <Grid.Row columns={1}>
                    <Grid.Column>
                        <DataOutputChartBlock
                            headerText="Ипотека и вклад"
                            tooltipText="Графическое сравнение затрат на ипотеку 
                                и суммы на вкладе к концу каждого года"
                        >
                            <DataOutputLineChart
                                data={ depositChartData }
                                depositKey="deposit"
                                mortgageKey="mortgage"
                                assetPriceKey="assetPrice"
                                nameKey="name"
                                depositIncomeSumKey="depositIncomeSum"
                                depositContibutionSumKey="depositContibutionSum"
                                assetPrice={ assetPrice }
                            />
                        </DataOutputChartBlock>
                    </Grid.Column>    

                </Grid.Row>

            </Grid>
        </>
    )
}

export default DataOutput;