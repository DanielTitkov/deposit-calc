import React from 'react';
import { Message } from 'semantic-ui-react';

const DecisionBlock = ({ result }) => {
    const DecisionMessage = ({ header, text, color }) => (
        <Message color={color}>
            <Message.Header>{ header }</Message.Header>
            <p>
                { text }
            </p>
        </Message>
    );

    switch (result) {
        case "mortgage":
            return (
                <DecisionMessage 
                    header="Ипотека выгоднее"
                    text="Вы выплатите ипотеку раньше, чем накопите на квартиру."
                    color="pink"
                />
            );
        case "mortgageLower":
            return (
                <DecisionMessage 
                    header="Ипотека выгоднее"
                    text="Платеж за аренду больше, чем ежемесячный платеж по ипотеке. 
                        Взнос на вклад принимается за 0."
                    color="pink"
                />
            );
        case "deposit":
            return (
                <DecisionMessage 
                    header="Вклад выгоднее"
                    text="Вы накопите на квартиру раньше, чем выплатите ипотеку."
                    color="blue"
                />
            );
        default:
            return (
                <DecisionMessage 
                    header="Неизвестно, что выгоднее"
                    text="При введеных параметрах невозможно рассчитать результ, проверьте входящие данные"
                />
            );
    }
}

export default DecisionBlock;
